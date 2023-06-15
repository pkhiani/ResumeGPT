export default function login_validate(values){
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      // validation for password
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 5 || values.password.length > 20) {
        errors.password = 'Must be greater than 5 and less than 20 characters'

      } 

      return errors;
}

export function registerValidate(values){
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      // validation for password
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 5 || values.password.length > 20) {
        errors.password = 'Must be greater than 5 and less than 20 characters'
      } 

       // validation for password
       if (!values.cpassword) {
        errors.cpassword = 'Required';
      } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password does not match"
      } 

      return errors;
}