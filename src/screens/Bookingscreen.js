import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function Bookingscreen() {
    let { roomid } = useParams(); // Destructure the roomid from the useParams object
    console.log(roomid); // roomid should now be a string or undefined

    const [rooms, setroom] = useState();
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    async function fetchData() {
        try {
            setloading(true);
            const data = (await axios.post("http://localhost:5000/api/rooms/getroombyid", {roomid: matchMedia.params.roomid})).data;
            setroom(data);
            setloading(false);
        } catch (error) {
            seterror(true);
            console.log(error);
            setloading(false);
        }
    }
    fetchData();

    return (
        <div>
            <h1>Booking Screen</h1>
            <h1>Room Id = {roomid}</h1>
        </div>
    );
}

export default Bookingscreen;
