import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    _id: "",
    name: "",
    price: "",
    brand: "",
    quantity: "",
    imgUrlMain: "",
    imgUrlC1: "",
    imgUrlC2: "",
    imgUrlC3: "",
    imgUrlC4: "",
    ytEmbed: "",
    onSale: false,
    material: "",
    profile: "",
    totalKeys: "",
    weight: "",
    compatibility: ""
}

const KeycapForm = (props) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [serverErrors, setServerErrors] = useState(initialState)
    const [isValid, setIsValid] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/keycaps/${id}`)
                .then(res => setValues(res.data))
                .catch(err => console.log(err))
        }
    }, [id])
    const handleCancel = () => {
        navigate('/')
    }

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setValues({ ...values, [e.target.name]: e.target.checked })
        } else {
            setValues({ ...values, [e.target.name]: e.target.value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValid && !id) {
            axios.post('http://localhost:8000/api/keycaps/new',
                values
            )
                .then(res => {
                    setServerErrors(initialState)
                    setValues(initialState)
                    setErrors(initialState)
                    navigate('/')
                })
                .catch(err => {
                    const errorResponse = err.response.data.error.errors
                    console.log(errorResponse)
                    
                    const errorArr = []
                    for (const key in errorResponse) {
                        errorArr.push(errorResponse[key].message)
                    }
                    console.log(errorArr)
                setServerErrors(errorArr)
                console.log(serverErrors);
                })
        }
        else if (id) {
            axios.put(`http://localhost:8000/api/keycaps/${id}/edit`,
                values
            )
                .then(res => {
                    setServerErrors(initialState)
                    setValues(initialState)
                    setErrors(initialState)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err);
                    const errorResponse = err.response.data.error.errors

                const errorArr = []
                console.log(errorArr)
                for (const key in errorResponse) {
                    errorArr.push(errorResponse[key].message)
                }
                setServerErrors(errorArr)
                console.log(errorArr);
                })
        }
    }
    const handleValidation = (e) => {
        let isValidSubmission = true
        const fieldName = e.target.name
        const value = e.target.value
        if (fieldName === 'name') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Name is required!" });
                isValidSubmission = false
            } else if (value.length < 2) {
                setErrors({ ...errors, [fieldName]: "Name must be 2 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        setIsValid(isValidSubmission)
        if (fieldName === 'price') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "The price is required!" });
                isValidSubmission = false
            } else if (value.length < 2) {
                setErrors({ ...errors, [fieldName]: "The price must be 2 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        setIsValid(isValidSubmission)
        if (fieldName === 'brand') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Brand is required!" });
                isValidSubmission = false
            } else if (value.length < 3) {
                setErrors({ ...errors, [fieldName]: "Brand must be 3 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        setIsValid(isValidSubmission)
        if (fieldName === 'quantity') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Quantity is required!" });
                isValidSubmission = false
            } else if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Quantity must be 1 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        setIsValid(isValidSubmission)
        if (fieldName === 'imgUrl') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Image is required!" });
                isValidSubmission = false
            } else if (value.length < 10) {
                setErrors({ ...errors, [fieldName]: "Image must be 10 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
    }
    return (
        <div className='w-full max-w-xl'>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div>
                    <label htmlFor='_id' className="block text-gray-700 text-sm font-bold mb-2">ID: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='_id' type="text" value={values._id} onChange={handleChange} onBlur={handleValidation} />
                    {errors._id && <p style={{ color: 'red' }}>{errors._id}</p>}
                    {serverErrors[0] && <p style={{ color: 'green' }}>{serverErrors[0]}</p>}
                </div>
                <div>
                    <label htmlFor='name' className="block text-gray-700 text-sm font-bold mb-2">Name: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='name' type="text" value={values.name} onChange={handleChange} onBlur={handleValidation} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    {serverErrors[0] && <p style={{ color: 'green' }}>{serverErrors[0]}</p>}
                </div>
                <div>
                    <label htmlFor='price' className="block text-gray-700 text-sm font-bold mb-2">Price: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='price' type="number" value={values.price} onChange={handleChange} onBlur={handleValidation} />
                    {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                    {serverErrors[1] && <p style={{ color: 'green' }}>{serverErrors[1]}</p>}
                </div>
                <div>
                    <label htmlFor='brand' className="block text-gray-700 text-sm font-bold mb-2">Brand: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='brand' type="text" value={values.brand} onChange={handleChange} onBlur={handleValidation} />
                    {errors.brand && <p style={{ color: 'red' }}>{errors.brand}</p>}
                    {serverErrors[2] && <p style={{ color: 'green' }}>{serverErrors[2]}</p>}
                </div>
                <div>
                    <label htmlFor='quantity' className="block text-gray-700 text-sm font-bold mb-2">Quantity: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='quantity' type="number" value={values.quantity} onChange={handleChange} onBlur={handleValidation} />
                    {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
                    {serverErrors[3] && <p style={{ color: 'green' }}>{serverErrors[3]}</p>}
                </div>
                <div>
                    <label htmlFor='imgUrlMain' className="block text-gray-700 text-sm font-bold mb-2">Main Img: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='imgUrlMain' type="text" value={values.imgUrlMain} onChange={handleChange} onBlur={handleValidation} />
                    {errors.imgUrlMain && <p style={{ color: 'red' }}>{errors.imgUrlMain}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='imgUrlC1' className="block text-gray-700 text-sm font-bold mb-2">Ex. Img 1: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='imgUrlC1' type="text" value={values.imgUrlC1} onChange={handleChange} onBlur={handleValidation} />
                    {errors.imgUrlC1 && <p style={{ color: 'red' }}>{errors.imgUrlC1}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='imgUrlC2' className="block text-gray-700 text-sm font-bold mb-2">Ex. Img 2: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='imgUrlC2' type="text" value={values.imgUrlC2} onChange={handleChange} onBlur={handleValidation} />
                    {errors.imgUrlC2 && <p style={{ color: 'red' }}>{errors.imgUrlC2}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='imgUrlC3' className="block text-gray-700 text-sm font-bold mb-2">Ex. Img 3: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='imgUrlC3' type="text" value={values.imgUrlC3} onChange={handleChange} onBlur={handleValidation} />
                    {errors.imgUrlC3 && <p style={{ color: 'red' }}>{errors.imgUrlC3}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='imgUrlC4' className="block text-gray-700 text-sm font-bold mb-2">Ex. Img 4: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='imgUrlC4' type="text" value={values.imgUrlC4} onChange={handleChange} onBlur={handleValidation} />
                    {errors.imgUrlC4 && <p style={{ color: 'red' }}>{errors.imgUrlC4}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='ytEmbed' className="block text-gray-700 text-sm font-bold mb-2">YT-Embed-Tag : </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='ytEmbed' type="text" value={values.ytEmbed} onChange={handleChange} onBlur={handleValidation} />
                    {errors.ytEmbed && <p style={{ color: 'red' }}>{errors.ytEmbed}</p>}
                    {serverErrors[4] && <p style={{ color: 'green' }}>{serverErrors[4]}</p>}
                </div>
                <div>
                    <label htmlFor='onSale' className="block text-gray-700 text-sm font-bold mb-2">On Sale?: </label>
                    <input type="checkbox" name="onSale" checked={values.onSale} onChange={handleChange}  />
                </div>
                <div>
                    <label htmlFor='material' className="block text-gray-700 text-sm font-bold mb-2">Material: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='material' type="text" value={values.material} onChange={handleChange} onBlur={handleValidation} />
                    {errors.material && <p style={{ color: 'red' }}>{errors.material}</p>}
                </div>
                <div>
                    <label htmlFor='profile' className="block text-gray-700 text-sm font-bold mb-2">Profile: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='profile' type="text" value={values.profile} onChange={handleChange} onBlur={handleValidation} />
                    {errors.profile && <p style={{ color: 'red' }}>{errors.profile}</p>}
                </div>
                <div>
                    <label htmlFor='totalKeys' className="block text-gray-700 text-sm font-bold mb-2">Total Keys: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='totalKeys' type="text" value={values.totalKeys} onChange={handleChange} onBlur={handleValidation} />
                    {errors.totalKeys && <p style={{ color: 'red' }}>{errors.totalKeys}</p>}
                </div>
                <div>
                    <label htmlFor='weight' className="block text-gray-700 text-sm font-bold mb-2">Weight: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='weight' type="text" value={values.weight} onChange={handleChange} onBlur={handleValidation} />
                    {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}
                </div>
                <div>
                    <label htmlFor='compatibility' className="block text-gray-700 text-sm font-bold mb-2">Compatibility: </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='compatibility' type="text" value={values.compatibility} onChange={handleChange} onBlur={handleValidation} />
                    {errors.compatibility && <p style={{ color: 'red' }}>{errors.compatibility}</p>}
                </div>
                <button className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>Submit Form</button>
            </form>
            <button className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClick={() => handleCancel()}>Cancel</button>
        </div>
    )
}

export default KeycapForm