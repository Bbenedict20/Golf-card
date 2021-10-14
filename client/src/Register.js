import { useHistory } from 'react-router-dom';
import useFormState from './hooks/useFormState';

const querystring = require('querystring');
const axios = require('axios');

export default function Register() {
    const [user, updateUser] = useFormState('');
    const [pass, updatePass] = useFormState('');
    const [passX, updatePassX] = useFormState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (user && pass && pass === passX) {
            axios.post('/register', querystring.stringify({
                user,
                pass
            }))
                .then((res) => {
                    if (res.data === 'username') {
                        alert('Please enter a unique username!')
                    } else {
                        history.push('/');
                    }
                })
        } else if (!user) {
            alert('Please enter a username!')
        } else if (!pass) {
            alert('Please enter a password!')
        } else if (pass !== passX) {
            alert('Please make sure passwords match!')
        }
    }
    return (
        <div className="main">
            <h1 className="head-text ">Register new account</h1>
            <form className="login-form" action="">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" value={user} name="username" id="username" onChange={updateUser} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={pass} id="password" onChange={updatePass} />
                </div>
                <div>
                    <label htmlFor="passwordX">Retype password:</label>
                    <input type="password" name="passwordX" value={passX} id="passwordX" onChange={updatePassX} />
                </div>
                <div>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>
    )
}