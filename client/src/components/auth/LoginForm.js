import Button from 'react-bootstrap/Button'
//import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {

    //context
    const {loginUser} = useContext(AuthContext)

    //router
    //const navigate = useNavigate()

    //local state
    const [loginForm, setLoginForm] = useState({
        username:'',
        password:''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success){

                //navigate('/dashboard')
            }else{
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 5000)
            }
            console.log(loginData) 
            
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
    <Form className='my-4' onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control
                type='text' 
                placeholder='Username' 
                name='username' 
                required
                value={username}
                onChange={onChangeLoginForm}
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
                onChange={onChangeLoginForm}
            />
        </Form.Group>
        <p></p>
        <Button variant='success' type='submit'>Login</Button>
    </Form>
    <p>Dont't have an account?
    <Link to ='/register'>
    <Button variant='info' size='sm' className='ml-2'>Register</Button>
    </Link>
    </p>
    </>
    )
}
export default LoginForm