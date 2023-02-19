import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const channelNameValidation = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Название не может быть короче 3 символов')
    .max(20, 'Название не может быть длиннее 20 символов')
    .notOneOf(channels, 'Название должно быть уникальным'),
});
