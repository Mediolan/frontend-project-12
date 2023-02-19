import * as yup from 'yup';

export const channelNameValidation = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Название не может быть короче 3 символов')
    .max(20, 'Название не может быть длиннее 20 символов')
    .notOneOf(channels, 'Название должно быть уникальным'),
});

export const registrationFormValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Имя не может быть короче 3 символов')
    .max(20, 'Имя не может быть длиннее 20 символов'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Пароль не может быть короче 6 символов'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'Пароли должны совпадать', (value, context) => value === context.parent.password),
});
