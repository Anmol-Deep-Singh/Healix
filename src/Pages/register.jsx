import React, { useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faPhone,faCalendarDays,faCloud } from '@fortawesome/free-solid-svg-icons'
import {useFormik} from 'formik';
import { register1 } from '../schemas/index'
import Dropzone from 'react-dropzone'
import { images } from '../components/imageSvg';
import Healiximg from '/Healix.png';
import '../Pages/All Css files/register.css';
import { useEffect } from 'react';
import { useLocation} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
const initialregisterValues = {
  fullname: "",
  age: "",
  mobilenumber: "",
}



const Register = () => {
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
  const registerURL = "https://upright-careful-grackle.ngrok-free.app/register";
  const [id, setId] = useState('');
  const [image, setImage] = useState(images); 
  const [profile,setprofile] = useState(Healiximg);
  const [user,setuser] = useState('User');
  const [sendinfo,setsendinfo] = useState('');
  const [gender,setgender] = useState('');
  const [greyid,setgreyid] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
   useEffect(() => {
    if (location.state && location.state.data) {
      const { data } = location.state;
      console.log(data);
      if (data.username) {
        setuser(data.username);
      }
    }
  }, []);
  const onDrop = useCallback(acceptedFiles => { 
    const file = acceptedFiles[0]; 
  if (file) {
      const preview = URL.createObjectURL(file); 
      change({ img: preview }); 
      console.log(data);
  }
  }, []);
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept: {
      'image/png': ['.png','.jpeg','.jpg'],
      'text/html': ['.html', '.htm'],
    }
  })
const change = ({img}) => {
  console.log("Hello, you clicked on:", img);
  setprofile(img); 
}


const register = useFormik({
  initialValues: initialregisterValues,
  validationSchema: register1,
  onSubmit: async(values,action) =>{
    try {
      if (location.state && location.state.data) {
        const { data } = location.state;
        const senddata = {
          username : data.username,
          email : data.email,
          password : data.password,
          fullName : values.fullname,
          age : values.age,
          mobile : values.mobilenumber,
          avatar : profile,
          gender : gender,
        }
        if(!data.username){
          notifyerror("Some Unexpected Error occured during registeration");
          setTimeout(()=>{
            navigate('/login');
          },2500);
          setTimeout(()=>{notifyerror("Please Login again")},5000);
          return;
        }
        setsendinfo({senddata})
        console.log(sendinfo)
        registerUser(senddata);
      }
    } catch (error) {
      console.error(error);
    }
  }
})

const registerUser = async (data) =>{
  const response = await fetch(registerURL,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(data)});
  console.log(data);
  if(response.ok){
    console.log("Registered")
    const apiresp = await response.json();
    notifysucces(apiresp.message);
    setTimeout(()=>{
      navigate('/chat');
    },4500);
  }
}

  return (
    <div className="register-page">
      <Toaster />
      <form className="register-container" id={id} onSubmit={register.handleSubmit}>
        <div className='register-form'>
          <div className="image-containerUpload">
            <h1>Register ...</h1>
            <p>Enter your details to Continue</p>
            <div className="profileImage-container">
              <div className="image-cont">
                <div className="profile-dp" style={{ backgroundImage: `url(${profile})`}}></div>
                <h2 className='dpname'>{user}</h2>
                <div className="choosefrom">
                  <h3>Choose Your Avatar</h3>
                  <div className="small-logo">
                    {image.map((img, i) => (
                      <button
                        type='button'
                        className={`smallLogo ${profile === img ? 'active' : ''}`}
                        key={i} 
                        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover',backgroundPosition: 'center', width: '50px',height: '50px'}}
                        onClick={() => setprofile(img)}
                      ></button>
                    ))}
                  </div>
                </div>
                <h2 className='Or'>OR</h2>
                <div className="picture">
                <div {...getRootProps()} className='UploadYourimage'>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag 'n' drop you picture here , or click to select</p>
                  }
                </div>
                </div>
              </div>
              <div className="button-container">
                <button type='button' className='nextToinfo' onClick={()=>setId('toggle')}>Next →</button>
              </div>
            </div>
          </div>
          <div className="info-containerUpload">
            <h1>Register ...</h1>
            <p>Enter your details to Continue</p>
            <div className="input-container">
            <div className="profile-dp" style={{ backgroundImage: `url(${profile})`}}></div>
            <h2 className='dpname'>{user}</h2>
              <div className="input-info">
                <div className="fullname-container">
                  <div className="fullnameContainer">
                    <input type='text' autoComplete='off' required name='fullname' value={register.values.fullname} onChange={register.handleChange} onBlur={register.handleBlur} id='register-fullName'/>
                          <span></span>
                    <label htmlFor ='register-fullName'>Full Name</label>
                    <FontAwesomeIcon icon={faUser} className='icon' /> 
                  </div>
                  {register.errors.fullname && register.touched.fullname ? (<p>{register.errors.fullname}</p>) : null}
                </div>
                <div className="age-container">
                  <div className="ageContainer">
                    <input type='text' autoComplete='off' required name='age' value={register.values.age} onChange={register.handleChange} onBlur={register.handleBlur} id='register-age'/>
                            <span></span>
                    <label htmlFor ='register-age'>Age</label>
                    <FontAwesomeIcon icon={faCalendarDays} className='icon' /> 
                  </div>
                  {register.errors.age && register.touched.age ? (<p>{register.errors.age}</p>) : null}
                </div>
                <div className="mobile-container">
                  <div className="mobilenumberContainer">
                    <input type='text' autoComplete='off' required name='mobilenumber' value={register.values.mobilenumber} onChange={register.handleChange} onBlur={register.handleBlur} id='register-mobile'/>
                      <span></span>
                    <label htmlFor ='register-mobile'>Mobile Number</label>
                    <FontAwesomeIcon icon={faPhone} className='icon' /> 
                  </div>
                  {register.errors.mobilenumber && register.touched.mobilenumber ? (<p>{register.errors.mobilenumber}</p>) : null}
                </div>
                <div className="genderContainer">
                  <p>Gender</p>
                  <button type='button' className={`maleChoose ${gender === 'Male' ? 'selected' : 'unselected'}`} onClick={()=> {setgender('Male'); setgreyid('maleID');}} id={greyid}></button>
                  <button type='button' className={`femaleChoose ${gender === 'Female' ? 'selected' : 'unselected'}`} onClick={()=> {setgender('Female'); setgreyid('femaleID');}} id={greyid}></button>
                </div>
              </div>
              <div className="info-Button-Cont">
                <button type='button' className='prevtoimage' onClick={()=>setId('nottoggle')}>← Previous</button>
                <button type='submit' className='RegisterBut'>Register</button>
              </div>
            </div>
          </div>
        </div>
        <div className="imageContainer">
          <div className="register-image"></div>
        </div>
      </form>
    </div>
  )
}

export default Register;