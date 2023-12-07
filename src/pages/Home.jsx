import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'
import useWindowDimensions from '../hooks/getWindowDimensions';

function Home() {
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const navigateStart = () => {
    if (width <= 476)
      navigate("/start");
    else {
      document.querySelector(".error-app").style.display = "block";
    }
  }

  return (
    <div className="homepage">
      <p className="error-app">You can only acccess the app via a mobile device.</p>
      <nav className="primary-nav">
        <div className="container flex align-center justify-between">
          <div className="left flex align-center">
            <NavLink to="/"><img src="logo-purple.png" alt="logo" /></NavLink>
          </div>
          <div className="right flex align-center">
            {/* <NavLink to="/waitlist" className="secondary-btn flex align-center">Join the waitlist <span><img src="btn-arrow.svg" alt="arrow icon"></img></span></NavLink> */}
            <NavLink onClick={navigateStart} className="primary-btn">Go to App</NavLink>
          </div>
        </div>
      </nav>
      <main>
        <section className="hero">
          <div className="container flex align-stretch justify-between">
            <div className="left position-relative flex flex-column justify-between">
              <p className="hidden-h1-span">simplified, pollution-free</p>
              <h1>Your best partner for <br/> <span>simplified, pollution-free</span>  <br/> transportation</h1>
              <div className="flex boxes-wrapper">
                <NavLink to="/">
                  <div className="box blue-bg position-relative flex flex-column justify-between">
                    <img src="export-arrow.svg" alt="export icon" />
                    <p>5 simple steps to get started with dash</p>
                    <h6>App Guide</h6>
                  </div>
                </NavLink>
                <NavLink to="/">
                  <div className="box w2 video-bg position-relative flex flex-column justify-between">
                    <img src="play-fill.svg" alt="play icon" />
                    <p>explore a journey with dash</p>
                    <h6>See the magic in 60 seconds</h6>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="right flex flex-column justify-between">
              <img src="homepage-hero.png" alt="people with a dash bike" />
              <div className="stats-wrapper flex align-center justify-between">
                <div className="stats-div flex flex-column align-center">
                  <h6>1</h6>
                  <p>City</p>
                </div>
                <div className="stats-div flex flex-column align-center">
                  <h6>1</h6>
                  <p>Country</p>
                </div>
                <div className="stats-div flex flex-column align-center">
                  <h6>8</h6>
                  <p>Vehicles</p>
                </div>
              </div>
              <p className="cta-helper">You can get <span>50% off</span> your first 3 rides.</p>
              <NavLink onClick={navigateStart} className="big-btn flex align-center">
                <p>Start Riding</p>
                <img src="btn-arrow.svg" alt="arrow icon" />
              </NavLink>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Home