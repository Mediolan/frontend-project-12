import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: () => ('validation.required'),
    notOneOf: () => ('validation.uniq'),
    test: () => ('validation.mastMatch'),
  },
});

export const channelNameValidation = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3, 'validation.channelRequirements')
    .max(20, 'validation.channelRequirements')
    .notOneOf(channels),
});

export const registrationFormValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .min(3, 'validation.usernameRequirements')
    .max(20, 'validation.usernameRequirements'),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, 'validation.passMin'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', (value, context) => value === context.parent.password),
});
