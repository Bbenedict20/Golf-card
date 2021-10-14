import { useEffect, useState } from 'react';
import './css/View.css';
import { useHistory, Link } from 'react-router-dom';
import Nav from './Nav';

const axios = require('axios');

export default function Addcard() {
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getData()
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const getData = async () => {
        const courses = await axios.post('/getdata');
        return courses;
    }
    const capitalize = (word) => (
        word[0].toUpperCase() + word.substring(1)
    )
    const handleSelect = (data) => {
        history.push('/home/addcard/newcard', { state: data })
    }
    const makeStyle = (color) => {
        if (color.toLowerCase() === 'black') {
            return { backgroundColor: 'rgb(24, 24, 24)', color: 'gold' };
        } else if (color.toLowerCase() === 'blue') {
            return { backgroundColor: 'blue', color: 'white' };
        } else {
            return { backgroundColor: color }
        }
    }
    const makeCourses = () => {
        return (
            data.map((c) => (
                <div key={c.id} id={c.id} className="course-data" style={makeStyle(c.color)}>
                    <div>
                        <p>{capitalize(c.courseName)}</p>
                        <p>{`${capitalize(c.city)}, ${c.state.toUpperCase()}`}</p>
                        <p >{c.eighteen ? 'Eighteen holes' : 'Nine holes'}</p>
                    </div>
                    <div>
                        <button onClick={() => handleSelect(c)}>Select this course!</button>
                    </div>
                </div>
            ))
        )
    }
    return (
        <div className="main">
            <Nav />
            <h2>Choose course to play!</h2>
            <div className="course-container">
                {makeCourses()}
            </div>
            <Link to="/home/addcourse"><button className="add-course">Add a new course!</button></Link>
        </div>
    )
}