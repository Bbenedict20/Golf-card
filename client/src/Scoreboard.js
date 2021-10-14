import './css/Scoreboard.css';
import { useHistory } from 'react-router-dom';

const axios = require('axios');
const querystring = require('querystring');



export default function Scoreboard(props) {
    const history = useHistory();

    const handleSave = async () => {
        await axios.post('/postRound', querystring.stringify({
            eighteen: props.myScore.total.eighteen,
            courseName: props.myScore.total.courseName,
            score: props.myScore.total.score,
            GIR: props.myScore.total.GIR,
            FIR: props.myScore.total.FIR,
            putts: props.myScore.total.putts
        }))
            .then(history.push('/home'))
            .catch(err => console.log(err))
    }
    return (
        <div className="main">

            <h1 id="score-head">Round stats</h1>
            <h2 className="sub-head">{props.myScore.total.courseName}</h2>
            <div className="score-bg">
                <h3 className="score-label">Score: <span>{props.myScore.total.score}</span></h3>
                <h3 className="score-label">GIR: <span>{props.myScore.total.GIR}%</span></h3>
                <h3 className="score-label">FIR: <span>{props.myScore.total.FIR}%</span></h3>
                <h3 className="score-label">Putts: <span>{props.myScore.total.putts}</span></h3>
            </div>
            <button onClick={handleSave} className="score-button">Save score</button>
        </div>
    )
}