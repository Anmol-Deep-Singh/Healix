import React from 'react';
import './App.css';
import { Routes,Route} from 'react-router-dom';
import Login from './Pages/login';
import Intro from './Pages/intro';
import EmailVerify from './Pages/emailVerify';
import Register from './Pages/register';
import ForgotPassword from './Pages/forgotPassword';
import Chatpage from './Pages/chatpage';
import Chat from './components/chat';
import Wiki from './components/wiki';
import Setting from './components/setting';
import History from './components/history';


function App() {
  return (
    
      <div className="app">
        <Routes>
          <Route path='/' element={<Intro/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/resetPassword' element={<ForgotPassword/>} />
          <Route path='/emailVerify' element = {<EmailVerify/>} />
          <Route path='/register/:user' element = {<Register/>} />
          <Route path='/chat/*' element = {<Chatpage/>} >
            <Route  path='' element={<Chat/>} />
              <Route  path='wiki' element={<Wiki/>} />
              <Route  path='setting' element={<Setting/>} />
              <Route  path='history' element={<History/>} />
            </Route>
        </Routes>
      </div>

  )
}

export default App
