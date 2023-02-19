import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/slices/modalSlice.js';
import { useSocketContext } from '../../../context/index.jsx';
import { channelsSelectors, getChannelsName } from '../../../store/selectors.js';
import { channelNameValidation } from '../../../schemas/validations.js';
// eslint-disable-next-line max-len

const AddNewChannel = ({ handleClose }) => {
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
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              placeholder="Название канала"
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
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const RenameChannel = ({ handleClose }) => {
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
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
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
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const RemoveChannel = ({ handleClose }) => {
  const { removeChannel } = useSocketContext();
  const channelId = useSelector((state) => state.modal.channelId);
  const handleRemove = async () => {
    try {
      await removeChannel({ id: channelId });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            Удалить
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
