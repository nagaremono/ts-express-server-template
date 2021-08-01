import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'staging')
      .default('development'),
    PORT: Joi.number().default(4000),
  })
  .unknown();

const { value, error } = envVarSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error('Config validation error: ' + error.message);
}

const CONFIG = {
  NODE_ENV: value.NODE_ENV,
  PORT: value.PORT,
};

export default CONFIG;
