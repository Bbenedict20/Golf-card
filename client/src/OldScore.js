import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function Score(props) {

    const [score, setScore] = useState(0);
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setScore(e.target.value);
        props.setCurScores({ ...props.curScores, [props.holeNum]: e.target.value })
    }

    const handleCheck = e => {
        setChecked(e.target.checked)
        props.setCurScores({ ...props.curScores, [props.holeNum]: e.target.checked })
    }
    if (props.num) {
        return (
            <input
                key={uuid()}
                id={uuid()}
                value={score}
                className="label-data"
                type="number"
                onChange={handleChange}
            />

        )
    } else {
        return (
            <input
                className="label-checkbox"
                key={uuid()}
                id={uuid()}
                type="checkbox"
                checked={checked}
                onChange={handleCheck}
            />
        )
    }
}