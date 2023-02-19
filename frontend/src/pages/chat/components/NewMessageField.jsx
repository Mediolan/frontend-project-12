// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useAuth, useSocketContext } from '../../../context';

const NewMessageField = () => {
  const { user: { username } } = useAuth();
  const { sendMessage } = useSocketContext();
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
      const message = {
        body,
        channelId: currentChannelId,
        username,
      };

      try {
        await sendMessage(message);
        formik.resetForm();
      } catch (err) {
        console.log(err);
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
          aria-label="Новое сообщение"
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" className=" border-0" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageField;