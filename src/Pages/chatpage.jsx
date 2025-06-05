import React, { useState,useContext,useEffect } from 'react'
import { LoginContext } from '../contextAPI/LoginContextProvider';
import '../Pages/All Css files/chatpage.css'
import { Route,Routes} from 'react-router-dom';
import Setting from '../components/setting';
import Chat from '../components/chat';
import History from '../components/history';
import Wiki from '../components/wiki';
import { useNavigate,useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const notifyerror = (message) => toast.error(message,{
    duration:4000,
    position:'top-right',
    style: {
      color: '#000'
    }
  });

const chatpage = () => {
    const navigate = useNavigate();
    const contextuser = useContext(LoginContext);
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (contextuser) {
            fetchData(contextuser);
        } else {
            notifyerror("Some Error Occured");
            navigate('/login');
        }
    }, [contextuser]);
      const fetchData = async (data) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${data.user}`;
            const response = await fetch(url);
            if (response.ok) {
                const APIresp = await response.json();
                setUser(APIresp);
            } else {
                notifyerror("User  does not exist");
                setTimeout(() => {
                    navigate('/login');
                }, 4500);
            }
        } catch (error) {
            notifyerror("Error fetching data");
        }
    };
  return (
    <div className="chatpage">
        <Toaster />
        <div className="container-chatpage">
            <div className="sidebar">
                <div className="up">
                <div className="nameLogo-container">
                    <div className="logoHealix"></div>
                    <h1>HEALIX</h1>
                </div>
                <div className="options-container">
                    <button className='chatbutton' id='optionsbutton' 
                    onClick={()=>{navigate('/chat',{state:{user}});}} >Chats</button>
                    <button className='Wiki' id='optionsbutton' 
                    onClick={()=>{navigate('/chat/wiki');}}
                    >Wiki</button>
                    <button className='historybutton' id='optionsbutton' 
                    onClick={()=>{navigate('/chat/history');}}
                    >History</button>
                    <button className='Setting' id='optionsbutton' 
                    onClick={()=>{navigate('/chat/setting');}}
                    >Setting</button>
                </div>
                </div>

                <div className="user-container"></div>
            </div>
            <div className="mainpage">
                <Routes>
                    <Route  path='/' element={<Chat/>} />
                    <Route  path='/wiki' element={<Wiki/>} />
                    <Route  path='/setting' element={<Setting/>} />
                    <Route  path='/history' element={<History />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default chatpage