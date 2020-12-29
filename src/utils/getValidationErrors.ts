import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
// desse tipo pois o erro deve possuir o nome do campo mais seu erro

export default function getValidationErrors(err: ValidationError): Errors {
  console.log(err.inner);
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  // name: error.message;
  // email: error.message;
  // password: error.message;

  return validationErrors;
}
