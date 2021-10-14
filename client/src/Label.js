import './css/Label.css';
import Score from './Score';

const { v4: uuid } = require('uuid');

export default function Label(props) {
    const addArray = (arr) => {
        let result = 0;
        for (let a of arr) {
            result += parseInt(a);
        }
        return result;
    }

    const addObj = (obj) => {
        let result = 0;
        for (let o in obj) {
            result += Number(obj[o]);
        }

        return result;
    }

    const getPerc = obj => {
        let arr = Object.values(obj); //make array from values of objects
        let num = (arr.filter(Boolean).length); //find how many are true
        return `${(Math.round((num / 9) * 100))}%`; //divide by 9 and multiply by 100 then round
    }
    const makeStyle = () => {
        if (props.color === 'black') {
            return { backgroundColor: 'rgb(24, 24, 24)', color: 'gold' };
        } else if (props.color === 'blue') {
            return { backgroundColor: 'blue', color: 'white' };
        } else {
            return { backgroundColor: props.color }
        }
    }
    const mapData = () => {
        const data = props.data;

        return (
            data.map((d) => (
                <div key={uuid()} className="label-data" style={makeStyle()}>{d}
                </div>
            ))
        )
    }
    const renderSwitch = () => {
        switch (props.label) {
            case 'Tees':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        {mapData()}
                        <div className="label-data" style={makeStyle()}>{addArray(props.data)}</div>
                    </div>
                )
            case 'Par':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        {mapData()}
                        <div className="label-data">{addArray(props.data)}</div>
                    </div>
                )
            case 'Name':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.name}
                            </p>
                        </div>
                        {mapData()}
                        <div className="label-data"><strong>Out</strong></div>
                    </div>
                )
            case 'Score':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        <Score isNum={true} data={props.data} setCurScores={props.setCurScores} curScores={props.curScores} />
                        <div className="label-data">{addObj(props.curScores)}</div>
                    </div>
                )
            case 'FIR':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        <Score isNum={false} data={props.data} setCurScores={props.setCurF} curScores={props.curF} />
                        <div className="label-data">{getPerc(props.curF)}</div>
                    </div>
                )
            case 'GIR':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        <Score isNum={false} data={props.data} setCurScores={props.setCurG} curScores={props.curG} />
                        <div className="label-data">{getPerc(props.curG)}</div>
                    </div>
                )
            case 'Putts':
                return (
                    <div className="row">
                        <div className="label-box">
                            <p>
                                {props.label}
                            </p>
                        </div>
                        <Score isNum={true} data={props.data} setCurScores={props.setCurPutts} curScores={props.curPutts} />
                        <div className="label-data">{addObj(props.curPutts)}</div>
                    </div>
                )
            default:
                console.log('sorry')
        }
    }

    return (
        renderSwitch()
    )
};