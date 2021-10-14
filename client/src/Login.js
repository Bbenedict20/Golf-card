import './css/Login.css'
import { Link, useHistory } from 'react-router-dom';
import useFormState from './hooks/useFormState';

const axios = require('axios');
const querystring = require('querystring');



export default function Login(props) {
    const [user, updateUser] = useFormState('');
    const [pass, updatePass] = useFormState('');
    const history = useHistory();

    const handleLogin = async (e, user, pass) => {

        const form = document.querySelector('.login-form');

        e.preventDefault();
        await axios.post('/checklogin', querystring.stringify({ user, pass }))
            .then((res) => {
                if (res.data === 'fail') {
                    let failText = document.createElement('p');
                    failText.innerText = 'Please enter a valid username and password!'
                    failText.id = 'fail-text';
                    form.prepend(failText);
                } else if (res.data === 'wrong') {
                    if (!document.querySelector('#fail-text')) {
                        let failText = document.createElement('p');
                        failText.innerText = 'Please enter a valid username and password!'
                        failText.id = 'fail-text';
                        form.prepend(failText);
                    }
                } else if (res.data === 'success') {
                    props.setIsLogged(true);
                    history.push('/home');
                }
            })
            .catch(err => console.log(`error! ${err}`))
    }
    return (
        <div className="main">
            <h1 className="head-text">Login or register new account!</h1>
            <form className="login-form" action="">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" value={user} onChange={updateUser} name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="username">Password:</label>
                    <input type="password" value={pass} onChange={updatePass} name="password" id="password" />
                </div>
                <div>
                    <button onClick={(e) => handleLogin(e, user, pass)}>Log in!</button>
                    <Link to="/register"><button>Register</button></Link>
                </div>
            </form>
        </div>
    )
}