import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PopUpContainer from '../components/popups/PopUpContainer';
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
  const [PopUpState,setPopUpState] = useState(false);
  const [Password, setPassword] = useState("");
  const [ErrorText, setErrorText] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    if(Password!="1234"){
      console.log("Wrong password!");
      setErrorText("Wrong password!")
      return;
    }
    /*
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
    });*/
    navigate("/Map")
  }

  return (
    <>
        <div className="nav-container">
        <NavLink to="/Start"><img src="logo-purple.png" alt="logo" /></NavLink>
        </div>
        <div className="img-container"><h1>Let's get you riding.</h1></div>
        <form className="login-form" onSubmit={Submit}>
          <div>
            <p>Code</p>
            <input type="text" value={Password} onChange={(e)=>{setPassword(e.target.value);setErrorText(undefined)}} required></input>
          </div>
          <button type="submit">Submit</button>
          {ErrorText!=undefined?<p className='error-text'>{ErrorText}</p>:<p className='error-text invisible'>invisible</p>}
        </form>
        <div className="details-div">
          <p>You may want to screenshot the code in case you forget it.</p>
          <div className="flex align-center">
            <img src="question-circle.svg" alt="icon" />
            <a onClick={()=>setPopUpState(!PopUpState)}>Don’t know how to get this info?</a>
          </div>
        </div>
        <div className="footer flex flex-column align-center">
          <p><NavLink to="/Terms">Terms &amp; Conditions</NavLink> apply.</p>
          <div className="flex align-center justify-center">
            <img src="copyright.svg" alt="icon" />
            <p>2023 Dash v1.0</p>
          </div>
        </div>
        {PopUpState && <PopUpContainer close={()=>setPopUpState(false)} title="Get your code" text="Kindly inquire with the receptionist stationed at the entrance, and they will provide you with a four-digit code for accessing Dash services." />}
    </>
  )
}

export default Login