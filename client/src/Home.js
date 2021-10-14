import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './css/Home.css';
import Nav from './Nav';

const axios = require('axios');


export default function Home(props) {
    const history = useHistory();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        checkIsLogged();
    })
    const checkIsLogged = async () => {
        const res = await axios.post('/islogged');
        if (!res.data) {
            history.push('/');
        } else {
            setIsLogged(res.data);
        }
    }

    if (isLogged) {
        return (
            <div className="main">
                <Nav />
                <h2>Welcome!</h2>
                <div className="home-container">

                    <Link to="/home/addcard"><button>Add a new round</button></Link>
                    <Link to="/home/addcourse"><button>Add a new course</button></Link>
                    <Link to="/home/view"><button>View/edit courses</button></Link>
                    <Link to="/home/viewrounds"><button>View rounds</button></Link>
                    <Link to="/home/stats"><button>Check stats</button></Link>

                </div>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}