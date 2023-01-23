import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const KeycapList = (props) => {
    const [keycaps, setKeycaps] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/keycaps")
            .then((res) => setKeycaps(res.data));
    }, []);
    return (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className='font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-4'>Keycaps</h1>
            <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {keycaps.map((keycap, index) => {
                    return (
                        <div key={index} href={keycap.href} className="group">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <NavLink to={`/keycaps/${keycap._id}`}>
                                    <img
                                        src={keycap.imgUrlMain}
                                        alt={keycap.imageAlt}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </NavLink>
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 text-center">{keycap.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900 text-center">${keycap.price}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default KeycapList