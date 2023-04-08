import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../Images/Gyaan setu.png';
import './newnav.css';

function Navbar1() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className='backgroundNav'>
      <Container>
         <div className="gyansetu">
         <a className="navbar-brand" href="/">
            <img className='Gyaanlogo' src={logo} alt='' style={{ width: '18%'}}/>
          </a>
        
        <Navbar.Brand href="/index" className="headsetu">GYAAN SETU</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle'/>
        <Navbar.Collapse id="responsive-navbar-nav" >
          
          <Nav className='ml-auto'>
            <Nav.Link href="/community" className='navwork'>Community</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className='navwork'> Contribute </Nav.Link>
            <Nav.Link eventKey={3} href="#memes" className='navwork2'> How it works? </Nav.Link>
            <Nav.Link eventKey={4} href="#memes" className='navwork3'> Log Out </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;