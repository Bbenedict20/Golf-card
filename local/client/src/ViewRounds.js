import { useEffect, useState } from 'react';
import './css/View.css';
import Nav from './Nav';
import './css/View.css';

const axios = require('axios');


export default function ViewRounds() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const getData = async () => {
        const rounds = await axios.post('/getrounds');
        return rounds;
    }
    const updateData = async () => {
        getData()
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const capitalize = (word) => (
        word[0].toUpperCase() + word.substring(1)
    )

    const handleDelete = async (id) => {
        await axios.delete('/deleteRound', { data: { id } })
            .then(updateData())
    }
    const makeRounds = () => {
        if (data.length !== 0) {
            return (
                data.rounds.map((d) => (
                    <div key={d.id} className="course-data" >
                        <div>
                            <p className="round-data round-name">{capitalize(d.courseName)}</p>
                            <p className="round-data">Score: <span>{d.score}</span></p>
                            <p className="round-data">Putts: <span>{d.putts}</span></p>
                            <p className="round-data">FIR: <span>{d.FIR}</span></p>
                            <p className="round-data">GIR: <span>{d.GIR}</span></p>
                        </div>
                        <button onClick={() => handleDelete(d.id)}> Delete</button>
                    </div >
                ))
            )
        }

    }

    return (
        <div className="main">
            <Nav />
            <h2>My rounds</h2>
            <div className="course-container">
                {makeRounds()}
            </div>
        </div>
    )
}