import { useEffect, useState } from 'react';
import './css/View.css';
import { useHistory, Link } from 'react-router-dom';
import Nav from './Nav';

const axios = require('axios');


export default function View() {
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
    const updateData = async () => {
        getData()
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const capitalize = (word) => (
        word[0].toUpperCase() + word.substring(1)
    )

    const handleEdit = (data) => {
        console.log(data)
        history.push('/home/edit', { state: data })
    }

    const handleDelete = async (id) => {
        await axios.delete('/editCourse', { data: { id } })
            .then(updateData())
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
                        <button onClick={() => handleEdit(c)}>Edit</button>
                        <button onClick={() => handleDelete(c.id)}>Delete</button>
                    </div>
                </div>
            ))
        )
    }
    return (
        <div className="main">
            <Nav />
            <h2>My Courses</h2>
            <div className="course-container">
                {makeCourses()}
            </div>
            <Link to="/home/addcourse"><button className="add-course">Add a new course!</button></Link>
        </div>
    )
}