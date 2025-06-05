import React from 'react'
import '../Pages/All Css files/forgotpassword.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { useLocation} from "react-router-dom"
import OtpInput from 'react-otp-input';
import {useFormik} from 'formik';
import emailjs from '@emailjs/browser';


const forgotPassword = () => {
    const [otp, setOtp] = useState('');
    const [Votp,setVotp] = useState('');
    const sendmailagain = () => {
        setVotp(generateOTP());
        const templateParams = {
          user_email: data.signupEmail,
          otp_code: Votp,
          to_name: data.signupUsername
        };
        emailjs.send(
          'service_87xrsmm',    // Replace with your service ID
          'template_hcnrp7c',   // Replace with your template ID
          templateParams,
          '0SJM1SOHLgBKDFfkp'        // Replace with your EmailJS user ID
        )
        .then((response) => {
          console.log('OTP sent again successfully!', response.status, response.text);
        })
        .catch((error) => {
          console.error('Failed to send OTP:', error);
        });
      }
  return (
    <div className="forgotpassword-page">
        <div className="forgotpass-Container">
            <div className="image-container"></div>
                <div className="container">
                    <form className='maincontainer'>
                    <div className="emailVerify-logo"></div>
                    <h1>Healix</h1>
                    <h2>Forgot Password</h2>
                    <p>We have send a Verification code on your email <br/>Email</p>
                    <h3>Please enter the Verification code below</h3>
                    <div className="otp-box">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} style={{ width: 40}} className='otp'/>}
                    />
                    {/* <h4>Please Enter a valid OTP</h4> */}
                    </div>
                    <button type='submit' className='otp-verify'>Verify OTP</button>
                    <div className="resend-box">
                        <p></p>
                        <button type='button' className='Resend' onClick={sendmailagain}>Didn't Recieve the Otp ? Resend OTP</button>
                    </div>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default forgotPassword