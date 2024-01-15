import "./style.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Form from "./components/Form.jsx";
import Challenges from "./components/Challenges.jsx";
import Progress from "./components/Progress.jsx";
import UpdateProgress from "./components/UpdateProgress.jsx";
import Coaching from "./components/Coaching.jsx";
import Message from "./components/Message.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/form" exact element={<Form />} />
        <Route path="/challenges" exact element={<Challenges />} />
        <Route path="/progress" exact element={<Progress />} />
        <Route path="/update-progress" exact element={<UpdateProgress />} />
        <Route path="/coaching" exact element={<Coaching />} />
        <Route path="/message" expact element={<Message/>}/>
        <Route path="/profile" expact element={<Profile/>}/>
        <Route path="/settings" expact element={<Settings/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
