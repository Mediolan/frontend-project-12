import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useAuth, useSocketContext } from '../../../context';

const NewMessageField = () => {
  const { t } = useTranslation();

  const { user: { username } } = useAuth();
  const { api } = useSocketContext();
  const { currentChannelId } = useSelector((state) => state.channels);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const filteredMsg = leoProfanity.clean(body);
      const message = {
        body: filteredMsg,
        channelId: currentChannelId,
        username,
      };

      try {
        await api.sendMessage(message);
        formik.resetForm();
      } catch (e) {
        toast.error(t('errors.network'));
        throw e;
      }

      formik.setSubmitting(false);
      inputRef.current.focus();
    },
    validateOnBlur: false,
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          aria-label={t('chat.newMessage')}
          disabled={formik.isSubmitting}
          placeholder={t('chat.type')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" className=" border-0" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageField;
