import React, { useState } from 'react'
import './css/Card.css';
import Label from './Label';
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';

export default function Card(props) {
    const location = useLocation();

    const [front, setFront] = useState(true);
    const [done, setDone] = useState(false);

    const [curScores, setCurScores] = useState({
        'one': 0,
        'two': 0,
        'three': 0,
        'four': 0,
        'five': 0,
        'six': 0,
        'seven': 0,
        'eight': 0,
        'nine': 0,
    });
    const [curPutts, setCurPutts] = useState({
        'one': 0,
        'two': 0,
        'three': 0,
        'four': 0,
        'five': 0,
        'six': 0,
        'seven': 0,
        'eight': 0,
        'nine': 0,
    });
    const [curF, setCurF] = useState({
        'one': false,
        'two': false,
        'three': false,
        'four': false,
        'five': false,
        'six': false,
        'seven': false,
        'eight': false,
        'nine': false,
    });
    const [curG, setCurG] = useState({
        'one': false,
        'two': false,
        'three': false,
        'four': false,
        'five': false,
        'six': false,
        'seven': false,
        'eight': false,
        'nine': false,
    });

    const addObj = (obj, k) => {
        let result = 0;
        for (let o in obj) {
            result += Number(obj[o]);
        }
        return result;
    }
    const getPerc = (obj, k) => {
        let arr = Object.values(obj); //make array from values of objects
        let num = (arr.filter(Boolean).length); //find how many are true
        return (Math.round((num / 9) * 100)); //divide by 9 and multiply by 100 then round
    }

    const clearCard = () => {
        setCurScores({
            'one': 0,
            'two': 0,
            'three': 0,
            'four': 0,
            'five': 0,
            'six': 0,
            'seven': 0,
            'eight': 0,
            'nine': 0,
        })
        setCurPutts({
            'one': 0,
            'two': 0,
            'three': 0,
            'four': 0,
            'five': 0,
            'six': 0,
            'seven': 0,
            'eight': 0,
            'nine': 0,
        })
        setCurF({
            'one': false,
            'two': false,
            'three': false,
            'four': false,
            'five': false,
            'six': false,
            'seven': false,
            'eight': false,
            'nine': false,
        })
        setCurG({
            'one': false,
            'two': false,
            'three': false,
            'four': false,
            'five': false,
            'six': false,
            'seven': false,
            'eight': false,
            'nine': false,
        })
    }
    const addScores = () => {
        if (location.state.state.eighteen) {
            let newTot = (props.myScore.front.score + props.myScore.back.score);
            let newPutts = (props.myScore.front.putts + props.myScore.back.putts);
            let newF = (props.myScore.front.FIR + props.myScore.back.FIR);
            let newG = (props.myScore.front.GIR + props.myScore.back.GIR);
            let courseName = location.state.state.courseName;
            let eighteen = location.state.state.eighteen;
            props.setMyScore({
                ...props.myScore, total: {
                    eighteen, courseName, score: newTot, putts: newPutts, FIR: newF, GIR: newG
                }
            })
        } else {
            let newTot = (props.myScore.front.score);
            let newPutts = (props.myScore.front.putts);
            let newF = (props.myScore.front.FIR);
            let newG = (props.myScore.front.GIR);
            let courseName = location.state.state.courseName;
            let eighteen = location.state.state.eighteen;
            props.setMyScore({
                ...props.myScore, total: {
                    eighteen, courseName, score: newTot, putts: newPutts, FIR: newF, GIR: newG
                }
            })
        }

    }
    const handleButton = () => {
        let newScore = addObj(curScores);
        let newPutts = addObj(curPutts);
        let newFir = getPerc(curF);
        let newGir = getPerc(curG);
        if (location.state.state.eighteen) {
            if (!done) {
                if (front) {
                    const card = document.querySelector('#card-bg');
                    card.classList.add('spin')
                    setTimeout(() => {
                        card.classList.remove('spin')
                        props.setMyScore({ ...props.myScore, front: { score: newScore, putts: newPutts, FIR: newFir, GIR: newGir } })
                        clearCard();
                        setFront(false);
                    }, 600)
                } else if (!front) {
                    props.setMyScore({ ...props.myScore, back: { score: newScore, putts: newPutts, FIR: newFir, GIR: newGir } })
                    setDone(true);
                }
            } else if (done) { addScores() }
        } else {
            if (!done) {
                props.setMyScore({ ...props.myScore, front: { score: newScore, putts: newPutts, FIR: newFir, GIR: newGir } })
                setDone(true);
            } else if (done) { addScores() }
        }

    }

    const setTotal = (k, val) => {
        props.setMyScore({ ...props.myScore, [k]: val });
    }

    const makeDistanceArray = ({ state }, frontN) => {
        const course = { frontNine: [], backNine: [] }
        for (let h in state) {
            if (h[0] === 'h') {
                if (h.length === 5) {
                    course.frontNine.push(state[h].distance);
                } else {
                    course.backNine.push(state[h].distance);
                }
            }
        }
        if (frontN === true) {
            return course.frontNine;
        } else {
            return course.backNine;
        }
    }
    const makeParArray = ({ state }, frontN) => {
        const course = { frontNine: [], backNine: [] }
        for (let h in state) {
            if (h[0] === 'h') {
                if (h.length === 5) {
                    course.frontNine.push(state[h].par);
                } else {
                    course.backNine.push(state[h].par);
                }
            }
        }
        if (frontN === true) {
            return course.frontNine;
        } else {
            return course.backNine;
        }
    }
    const makeTees = () => {
        if (front) {
            return (
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Tees"
                        color={location.state.state.color.toLowerCase()}
                        data={makeDistanceArray(location.state, true)}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Tees"
                        color={location.state.state.color.toLowerCase()}
                        data={makeDistanceArray(location.state, false)}
                    />
                </div>
            )
        }
    }
    const makePar = () => {
        if (front) {
            return (
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Par"
                        data={makeParArray(location.state, true)}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Par"
                        data={makeParArray(location.state, false)}
                    />
                </div>
            )
        }
    }

    return (
        <div className="main">
            <Nav />
            <h1 id="card-header">Add new scorecard!</h1>
            <h2 id="card-subheader">{location.state.state.courseName}</h2>
            <h3 id="card-subheader">{front ? 'Front nine' : 'Back nine'}</h3>
            <div className="card-bg" id="card-bg">
                {makeTees()}
                {makePar()}
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Name"
                        name="Hole"
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    />
                </div>
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Score"
                        data={Object.keys(curScores)}
                        curScores={curScores}
                        setCurScores={setCurScores}
                    />
                </div>
                <div>
                    <Label
                        setTotal={setTotal}
                        curF={curF}
                        setCurF={setCurF}
                        data={Object.keys(curF)}
                        label="FIR"
                    />
                </div>
                <div>
                    <Label
                        setTotal={setTotal}
                        label="GIR"
                        curG={curG}
                        setCurG={setCurG}
                        data={Object.keys(curG)}
                    />
                </div>
                <div>
                    <Label
                        setTotal={setTotal}
                        label="Putts"
                        curPutts={curPutts}
                        setCurPutts={setCurPutts}
                        data={Object.keys(curPutts)}
                    />
                </div>
            </div>
            {
                done
                    ? <Link to='/home/addcard/scoreboard'><button onClick={addScores} id="sub-button">Add Scorecard!</button></Link>
                    : <button onClick={handleButton} id="sub-button">Submit</button>
            }
        </div>
    )
};