import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'

const NavbarMenu = () => {
    const {authState: {user: {username}},logoutUser} = useContext(AuthContext)
    const logout =() => logoutUser()
    return (
        <Navbar expaand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img src={learnItLogo} alt='learnItLogo' width='32' height='32' className='mr-2' />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'> 
                <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link} >
                    Dashboard
                </Nav.Link>
                
            </Nav>
            </Navbar.Collapse>
            <Nav >
            <Nav.Link className='font-weight-bolder text-white' disabled>
                    Welcome {username}
                </Nav.Link>
                <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
                    <img src={logoutIcon} alt='logoutIcon' weight='32' height='32' className='mr-2'/>
                    Logout
                </Button>
            </Nav>

        </Navbar>
    )
}

export default NavbarMenu