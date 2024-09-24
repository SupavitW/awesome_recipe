import * as yup from 'yup';

const signUpSchema = yup.object({
    firstname: yup.string().required("Firstname is required").matches(/^[a-zA-Z]*$/, 'input contain special characters').min(3, "Firstname must be at least 3 character long"),
    lastname: yup.string().required("Lastname is required").matches(/^[a-zA-Z]*$/, 'input contain special characters').min(3, "Lastname must be at least 3 character long"),
    username: yup.string().required("Username is required").matches(/^[a-zA-Z0-9]*$/, 'input contain special characters').length(6, "Username must be exactly 6 characters long"),
    password: yup.string().required("Password is required").matches(/^[a-zA-Z0-9]*$/, 'input contain special characters').length(6, "Password must be exactly 6 characters long"),
    confirmPassword: yup.string().required("Confirm password is required").test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
        })
});

export default signUpSchema;
