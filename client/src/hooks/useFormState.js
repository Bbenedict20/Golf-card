import { useState } from 'react'

export default function useFormState(initalVal) {
    const [value, setValue] = useState(initalVal);
    const handleChange = e => {
        setValue(e.target.value);
    };

    return [value, handleChange];
};