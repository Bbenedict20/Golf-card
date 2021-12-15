import React from 'react'
import { v4 as uuid } from 'uuid';


export default function Score(props) {

    const handleChange = e => {
        props.setCurScores({ ...props.curScores, [e.target.name]: e.target.value })
    }
    const handleCheck = e => {
        props.setCurScores({ ...props.curScores, [e.target.name]: e.target.checked })
    }
    const mapInputs = (isNum) => {
        if (isNum) {
            return (
                props.data.map((d) => (
                    <input
                        key={uuid()}
                        onChange={handleChange}
                        type="number"
                        name={d}
                        value={props.curScores[d]}
                        className="label-data">
                    </input>
                ))
            )
        } else if (!isNum) {
            return (
                props.data.map((d) => (
                    <input
                        className="label-checkbox"
                        key={uuid()}
                        id={uuid()}
                        name={d}
                        type="checkbox"
                        checked={props.curScores[d]}
                        onChange={handleCheck}
                    />
                ))
            )
        }
    }
    return (
        <form action="" className="label-form">

            {mapInputs(props.isNum)}
        </form>

    )
}