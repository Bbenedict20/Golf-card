import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './css/Login.css';
import Nav from './Nav';

const axios = require('axios');

export default function Addcourse() {
    const history = useHistory();

    const [curRound, setCurRound] = useState({
        eighteen: true,
        courseName: '',
        city: '',
        state: '',
        color: '',
        hole1: { distance: '', par: '' },
        hole2: { distance: '', par: '' },
        hole3: { distance: '', par: '' },
        hole4: { distance: '', par: '' },
        hole5: { distance: '', par: '' },
        hole6: { distance: '', par: '' },
        hole7: { distance: '', par: '' },
        hole8: { distance: '', par: '' },
        hole9: { distance: '', par: '' },
        hole10: { distance: '', par: '' },
        hole11: { distance: '', par: '' },
        hole12: { distance: '', par: '' },
        hole13: { distance: '', par: '' },
        hole14: { distance: '', par: '' },
        hole15: { distance: '', par: '' },
        hole16: { distance: '', par: '' },
        hole17: { distance: '', par: '' },
        hole18: { distance: '', par: '' },
    })
    const handleChange = e => {
        setCurRound({ ...curRound, [e.target.name]: e.target.value });
    }
    const handleDisChange = (e) => {
        setCurRound({ ...curRound, [e.target.name]: { ...curRound[e.target.name], distance: e.target.value } })
    }
    const handleParChange = e => {
        setCurRound({ ...curRound, [e.target.name.slice(3)]: { ...curRound[e.target.name.slice(3)], par: e.target.value } });
    }
    const makeInputs = (arr) => {
        return arr.map((n) => (

            <div key={`hole${n}`}>
                <label htmlFor={`hole${n}`}>{`Hole ${n}`}</label>
                <input value={Object.values(curRound)[n + 4].distance} onChange={handleDisChange} type="text" id={`hole${n}`} name={`hole${n}`} />
                <label htmlFor={`parhole${n}`}>Par</label>
                <input value={Object.values(curRound)[n + 4].par} id={`parhole${n}`} name={`parhole${n}`} type="text" onChange={handleParChange} />
            </div>
        ))
    }
    const handleRadio = e => {
        e.target.id === 'eighteen'
            ? setCurRound({ ...curRound, eighteen: true })
            : setCurRound({ ...curRound, eighteen: false })
    }
    let config = {
        headers: {
            'Content-Type': "application/json",
        }
    }
    const handleSave = (e) => {
        e.preventDefault();
        axios.post('/newCourse', curRound, config);
        history.push('/home');
    }

    return (
        <div className="main">
            <Nav />
            <h1 className="hole-header">Add a new course</h1>
            <form className="course-form" action="">
                <div>
                    <label htmlFor="eighteen">18</label>
                    <input onChange={handleRadio} type="radio" id="eighteen" name="eighteen" value="eighteen" defaultChecked />
                    <label htmlFor="nine">9</label>
                    <input onChange={handleRadio} type="radio" id="nine" name="eighteen" value="nine" />
                </div>
                <div>
                    <label htmlFor="courseName">Course name</label>
                    <input value={curRound.courseName} onChange={handleChange} name="courseName" id="courseName" type="text" />
                </div>
                <div className="city-state">
                    <label htmlFor="city">City</label>
                    <input value={curRound.city} onChange={handleChange} id="city" name="city" type="text" />
                    <label htmlFor="state">State</label>
                    <input value={curRound.state} onChange={handleChange} id="state" name="state" type="text" />
                </div>
                <div>
                    <label htmlFor="color">Tee color</label>
                    <input value={curRound.color} onChange={handleChange} id="color" name="color" type="text" />
                </div>

                <h3>Tee distances</h3>
                <div className="hole-inputs">
                    {makeInputs(
                        curRound.eighteen
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
                            : [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    )}
                </div>
                <div>
                    <button onClick={handleSave}>Save!</button>
                </div>
            </form>
        </div>
    )
}