import React from 'react'
import '../Pages/All Css files/intro.css'
import { useNavigate, useLocation, } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { ReactTyped } from "react-typed";
function intro() {
  const location = useLocation();
  const navigate = useNavigate();
useEffect(()=>{
  setTimeout(()=>{
    navigate('/login');
  },18000)
},[]);
  return (
    <div className="intro-page">
    <div className="logo-div">
    <div className="logo-image"></div>
    </div>
    <div className="name-healix">
      <h1>HEALIX</h1>
    </div>
    <div className="full-form">
      <h2><ReactTyped strings={["Healthcare Engagement And Assistance With Lifesaving Integration And Expertise "]} typeSpeed={50} className='type'/></h2>
    </div>
  </div>
  )
}

export default intro