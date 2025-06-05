import React from 'react'
import '../Pages/All Css files/chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip,faArrowUp} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect,useRef,useContext } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { LoginContext } from '../contextAPI/LoginContextProvider'
import toast, { Toaster } from 'react-hot-toast';
import { ReactTyped } from "react-typed";
const notifyerror = (message) => toast.error(message,{
    duration:4000,
    position:'top-right',
    style: {
      color: '#000'
    }
  });
const initialmessage = "How can I help you today"
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. In placeat voluptas rerum autem assumenda quas magnam iusto at doloribus esse, odio nemo harum eaque quam dolores laboriosam adipisci sit. Dolore?Consequatur aliquam nulla quidem incidunt esse corrupti voluptatem fugit natus laborum. Doloribus error blanditiis totam laudantium est quod pariatur ut earum sit aspernatur! Beatae fugit nobis autem porro explicabo non!Omnis dolores cum, quibusdam aspernatur quod dicta temporibus eius laborum modi alias, beatae animi quam ex. Nihil expedita voluptatem voluptas a. Voluptatem obcaecati delectus amet? Dicta et corporis molestiae doloremque.Repudiandae aliquam, corrupti voluptatum ad nihil qui? Pariatur nobis exercitationem at commodi temporibus qui libero similique in magnam vero mollitia dolor eveniet, ratione minima voluptate! Accusantium cum unde voluptates porro.Veritatis velit perferendis voluptatem placeat voluptas commodi eos sint pariatur. Facilis magnam unde consectetur! Voluptates, quasi doloremque! Eos mollitia aut, sapiente minima omnis ratione, fugit possimus, ducimus et adipisci nostrum.Dolor est magnam enim exercitationem repellat recusandae provident, numquam beatae eaque odit cumque et ratione excepturi laudantium repellendus sapiente sint aliquam nisi totam debitis. Doloremque, repellat. Expedita nulla eligendi eum.Animi dolore unde temporibus eius recusandae nulla odit facilis, natus praesentium voluptate velit iste voluptates rem officiis reiciendis perspiciatis, dolores obcaecati sapiente. Nemo molestiae nisi minus cupiditate dignissimos molestias modi!";
const chat = () => {
    const contextuser = useContext(LoginContext);
    const responseURL = "https://upright-careful-grackle.ngrok-free.app/chat";
    const [messagearray , setmessagearray ] = useState([initialmessage]);
    const [promptinputmessage,setpromptinputmessage] = useState('');
    const [revertdisease , setrevertdisease ] = useState('');
    const [placeholdervalue,setplaceholdervalue] = useState('Message Healix');
    const [finaluser,setfinaluser] = useState('');
    const [isdiabled,setisdiabled] =  useState('False');
    const refelement = useRef('');
    const lastMessageRef = useRef(null);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagearray]);
    const updatearray = async (data)=>{
        setmessagearray(prevMessages => [...prevMessages, data]);
    }
    useEffect(() => {
        if (isdiabled && refelement.current) {
            refelement.current.focus();
        }
    }, [isdiabled]);
    const sendprompt=async(event)=>{
        setisdiabled("True");
        console.log(isdiabled);
        event.preventDefault();
        if(!promptinputmessage){
            notifyerror("No Prompt Detected");
            return
        }
        updatearray(promptinputmessage);
        const data = {
            username : contextuser.user,
            message : promptinputmessage
        }
        console.log(data);
        try {
            const apiresp = await fetch(responseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!apiresp.ok) {
                throw new Error('Network response was not ok');
            }
            const disease = await apiresp.json();
            console.log(disease);
            if (disease && disease.response) {
                const revert  = disease.response;
                setrevertdisease(revert);
                updatearray(revert);
            } else {
                notifyerror("Invalid response from the server");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            notifyerror("Error fetching data");
            updatearray("Error Please Try again");
        } finally {
            setTimeout(() => { setpromptinputmessage(''); }, 150);
            setisdiabled("False");
        }
    }
  return (
    <div className="chat">
        <Toaster />
        <div className="chatting" ref={lastMessageRef}>
            <div className="transparentblur"></div>
            {messagearray.map((message,index) => (
                <div className="response" key={index} ref={index === messagearray.length - 1 ? lastMessageRef : null}>
                    {
                        index % 2 === 0 ? (
                            index === messagearray.length - 1 ? (
                                <div className='left'>
                                <div className="promptlogocontainer">
                                    <div className="logodiv"></div>
                                    </div>
                                    <p><ReactTyped strings={[message]} typeSpeed={40} /></p>
                            </div>   
                            ) : (
                            <div className='left'>
                                <div className="promptlogocontainer">
                                    <div className="logodiv"></div>
                                    </div>
                                    <p>{message}</p>
                            </div>    
                            )
                        ) : (
                            <div className="rightcontainer">
                                <div className='right'>
                                <p>{message}</p>
                                <div className="promptusercontainer">
                                    <div className="logodiv"></div>
                                    </div>
                                </div>  
                            </div>
                        )
                        }
                </div>
            ))}
        </div>
        <div className="promptbar">
            <div className="promotbar-container">
                <button type='button' className="paperclip-container">
                    <FontAwesomeIcon icon={faPaperclip} className='paperclip' />
                </button>
            <input 
                autoComplete="off" 
                disabled={isdiabled == 'True'}
                ref={refelement} 
                type="text" 
                value={promptinputmessage} 
                onChange={(e)=>{setpromptinputmessage(e.target.value)}}
                onKeyUp={(e) => e.key === 'Enter' ? sendprompt(e) : ''} 
                id='promptbarinput' 
                placeholder={placeholdervalue} /> 
            <div className="submitting">
                <button type='button' onClick={sendprompt} className='promptsubmit'> 
                <FontAwesomeIcon icon={faArrowUp} className='Arrowup' />
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default chat