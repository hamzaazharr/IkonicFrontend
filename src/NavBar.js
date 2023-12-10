import React, { Fragment,useState } from "react";
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
const NavBar=(props)=>{
  const history = useHistory();
  // eslint-disable-next-line 
  const [role, setRole] = useState(
    localStorage.getItem('role')
  );
    function getUserLogout(){
        localStorage.setItem('isLoggedIn',false);
        history.go('/');
      }
return(
    <Fragment >
        <div>
        <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {role === 'admin' && (
            <li style={{margin:"10px"}}>
              <Link   to="/users">Users</Link>
            </li>
          )}
            <Link style={{margin:"10px"}} to="/posts" >Posts</Link>
      
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link className="justify-content-end" onClick={() => getUserLogout()} >
                      Logout
                    </Nav.Link>
        </Navbar.Collapse>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
        </div>


    </Fragment>)
}

export default NavBar;