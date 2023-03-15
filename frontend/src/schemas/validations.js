import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: () => ('validation.required'),
    notOneOf: () => ('validation.uniq'),
    test: () => ('validation.mastMatch'),
  },
  string: {
    min: () => ('validation.requirements'),
    max: () => ('validation.requirements'),
  },
});

export const channelNameValidation = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .notOneOf(channels),
});

export const registrationFormValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, 'validation.passMin'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', (value, context) => value === context.parent.password),
});
