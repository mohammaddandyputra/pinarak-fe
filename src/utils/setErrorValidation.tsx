import { Dispatch } from 'react';
import * as yup from 'yup';

interface SchemaMapping {
  schema: yup.ObjectSchema<any> | null;
  resetErrors: () => void;
  setErrors: (errors: Record<string, string>) => void;
}

type Data = Record<string, any>;

const setErrorValidation = (
  data: Data,
  dispatch: Dispatch<any>,
  schemaMapping: SchemaMapping
): boolean => {
  try {
    if (!schemaMapping?.schema) return true;

    const validationSchema = schemaMapping.schema;
    validationSchema.validateSync(data, { abortEarly: false });

    dispatch(schemaMapping.resetErrors());
    return true;
  } catch (err: unknown) {
    console.log('err => ', err);

    if (err instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      console.log('ERRORS => ', errors);
      dispatch(schemaMapping.setErrors(errors));
    }
    return false;
  }
};

export default setErrorValidation;
