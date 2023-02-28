import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../store/slices/modalSlice.js';
import { useSocketContext } from '../../../context/index.jsx';
import { channelsSelectors, getChannelsName } from '../../../store/selectors.js';
import { channelNameValidation } from '../../../schemas/validations.js';
// eslint-disable-next-line max-len

const AddNewChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const { createChannel } = useSocketContext();
  const channels = useSelector(getChannelsName);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameValidation(channels),
    onSubmit: async ({ name }, actions) => {
      try {
        await createChannel({ name });
        handleClose();
      } catch (e) {
        console.log(e);
        actions.setSubmitting(false);
      }
      console.log(actions);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              placeholder={t('modals.channelName')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              name="name"
              id="name"
              autoFocus
            />
            <Form.Label
              className="visually-hidden"
              htmlFor="name"
            >
              {t('modals.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const RenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const { renameChannel } = useSocketContext();
  const channels = useSelector(getChannelsName);
  const channelId = useSelector((state) => state.modal.channelId);
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: channelNameValidation(channels),
    onSubmit: async ({ name }, actions) => {
      try {
        await renameChannel({ name, id: channelId });
        handleClose();
      } catch (e) {
        inputRef.current.select();
        actions.setSubmitting(false);
        console.log(e);
      }
      console.log(actions);
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              placeholder={t('modals.newChannelName')}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              name="name"
              id="name"
            />
            <Form.Label
              className="visually-hidden"
              htmlFor="name"
            >
              {t('modals.newChannelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const RemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const { removeChannel } = useSocketContext();
  const channelId = useSelector((state) => state.modal.channelId);
  const handleRemove = async () => {
    setSending(true);
    try {
      await removeChannel({ id: channelId });
      handleClose();
    } catch (e) {
      console.log(e);
      setSending(false);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={handleClose}
            disabled={sending}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={sending}
          >
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

const modals = {
  adding: AddNewChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

const Modals = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.activeModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const ActiveModal = modals[modalType];

  return (
    <Modal show={modalType != null} onHide={handleClose} centered>
      {ActiveModal && <ActiveModal handleClose={handleClose} />}
    </Modal>
  );
};

export default Modals;
