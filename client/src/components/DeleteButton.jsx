import React from 'react'
import axios from "axios";

function DeleteButton(props) {

    const { keyboardId, successCallback } = props;

    const deleteItem = (e) => {
        axios.delete(`http://localhost:8000/api/keyboards/${keyboardId}/delete`)
            // .then(res => console.log(res))
            .then(res => {successCallback();})
            .catch(err => console.log(err))
    }
    return (
            <button onClick={deleteItem} type="button">Remove Keyboard</button>
    )
}

export default DeleteButton