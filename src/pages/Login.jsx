import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PopUpContainer from '../components/popups/PopUpContainer';
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
  const [PopUpState,setPopUpState] = useState(false);
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    var data = '{\n  "userKey": "jzah5zxlm7mxmsl1wgbxyn2dzb6akluq",\n  "timestamp": "",\n  "sign": "",\n  "imei": "868963047087986",\n  "operate": "lock",\n  "expireTime": ""\n}';
    var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://iot-api.okai.co/shareos-device/scooter/control/switchLock',
     headers: { 
    'Content-Type': 'application/json;charset=utf-8'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    navigate("/Map")
    })
    .catch(function (error) {
    console.log(error);
    });
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
          <button type="submit">Submit</button>
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
        {PopUpState && <PopUpContainer close={()=>setPopUpState(false)}/>}
    </>
  )
}

export default Login