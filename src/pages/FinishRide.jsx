import { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import './Login.css'
import './FinishRide.css'
import { useNavigate } from 'react-router-dom'
import ReportPopUpContainer from '../components/popups/ReportPopUpContainer'

function FinishRide() {
  const [starState,setStarState] = useState("0");
  const [formState,setFormState] = useState(false);
  const [reportState,setReportState] = useState(false);
  const [popUpState,setPopUpState] = useState(false);
  const distance = "4.7";
  const time = "17";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const Submit = (e) => {
    e.preventDefault();
    //   navigate(`/FinishRide?stars=${starState}`);
        setFormState(true);
      //e.preventDefault();
  }

  const Submit2 = (e) => {
    console.log("Da");
    e.preventDefault();
    //   navigate(`/FinishRide?stars=${starState}`);
        setReportState(true);
        setPopUpState(false);
      //e.preventDefault();
  }

  return (
    <>
        <div className="nav-container">
        <NavLink to="/Start"><img src="logo-purple.png" alt="logo" /></NavLink>
        </div>
        <div className="img-container img-2"><h1>Thank you.</h1></div>
        <div className="finish-ride-container flex flex-column">
            <h2>You finished your ride.</h2>
            <div className="flex align-center gap-4">
                <div className="number-div small">
                    <div className="flex align-end">
                        <h5>{searchParams.get("ride_distance")}</h5>
                        <p>km</p>
                    </div>
                    <p>DISTANCE</p>
                </div>
                <div className="number-div small">
                    <div className="flex align-end">
                        <h5>{searchParams.get("ride_time")}</h5>
                        <p>min</p>
                    </div>
                    <p>RIDE TIME</p>
                </div>
            </div>
            {formState 
            ? <div>
                <p className="success-message">Thank you for submitting.</p>
            </div> 
            : <div>
                <p>Please take a second to rate the experience:</p>
                <div id="full-stars-example-two">
                    <form className="rating-group align-center" onSubmit={Submit}>
                        <input disabled checked className="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio" onClick={() => setStarState("0")} />
                        <label aria-label="1 star" className="rating__label" htmlFor="rating3-1"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-1" value="1" type="radio" onClick={() => setStarState("1")} />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating3-2"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-2" value="2" type="radio" onClick={() => setStarState("2")} />
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating3-3"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-3" value="3" type="radio" onClick={() => setStarState("3")} />
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating3-4"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-4" value="4" type="radio" onClick={() => setStarState("4")} />
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating3-5"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-5" value="5" type="radio" onClick={() => setStarState("5")} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>}
            <div style={{height: "20px"}}></div>
            {reportState 
            ? <div>
                <p className="success-message">Thank you for reporting the problem.</p>
            </div> 
            : <div>
                <a onClick={()=>setPopUpState(!popUpState)}>Report a problem</a>
            </div>}
            <button className="primary-btn"><NavLink to="/Start">Dismiss</NavLink></button>
        </div>
        {popUpState && <ReportPopUpContainer submit_f={Submit2} close={()=>setPopUpState(false)}/>}
    </>
  )
}

export default FinishRide