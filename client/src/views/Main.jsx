import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import axios from 'axios'
import KeyboardList from '../components/KBList';
import KeycapList from '../components/KCList';

const Main = () => {
    const [keyboards, setKeyboards] = useState([]);
    const [keycaps, setKeycaps] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/keyboards')
            .then(res => {
                setKeyboards(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [keyboards]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/keycaps')
            .then(res => {
                setKeycaps(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [keycaps]);

    return (
        <div className='container'>
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg
                    className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9089FC" />
                            <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className='header'>
                {/* <Link className='w-full sm:w-auto px-6 py-3 mb-4 text-base font-semibold leading-6 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200  rounded-full block  bg-transparent hover:bg-green-700  border border-green-700  text-green-700  hover:text-green-200' to="keyboards/new">add a keyboard</Link> */}
            </div>
            {loaded && <KeyboardList keyboards={keyboards} />}
            {loaded && <KeycapList keycaps={keycaps} />}

        </div>
    )
}

export default Main;