import React,{ useState , useContext } from 'react'
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import { signupScehma } from '../schemas/index';
import { signinScehma } from '../schemas/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import '../Pages/All Css files/login.css'
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
const notifyerror = (message) => toast.error(message,{
  duration:4000,
  position:'top-right',
  style: {
    color: '#000'
  }
});
const notifysucces = (message) => toast.success(message,{
  duration:4000,
  position:'top-right',
  style: {
    color: '#000'
  }
});



const initialsignupValues = {
  signupUsername: "",
  signupEmail: "",
  signupPassword: "",
  signupconfirmPassword: "",
}

const initialsigninValues = {
  signinEmail: "",
  signinPassword: "",
}

function login() {
  const signinURL = "https://upright-careful-grackle.ngrok-free.app/signin";
  const signupURL = "https://upright-careful-grackle.ngrok-free.app/signup";
  const navigate = useNavigate();
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [id,setid] = useState('');
  const [forgetemail,setforgetemail] = useState('');
  const [forgetpass,setforgetpass] = useState('');
  const [emailreset,setemailreset] = useState(false);
  const [usernamereset,setusernamereset] = useState(false);
  // const {setUser} = useContext(LoginContext);
  const promise = (resend) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (resend) {
          resolve('OTP sent successfully!');
        } else {
          reject(new Error('Failed to send OTP.'));
        }
      }, 3000); 
    });
  };
  const notifyloadingsignin = (resend) => toast.promise(
    promise(resend),
     {
       loading: 'Verifying...',
       success: "Logged In" ,
       error: "Failed to sent OTP",
     },{
      duration:4000,
      position:'top-right',
      style: {
      color: '#000'
      }
     }
   );
  const notifyloadingsignup = (resend) => toast.promise(
    promise(resend),
     {
       loading: 'Verifying...',
       success: "Account Created" ,
       error: "Failed to Sign Up",
     },{
      duration:4000,
      position:'top-right',
      style: {
      color: '#000'
      }
     }
   );
  const notifyloadingforget = (resend) => toast.promise(
    promise(resend),
     {
       loading: 'Verifying...',
       success: "Email exists.." ,
       error: "Failed to Sign Up",
     },{
      duration:4000,
      position:'top-right',
      style: {
      color: '#000'
      }
     }
   );

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async function generatehash(pass) {
    const saltRound = 10;
     return await bcrypt.hash(pass, saltRound);
  }
  function sendmail(values, otp) {
    console.log(values);
    console.log(otp);
    // const templateParams = {
    //   user_email: values.email,
    //   otp_code: otp,
    //   to_name: values.username
    // };
  
    // emailjs.send(
    //   'service_87xrsmm',    // Replace with your service ID
    //   'template_hcnrp7c',   // Replace with your template ID
    //   templateParams,
    //   '0SJM1SOHLgBKDFfkp'        // Replace with your EmailJS user ID
    // )
    // .then((response) => {
    //   console.log('OTP sent successfully!', response.status, response.text);
    // })
    // .catch((error) => {
    //   console.error('Failed to send OTP:', error);
    // });
  }
  // values ,touched ,errors , handleBlur , handleChange , handleSubmit
  const signupformik = useFormik({
    initialValues: initialsignupValues,
    validationSchema: signupScehma,
    onSubmit: (values, action) => {
      generatehash(values.signupPassword).then((hashPassword) => {
        const signupdataToSend = {username: values.signupUsername,email: values.signupEmail,password: values.signupPassword,};
        signuppuser(signupdataToSend);
        console.log("In");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  const signuppuser = async (data) => {
    try {
      console.log("Its");
      const response = await fetch(signupURL,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(data)});
      console.log(data);
      if (response.ok) {
        console.log("Hello");
        const apiresp = await response.json();
        notifyloadingsignup(true);
        const OTP = generateOTP();
        setGeneratedOtp(OTP);
        sendmail(data,OTP);
        setTimeout(()=>{
          navigate('/emailVerify', { state: { data: data, verifyotp:OTP } });
        },2500);
      }
      else{
        const errormessage = await response.json();
        const {message} = errormessage;
        console.log(message);
        if(message == "Username already exists"){
          notifyerror(message);
        }
        else {
          if(message == "Email already exists"){
            notifyerror(message);
          }else{
            notifyerror("Cannot Fetch Data");
          }
        }
      }
    } catch (error) {
      notifyerror("Failed to Fetch");
    }

  }

  const signinformik = useFormik({
    initialValues: initialsigninValues,
    validationSchema: signinScehma,
    onSubmit: (values, action) => {
      generatehash(values.signinPassword).then((hashPassword) => {
        const data = {email:values.signinEmail , password:values.signinPassword};
        signinuser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  const signinuser = async (data) => {
    const response = await fetch(signinURL,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(data)});
    const APIresp = await response.json();
    if (response.ok) {
      const {message , username} = APIresp;
      const object ={
        username:data.username
      }
      notifyloadingsignin(true);
      console.log(APIresp);
      const newe = username;
      console.log(newe);
      setTimeout(()=>{
        navigate('/chat', { state: { data: object} });
      },4500);
    }
    else{
      const{message} = APIresp;
      if(message == "Email not found."){
        notifyerror("Email not Registered");
      }else{
        if(message == "Incorrect password."){
          notifyerror("Invalid Password");
        }
        else{
          notifyerror("Cannot Connect ");
        }
      }
    }
  }

  const  forgotPass  = async (data) => {
    const response = await fetch(signinURL,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(data)});
    const APIresp = await response.json();
    const {message} = APIresp;
    if(!response.ok){
      if(!data.email){
        notifyerror("Please Enter Email");
      }else{
        if(message == "Email not found."){
          notifyerror("Email not Registered");
        }else{
          if(message == "Incorrect password."){
            notifyloadingforget(true);
          }
      }
    }
  }
}
    
  
  return (
    <div className="login-page">
      <Toaster />
        <div className="login-container" id={id}>
            <div className="login-form">
              <form className="signup-container" onSubmit={signupformik.handleSubmit}>
                  <div className="signup-logo"></div>
                  <div className="login-signup">
                    <h1>Sign Up</h1>
                  </div>
                  <div className="signup-username-container">
                    <div className="signup-username">
                      <input type='text' autoComplete='off' required name='signupUsername' value={signupformik.values.signupUsername} onChange={signupformik.handleChange} onBlur={signupformik.handleBlur} id='signup-username'/>
                        <span></span>
                      <label htmlFor ='signup-username'>Username</label>
                      <FontAwesomeIcon icon={faUser} className='icon' /> 
                    </div>
                    {signupformik.errors.signupUsername && signupformik.touched.signupUsername ? (<p>{signupformik.errors.signupUsername}</p>) : null}
                  </div>
                  <div className="signup-email-container">
                    <div className="signup-email">
                      <input type='text' autoComplete='off' required name='signupEmail' value={signupformik.values.signupEmail} onChange={signupformik.handleChange} onBlur={signupformik.handleBlur} id='signup-email'  />
                      <span></span>
                      <label htmlFor ='signup-email'>Email</label>
                      <FontAwesomeIcon icon={faEnvelope} className='icon' /> 
                    </div>
                    {signupformik.errors.signupEmail && signupformik.touched.signupEmail ? (<p>{signupformik.errors.signupEmail}</p>) : null}
                  </div>
                  <div className="signup-password-container">
                    <div className="signup-password">
                      <input type="password" autoComplete='off' required name='signupPassword' value={signupformik.values.signupPassword} onChange={signupformik.handleChange} onBlur={signupformik.handleBlur} id='signup-pass'/>
                      <span></span>
                      <label htmlFor ="signup-pass" >Password</label>
                      <FontAwesomeIcon icon={faLock} className='icon' /> 
                    </div> 
                    {signupformik.errors.signupPassword && signupformik.touched.signupPassword ? (<p>{signupformik.errors.signupPassword}</p>) : null}
                  </div>
                  <div className="signup-confirm-password-container">
                    <div className="signup-confirm-password">
                      <input type="password" autoComplete='off' required name='signupconfirmPassword' value={signupformik.values.signupconfirmPassword} onChange={signupformik.handleChange} onBlur={signupformik.handleBlur} id='signup-confirmpass'/>
                      <span></span>
                      <label htmlFor ="signup-confirmpass" >Confirm Password</label>
                      <FontAwesomeIcon icon={faLock} className='icon' /> 
                    </div>
                    {signupformik.errors.signupconfirmPassword && signupformik.touched.signupconfirmPassword ? (<p>{signupformik.errors.signupconfirmPassword}</p>) : null}
                  </div>
                  <div className="signup-login">
                    <button type='submit' className='signup-button'>Sign Up
                    </button>
                  </div>
                  <div className="signup-register">
                    <p>Already have an account ?
                      <button className='signup' onClick={()=>setid('nottoggle')}>Sign In</button>
                    </p>
                  </div>
                </form>
              <form className="signin-container" onSubmit={signinformik.handleSubmit}>
                <div className="login-logo"></div>
                <div className="login-signin">
                  <h1>Sign In</h1>
                </div>
                <div className="signin-email-container">
                  <div className="login-email">
                    <input type='text' autoComplete='off' required name='signinEmail' value={signinformik.values.signinEmail} onChange={(e) => {signinformik.setFieldValue('signinEmail', e.target.value); setforgetemail(e.target.value);}} onBlur={signinformik.handleBlur} noValidate id='username'/>
                      <span></span>
                    <label htmlFor ='username'>Email</label>
                    <FontAwesomeIcon icon={faUser} className='icon' /> 
                  </div>
                  {signinformik.errors.signinEmail && signinformik.touched.signinEmail ? (<p>{signinformik.errors.signinEmail}</p>) : null}
                </div>
                <div className="signin-password-container">
                  <div className="login-password">
                    <input type="password" autoComplete='off' required name='signinPassword' value={signinformik.values.signinPassword} onChange={(e) => {signinformik.setFieldValue('signinPassword', e.target.value); setforgetpass(e.target.value);}} onBlur={signinformik.handleBlur}id='pass'/>
                    <span></span>
                    <label htmlFor ="pass" >Password</label>
                    <FontAwesomeIcon icon={faLock} className='icon' /> 
                  </div>
                  {signinformik.errors.signinPassword && signinformik.touched.signinPassword ? (<p>{signinformik.errors.signinPassword}</p>) : null}
                </div>  
                <div className="forgot-remember">
                  <div className="remember-box">
                    <input type='checkbox' id='remember' />
                    <label htmlFor='remember'>Remember me</label>
                  </div>
                  <button type='button' className='forget-button' onClick={()=>{forgotPass({email:forgetemail,password:"abcdfellap"})}} >Forgot Password</button>
                </div>
                <div className="login-login">
                  <button type='submit'  className='login-button' onClick={signinformik.handleSubmit}>Log In</button>
                </div>
                <div className="login-register">
                  <p>Don't have an account ?
                    <button type='button' className='register' onClick={()=>setid('toggle')}>Sign Up</button>
                  </p>
                </div>
              </form>
            </div>
            <div className="image-container"></div>
        </div>
    </div>
  )
}

export default login