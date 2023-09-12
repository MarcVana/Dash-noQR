import './PopUpContainer.css'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

function RidePopUpContainer({title, speed, distance, time, bike_name, battery, time_remaining, close, pause, setPauseState, className}) {

    const variants = {
        in: {x: -15, transition: {ease: "circOut"}},
        out: {x: 0, transition: {ease: "circOut"}},
    }

    return (
    <>
      <motion.div className={"pop-up-container ride " + className} animate={{ y: -114 }} transition={{ ease: "circOut" }} exit={{y: 269}}>
      {/* <svg onClick={()=>close()} width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29279 4.29308C4.48031 4.10561 4.73462 4.00029 4.99979 4.00029C5.26495 4.00029 5.51926 4.10561 5.70679 4.29308L9.99979 8.58608L14.2928 4.29308C14.385 4.19757 14.4954 4.12139 14.6174 4.06898C14.7394 4.01657 14.8706 3.98898 15.0034 3.98783C15.1362 3.98668 15.2678 4.01198 15.3907 4.06226C15.5136 4.11254 15.6253 4.18679 15.7192 4.28069C15.8131 4.37458 15.8873 4.48623 15.9376 4.60913C15.9879 4.73202 16.0132 4.8637 16.012 4.99648C16.0109 5.12926 15.9833 5.26048 15.9309 5.38249C15.8785 5.50449 15.8023 5.61483 15.7068 5.70708L11.4138 10.0001L15.7068 14.2931C15.8889 14.4817 15.9897 14.7343 15.9875 14.9965C15.9852 15.2587 15.88 15.5095 15.6946 15.6949C15.5092 15.8803 15.2584 15.9855 14.9962 15.9878C14.734 15.99 14.4814 15.8892 14.2928 15.7071L9.99979 11.4141L5.70679 15.7071C5.51818 15.8892 5.26558 15.99 5.00339 15.9878C4.74119 15.9855 4.49038 15.8803 4.30497 15.6949C4.11956 15.5095 4.01439 15.2587 4.01211 14.9965C4.00983 14.7343 4.11063 14.4817 4.29279 14.2931L8.58579 10.0001L4.29279 5.70708C4.10532 5.51955 4 5.26525 4 5.00008C4 4.73492 4.10532 4.48061 4.29279 4.29308Z" fill="black"/>
</svg> */}
            <p className="popup-title">{title}</p>
            <div className="flex align-center ride-options justify-between">
                <div className="number-div">
                    <div className="flex align-end">
                        <h5>{speed}</h5>
                        <p>km/h</p>
                    </div>
                    <p>SPEED</p>
                </div>
                <div className="flex align-center ride-options-circles">
                    <div className="ride-options-circle flex align-center justify-center" onClick={() => setPauseState()}>
                        {!pause ? <img src="pause.svg" alt="icon" /> : <img src="play.svg" alt="icon" />}
                    </div>
                    <NavLink to="/FinishRide">
                        <motion.div className="ride-options-circle stop  flex align-center justify-center"
                            variants={variants} animate={pause ? 'in' : 'out'}>
                            <img src="stop.svg" alt="icon" />
                        </motion.div>
                    </NavLink>
                </div>
            </div>
            <div className="flex align-center gap-4">
                <div className="number-div small">
                    <div className="flex align-end">
                        <h5>{distance}</h5>
                        <p>km</p>
                    </div>
                    <p>DISTANCE</p>
                </div>
                <div className="number-div small">
                    <div className="flex align-end">
                        <h5>{time}</h5>
                        <p>min</p>
                    </div>
                    <p>RIDE TIME</p>
                </div>
            </div>
            <div className="flex align-center bike">
                <img src="placeholder.jpg" alt="bike image" />
                <div>
                    <h6>{bike_name}</h6>
                    <div className="flex align-center bike-info">
                        <div className="flex align-center">
                            <img src="battery.svg" alt="battery icon" className="battery" />
                            <p>{battery}%</p>
                        </div>
                        <div className="flex align-center">
                            <img src="clock.svg" alt="clock icon" className="clock" />
                            <p className="color-gray">{time_remaining} hrs left</p>
                        </div>
                    </div>
                </div>
            </div>
      </motion.div>
      
      {/* <div className='bg-overlay' onClick={()=>close()}/> */}
      </>
    )
  }
  
  export default RidePopUpContainer
  