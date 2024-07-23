import {Nav, Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function NavbarComp() {
    const navigate = useNavigate()
    function handelLogout(){
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand className='mx-3' href="#home">Budget App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link to="/">About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {!localStorage.getItem('token')?<div className="d-flex mx-2">
                        <Link className='mx-2 btn btn-primary' to='/login'>Login</Link>
                        <Link className='mx-2 btn btn-primary' to='/signup'>Signup</Link>
                    </div>: <Button className='mx-2' variant="primary" onClick={handelLogout}>Logout</Button>}
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComp;