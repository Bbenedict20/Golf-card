import { useHistory } from 'react-router-dom';
import './css/Home.css';

const axios = require('axios');

export default function Nav() {
    const history = useHistory();

    const handleLogout = async () => {
        await axios.post('/logout')
            .then(history.push('/'))
            .catch(e => console.log(e))
    }
    const handleHome = () => {
        history.push('/home');
    }

    return (
        <div className="logout-container">
            <button className="logout" onClick={handleHome}>Home</button>
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    )
}