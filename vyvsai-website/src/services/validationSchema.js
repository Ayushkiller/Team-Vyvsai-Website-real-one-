import Joi from 'joi';
import sanitizeHTML from 'sanitize-html';

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedAttributes: {},
          allowedTags: [],
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const BaseJoi = Joi.extend(extension);

export const userSchema = BaseJoi.object({
  username: BaseJoi.string().escapeHTML().required().messages({
    'string.empty': 'Name is required',
  }),
  email: BaseJoi.string().email().escapeHTML().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email is required',
  }),
  mobileNo: BaseJoi.string()
    .length(10)
    .escapeHTML()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.length': 'Mobile number must be exactly 10 digits',
      'string.pattern.base': 'Mobile number must only contain digits',
      'string.empty': 'Mobile number is required',
    }),
  password: BaseJoi.string().min(8).escapeHTML().required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required',
  }),
  preferences: BaseJoi.string()
    .valid('goverment-tenders', 'private-tenders')
    .escapeHTML()
    .required()
    .messages({
      'string.valid': 'Invalid tender preference selected',
      'string.empty': 'Tender preference is required',
    }),
});