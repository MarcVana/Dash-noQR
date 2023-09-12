import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PopUpContainer from '../components/popups/PopUpContainer';
import './Login.css'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [PopUpState,setPopUpState] = useState(false);
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    navigate("/Map");
  }

  return (
    <>
        <div className="nav-container">
        <NavLink to="/"><img src="logo-purple.png" alt="logo" /></NavLink>
        </div>
        <div className="img-container"><h1>Let's get you riding.</h1></div>
        <form className="login-form" onSubmit={Submit}>
          <div>
            <p>Password</p>
            <input type="text" required></input>
          </div>
          <button type="submit"><NavLink to="/Map">Submit</NavLink></button>
        </form>
        <div className="details-div">
          <p>You may want to screenshot the password in case you forget.</p>
          <div className="flex align-center">
            <img src="question-circle.svg" alt="icon" />
            <a onClick={()=>setPopUpState(!PopUpState)}>Don’t know how to get this info?</a>
          </div>
        </div>
        <div className="footer flex flex-column align-center">
          <p><NavLink to="/Terms">Terms &amp; Conditions</NavLink> apply.</p>
          <div className="flex align-center justify-center">
            <img src="copyright.svg" alt="icon" />
            <p>2023 Dash v0.1</p>
          </div>
        </div>
        {PopUpState && <PopUpContainer title="Get your password" text="You need to... Lorem ipsum dolor sit amet consectetur. Tellus rhoncus morbi eget dignissim. Neque eget id et eu. Sapien aliquam amet mauris sit. Lorem ipsum dolor sit amet consectetur. Tellus rhoncus morbi eget dignissim. Neque eget id et eu. Sapien aliquam amet mauris sit." close={()=>setPopUpState(false)}/>}
    </>
  )
}

export default Login