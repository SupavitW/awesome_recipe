import * as yup from 'yup';

const editProfileSchema = yup.object().shape({
    firstname: yup.string()
        .when('formType', {
            is: 'name',
            then: () => yup.string().required("Firstname is required").matches(/^[a-zA-Z]*$/, 'input contain special characters').min(3, "Firstname must be at least 3 character long"),
            otherwise: () =>  yup.string().notRequired()
        }),
    lastname: yup.string()
        .when('formType', {
            is: 'name',
            then: () =>  yup.string().required("Lastname is required").matches(/^[a-zA-Z]*$/, 'input contain special characters').min(3, "Lastname must be at least 3 character long"),
            otherwise: () =>  yup.string().notRequired()
        }),
    oldPassword: yup.string()
        .when('formType', {
            is: 'password',
            then: () =>  yup.string().required("Password is required").matches(/^[a-zA-Z0-9]*$/, 'input contain special characters').length(6, "Password is be exactly 6 characters long"),
            otherwise: () =>  yup.string().notRequired()
        }),
    newPassword: yup.string()
        .when('formType', {
            is: 'password',
            then: () =>  yup.string().required("Password is required").matches(/^[a-zA-Z0-9]*$/, 'input contain special characters').length(6, "Password must be exactly 6 characters long"),
            otherwise: () =>  yup.string().notRequired()
        }),
    confirmPassword: yup.string()
        .when('formType', {
            is: 'password',
            then: () =>  yup.string().required("Confirm password is required").test('passwords-match', 'Passwords must match', function(value){
                return this.parent.newPassword === value
            }),
            otherwise: () =>  yup.string().notRequired()
        }),
    formType: yup.string().required()
});

export default editProfileSchema;
