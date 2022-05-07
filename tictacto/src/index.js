import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css"
import App from './App';
import Container from './components/container';
import ToggleBtn from './components/toggleBtn';


const Main = ()=>{
  const [theme,setTheme] = useState("light")
  const root = useRef()
  useEffect(()=>{
    root.current = document.querySelector(":root")
  },[])
  function changeTheme(){
    setTheme(prevTheme=>{
      if(prevTheme === "dark"){
        const newTheme = "light"
        root.current.setAttribute("color-scheme",`${newTheme}`)
        return newTheme
      } 
      else{
        const newTheme = "dark"
        root.current.setAttribute("color-scheme",`${newTheme}`)
        return newTheme
      }  
    })
  }

  return (
    <ToggleBtn onClick={changeTheme} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Main/>
    <Container>
        <App />
    </Container>
  </>
    
);

