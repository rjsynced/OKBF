import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import KeyboardForm from '../components/KBForm'


const UpdateKeyboard = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [keyboard, setKeyboard] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/keyboards/${id}`)
            .then((res) => {setKeyboard(res.data) // returns you an object in an array so use [0] to grab the data
                setLoaded(true)
            })
            .catch((error) => {console.log(error)
            });
        }, [id])

    const updateKeyboard = (keyboard) => {
        axios
            .put(`http://localhost:8000/api/keyboards/${id}/edit`, keyboard)
            .then((res) => {
                navigate("/error");
            })
            .catch((error) => {
                console.log("hello")
                const errorResponse = error.response.data.error.errors;
                console.log(errorResponse)
                const errorArr = [];
                console.log(error)
                for (const key in errorResponse) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Custom Keyboard</h1>
            <h4>Edit {keyboard.name}</h4>
            {errors.map((error, index) => (<p key={index}>{error}</p>))}
            {loaded && (<KeyboardForm onSubmitProp={updateKeyboard} />)}
        </div>
    )
}

export default UpdateKeyboard