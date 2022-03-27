import Button from 'react-bootstrap/Button'
//import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'
import AlertMessage from '../layout/AlertMessage'


const RegisterForm = () => {

    //context
    const {registerUser} = useContext(AuthContext)

    //router
    //const navigate = useNavigate()

    //local state
    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        confirmpassword: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password, confirmpassword} = registerForm

    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

    const register = async event => {
        event.preventDefault()

        if (password !== confirmpassword){
            setAlert({type: 'danger', message: 'Password do not match'})
            setTimeout(() => setAlert(null), 5000)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
			console.log(error)
        }
        
    }

    return (
        <>
    <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control
                type='text' 
                placeholder='Username' 
                name='username' 
                required
                value={username}
                onChange={onChangeRegisterForm}
             />
        </Form.Group>
        <p></p>
        <Form.Group>
            <Form.Control
                type='password'
                placeholder='Password' 
                name='password' 
                required
                value={password}
                onChange={onChangeRegisterForm}
            />
        </Form.Group>
        <p></p>
        <Form.Group>
            <Form.Control
                type='password'
                placeholder='Confirm Password' 
                name='confirmpassword' 
                required
                value={confirmpassword}
                onChange={onChangeRegisterForm}
            />
        </Form.Group>
        <p></p>
        <Button variant='success' type='submit'>Register</Button>
    </Form>
    <p>Already have an account?
    <Link to ='/login'>
    <Button variant='info' size='sm' className='ml-2'>Login</Button>
    </Link>
    </p>
    </>
    )
}
export default RegisterForm