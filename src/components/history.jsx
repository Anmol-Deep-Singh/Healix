import React, { useState, useEffect,useContext } from 'react';
import '../Pages/All Css files/history.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LoginContext } from '../contextAPI/LoginContextProvider';

const History = () => {
    const contextuser = useContext(LoginContext);
    const [messageArray, setMessageArray] = useState([]);
    useEffect(()=>{
        if(contextuser){
            fetchhistory(contextuser);
        }else{
            notifyerror("Some Error Occured");
            navigate('/login');
        }
    },[contextuser])

    const fetchhistory =  async() =>{
        try {
            const URL = `https://upright-careful-grackle.ngrok-free.app/history?username=${contextuser.user}`;
            const response = await fetch(URL);
            if (response.ok) {
                const APIresp = await response.json();  
            }else{
                notifyerror("User  does not exist");
                setTimeout(() => {
                    navigate('/login');
                }, 4500);
            }
        } catch (error) {
            notifyerror("Error fetching data");
        }
    }
    return (
        <div className="history">
            
        </div>
    );
};

export default History;