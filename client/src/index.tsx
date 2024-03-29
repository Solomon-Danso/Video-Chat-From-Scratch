import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RoomProvider} from "./context/RoomContext"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from './pages/Home';
import { Room } from './pages/Room';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   
   <BrowserRouter>
   
    <RoomProvider>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/room/:id" element={<Room/>}/>




    </Routes>
    </RoomProvider>
    
    </BrowserRouter>

  </React.StrictMode>
);

