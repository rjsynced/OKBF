import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';

const ViewKeyboard = ({ handleAddProduct }) => {
    const { id } = useParams();
    const [keyboard, setKeyboard] = useState({});
    const sucessNotify = () => toast.success('Item has been added to cart');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/keyboards/${id}`)
            .then(res => setKeyboard(res.data))
            .catch((err) => console.log(err)
            )
    }, [id])

    return (
        <div className='container grid grid-cols-2 gap-4 mt-8'>
            <div>
                <Carousel>
                    <div>
                        <img src={keyboard.imgUrlMain} alt="pic" />
                    </div>
                    <div>
                        <img src={keyboard.imgUrlC1} alt="c1" />
                    </div>
                    <div>
                        <img src={keyboard.imgUrlC2} alt="c2" />
                    </div>
                    <div>
                        <img src={keyboard.imgUrlC3} alt="c3" />
                    </div>
                    <div>
                        <img src={keyboard.imgUrlC4} alt="c4" />
                    </div>
                </Carousel>
                <h1>Specs:</h1>
                <div className=''>
                    <p>Case: {keyboard.case}</p>
                    <p>Plate: {keyboard.plate}</p>
                    <p>PCB: {keyboard.pcb}</p>
                    <p>Typing Angle: {keyboard.typingAngle}&deg;</p>
                </div>
                <div className=''>
                    <p>Keycaps: {keyboard.keycaps}</p>
                    <p>Switch Type: {keyboard.switches}</p>
                    <p>Compatibility: {keyboard.compatibility}</p>
                    <p>Weight: {keyboard.weight}kg</p>
                </div>
            </div>
            <div className='flex-direction: column '>
                <h1>
                    {keyboard.name}
                </h1>
                <div>
                    {/* <label>In Stock?</label><span>     </span><label>{keyboard.quantity > 0 ? <box-icon name="hot"></box-icon> : "No"}</label><br /> */}
                    {/* <label>On Sale? {keyboard.onSale ? "Yes" : "No"}</label> */}
                </div>
                <h3>
                    Price: ${keyboard.price}
                </h3>
                <div className='flex'>
                    <p className='text-xl'>Just <span className='text-red-600'>{keyboard.quantity}</span> in stock</p>
                </div>
                <div className='mb-4'>
                    <button onClick={() => {
                        handleAddProduct(keyboard);
                        sucessNotify();
                    }} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add To Cart</button>
                </div>
                <Container >
                    <div className='ratio ratio-16x9'>
                        <iframe className="w-full aspect-video hover:aspect-square" src={`https://www.youtube.com/embed/${keyboard.ytEmbed}`}></iframe>
                    </div>
                </Container>
            </div>
            <div className="max-w-lg rounded-lg shadow-md shadow-blue-600/50 mb-8">
                        <form action="" className="w-full p-4 mt-10">
                            <div className="mb-2">
                                <label for="comment" className="text-lg text-gray-600">Add a Review</label>
                                <ul className="flex justify-center">
                                    <li>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                        </svg>
                                    </li>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                        </svg>
                                    </li>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                        </svg>
                                    </li>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                                        </svg>
                                    </li>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                                        </svg>
                                    </li>
                                </ul>
                                <textarea
                                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                                    name="comment"
                                    placeholder=""></textarea>
                            </div>
                            <div>
                                <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                                    <label>Comment</label>
                                </button>
                                <button className="px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded">
                                    <label>Cancel</label>
                                </button>
                            </div>
                        </form>
                    </div>
            <Toaster />
        </div>
    )
}

export default ViewKeyboard