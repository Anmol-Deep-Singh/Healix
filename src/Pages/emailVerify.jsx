import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { useLocation} from "react-router-dom"
import OtpInput from 'react-otp-input';
import {useFormik} from 'formik';
import { verifyEmail } from '../schemas/index';
import '../Pages/All Css files/emailVerify.css'
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
const verifyOtpshema  = {
  verifyCode: ""
}
function emailVerify() {
  const [otp, setOtp] = useState('');
  const [email,setemail] = useState('');
  const [Votp,setVotp] = useState('');
  const location = useLocation();
  const { state } = location;
  const { data, verifyotp } = state;
  const navigate = useNavigate();

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
  const Sendagain = (resend) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (resend) {
          console.log("Hello");
          resolve('OTP sent successfully!');
        } else {
          reject(new Error('Failed to send OTP.'));
        }
      }, 3000); 
    });
  };
  const notifyloading = (email,resend) => toast.promise(
     Sendagain(resend),
     {
       loading: 'Sending..',
       success: "OTP Sent" ,
       error: "Failed to sent OTP",
     },{
      duration:4000,
      position:'top-right',
      style: {
      color: '#000'
      }
     }
   );
  
  useEffect(() => {
    setemail(data.signupEmail);
  }, []);
  useEffect(() => {
    console.log(Votp);
  },[Votp]);
  const veryifyotpformik = useFormik({
    initialValues: verifyOtpshema,
    validationSchema: verifyEmail,
    onSubmit: async (values,action) =>{
      console.log(data);
      try{
        const currentVotp = verifyotp;
        if(currentVotp == otp){
          console.log("OTP is correct");
          notifysucces("Email Verified")
          console.log()
          setTimeout(()=>{navigate(`/register/${data.username}`, { state: {data} });},2500);
        }else{
          console.log("meow");
          notifyerror("Invaid OTP");
        }
      }
      catch(error){
        console.log(error);
      }
    }
  })
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  const sendmailagain = () => {
    setVotp(generateOTP());
    const templateParams = {
      user_email: data.email,
      otp_code: Votp,
      to_name: data.username
    };
    emailjs.send(
      'service_87xrsmm',    // Replace with your service ID
      'template_hcnrp7c',   // Replace with your template ID
      templateParams,
      '0SJM1SOHLgBKDFfkp'        // Replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('OTP sent again successfully!', response.status, response.text);
      notifyloading(data.signupEmail,true);
    })
    .catch((error) => {
      console.error('Failed to send OTP:', error);
      notifyloading(data.signupEmail,false);
    });
  }

  return (
    <div className="emailVerify-page">
      <Toaster />
        <div className="emailVerify-container">
            <form className="otpVerify-container" onSubmit={veryifyotpformik.handleSubmit}>
              <div className="emailVerify-logo"></div>
              <h1>Healix</h1>
              <h2>Verify Your Email</h2>
              <p>We have send a Verification code on your email <br/>{email}</p>
              <h3>Please enter the Verification code below</h3>
              <div className="otp-box">
                    <OtpInput
                      value={otp}
                      onChange={(otp) => {
                        setOtp(otp);
                        veryifyotpformik.setFieldValue('verifyCode', otp);
                      }}
                      numInputs={6}
                      renderSeparator={<span></span>}
                      renderInput={(props) => <input {...props} style={{ width: 40}} className='otp'/>}
                    />
                    {/* <h4>Please Enter a valid OTP</h4> */}
              </div>
              <button type='submit' className='otp-verify'>Verify OTP</button>
              <div className="resend-box">
                <p></p>
                <button type='button' onClick={sendmailagain} className='Resend'>Didn't Recieve the Otp ? Resend OTP</button>
              </div>
            </form>
            <div className="emailVerify-image"></div>
        </div>
    </div>
  )
}

export default emailVerify