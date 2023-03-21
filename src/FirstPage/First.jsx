import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import logo from '../Images/Gyaan setu.png';
import './first.css';
import ArrowIcon from '../Images/9040034_box_arrow_up_right_icon.png';
import backimg from '../Images/futuristic-5g-wireless-network-ai-robot-hand-tap-wifi-icon.jpg';
import backJoin from '../Images/robot-handshake-human-background-futuristic-digital-age.jpg';
import image from '../Images/1000_F_281653938_vmA6yDD7FSEREktJSgSawfUPI8d3Mgn8-PhotoRoom.png-PhotoRoom.png';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';




function Start() {
  //   const handleButtonClick = () => {
  //   props.history.push('../Main/Main.jsx');
  // }

  return (
    <>
    <div>
      <Navbar bg="transparent" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#about" className='navabout'>About</Nav.Link>
          <Nav.Link href="#services" className='navabout'>Services</Nav.Link>
          <Nav.Link href="#blog" className='navabout'>Blog</Nav.Link>
          <Nav.Link href="#contact" className='navabout'>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
         <div className="video-background">
      <video autoPlay loop muted>
        <source src="../Images/mixkit-flying-through-a-virtual-world-of-artificial-intelligence-12254-medium.mp4" type="video/mp4" />
      </video>
    </div>
        <div className='Head'>GYAAN SETU</div>
         {/* <hr className='line' /> */}
         <img src={image} alt="images" className='pinkback1'/>
         <img className='Logo' src={logo}/>
          <img src={image} alt="images" className='pinkback2'/>
           
     
    </div>
    <div className='JoinCom'>
        <h2 className='Join'>Join Our Community</h2>
        <span className='TakeNotes'>Take Notes By </span> 
        <span className='deleting'>Deleting </span>
        <span className='Them'>Them!</span>
    </div>
    <div className='TryIt'>
       <Link to="/index">
        <button className='TryGyaanSetu'>Try Gyaan Setu 
          <img src={ArrowIcon} alt="My Icon" className='ArrowUp'/>
        </button>
      </Link>
    </div>

   <div className='JoinContainer'>
   <img className='JoinImg' src={backJoin} alt='Logo'/>
      <div className='JoinInfo'>
        <h3 className='JoinHead'>Joining the Community helps in</h3>
        <p className='JoinPara'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
      </div>
     
    </div>
   
    <div className='TakeNotesContainer'>
      
      <div className='TakeNotesInfo'>
        <h3 className='TakeNotesHead'>Take Notes By Deleting Them - The Gyaan Setu Algorithm</h3>
        <p className='TakeNotesPara'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
      </div>
    <img className='BackNotes' src={backimg} alt='Logo'/>
    </div>

  <div className='ContributionSector'>
  <h2 className='ContributeHead'>Contribute to Gyaan Setu</h2>
  <p className='ContributePara'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. 
In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
  </div>

    <div className='About'>
        <h3 className='AboutUs'>About Us</h3>
    </div>
 
    <div className="container">
      <div className="profile">
        <img src="https://via.placeholder.com/150" alt="profile" />
        <div className="profile-info">
          <h3>Sukritee Sharma</h3>
          <p>Web Developer</p>
        </div>
      </div>
      <div className="profile">
        <img src="https://via.placeholder.com/150" alt="profile" />
        <div className="profile-info">
          <h3>Srishti Agrawal</h3>
          <p>UI/UX Designer</p>
        </div>
      </div>
    </div>



    <footer className="footer">
      <div className="foot">
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <h7>Legal</h7>
            <ul>
              <li><a href=" " className='terms'>Terms of Use</a></li>
              <li><a href=" " className='terms'>Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-4">
            <h7>Support</h7>
            <ul>
              <li><a href=" " className='terms'>Contact Us</a></li>
              <li><a href=" " className='terms'>FAQ</a></li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-4">
            <h7>Follow Us</h7>
            <ul className="social-icons">
              <li><a href=" "> <img src={ArrowIcon} alt="My Icon" className='ArrowUp'/></a></li>
              <li><a href=" "> <img src={ArrowIcon} alt="My Icon" className='ArrowUp'/></a></li>
              <li><a href=" "> <img src={ArrowIcon} alt="My Icon" className='ArrowUp'/></a></li>
              <li><a href=" "> <img src={ArrowIcon} alt="My Icon" className='ArrowUp'/></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
</>
  );
}

export default Start;