import * as Yup from 'Yup';
const otpExp = /^\d+$/;
export const signupScehma = Yup.object({
    signupUsername:Yup.string().min(3,'Username must be at least 3 characters').max(25,'Username must be at most 25 characters').required("Please enter your username"),
    signupEmail:Yup.string().email('Please enter a valid Email').required("Please enter your email"),
    signupPassword:Yup.string().min(3,'Password must be at least 3 characters').max(25,'Password must be at most 25 characters').required("Please enter a password"),
    signupconfirmPassword:Yup.string().required("Please enter confirmational password").oneOf([Yup.ref("signupPassword"), null], "Password must match"),
});

export const signinScehma = Yup.object({
    signinEmail: Yup.string().email('Please enter a valid Email').required('Email is required'),
    signinPassword: Yup.string().required('Password is required'),
});

export const verifyEmail = Yup.object({
    verifyCode: Yup.string().required('Please enter verification code'),
})

export const register1 = Yup.object({
    fullname:Yup.string().min(3,'Username must be at least 3 characters').required("Please enter your Full Name"),
    age:Yup.string().required("Please enter your Age"),
    mobilenumber:Yup.string().required("Please enter your Mobile Number"),
});
