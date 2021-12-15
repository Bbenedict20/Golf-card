import './css/Scoreboard.css';
import React, { useState, useEffect } from 'react'
import Nav from './Nav';


const axios = require('axios');

export default function Stats() {
    const [avgData, setAvgData] = useState({});

    useEffect(() => {
        const averageRounds = (rounds) => {
            let avgData = {};
            let firs = [];
            let girs = [];
            let Escores = [];
            let Eputts = [];
            let Nscores = [];
            let Nputts = [];

            for (let r of rounds) {
                firs.push(r.FIR)
                girs.push(r.GIR)
                if (r.eighteen === 'true') {
                    Escores.push(r.score)
                    Eputts.push(r.putts)
                } else {
                    Nscores.push(r.score)
                    Nputts.push(r.putts)
                }
            }
            avgData = {
                FIR: checkNan(average(firs)).toFixed(0),
                GIR: checkNan(average(girs)).toFixed(0),
                Escores: checkNan(average(Escores)).toFixed(0),
                Eputts: checkNan(average(Eputts)).toFixed(0),
                Nscores: checkNan(average(Nscores)).toFixed(0),
                Nputts: checkNan(average(Nputts)).toFixed(0)
            };
            setAvgData(avgData);
        }
        getData()
            .then(res => averageRounds(res.rounds))
            .catch(err => console.log(err))
    }, [])

    const getData = async () => {
        const courses = await axios.post('/getrounds');
        return courses.data;
    }

    const average = (arr) => {
        let num = 0;
        for (let a of arr) {
            num += parseInt(a);
        }
        num = (num / arr.length - 1);
        if (num > 100) num = 100;
        return num;
    }
    const checkNan = (num) => {
        if (!num) {
            return 0;
        } else {
            return num;
        }
    }

    return (
        <div className="main">
            <Nav />
            <h1 id="score-head">My stats</h1>
            <div className="score-bg">
                <h3 className="score-label">Average 18 hole score: <span>{avgData.Escores}</span></h3>
                <h3 className="score-label">Average putts per 18: <span>{avgData.Eputts}</span></h3>
                <h3 className="score-label">Average 9 hole score: <span>{avgData.Nscores}</span></h3>
                <h3 className="score-label">Average putts per 9: <span>{avgData.Nputts}</span></h3>
                <h3 className="score-label">Average GIR: <span>{avgData.GIR}%</span></h3>
                <h3 className="score-label">Average FIR: <span>{avgData.FIR}%</span></h3>

            </div>
        </div>
    )
}