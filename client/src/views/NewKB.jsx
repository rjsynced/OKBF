import React from 'react'
import { useState } from 'react'
import KeyboardForm from '../components/KBForm'
const NewKeyboard = () => {

    const [errors, setErrors] = useState([]);

    return (
        <div className='container'>
            <h4>Please fill out fields</h4>
            {errors.map((error, index) => ( <p key={index}>{error}</p>))}
            <KeyboardForm serverErrors={errors}/>
        </div>
    )
}

export default NewKeyboard