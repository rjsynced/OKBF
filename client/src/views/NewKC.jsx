import React from 'react'
import { useState } from 'react'
import KeycapForm from '../components/KCForm';

const NewKeycap = () => {

    const [errors, setErrors] = useState([]);

    return (
        <div className='container'>
            <h4>Please fill out fields</h4>
            {errors.map((error, index) => ( <p key={index}>{error}</p>))}
            <KeycapForm serverErrors={errors}/>
        </div>
    )
}

export default NewKeycap