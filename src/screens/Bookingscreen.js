import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Bookingscreen() {
    let { roomid } = useParams(); // Destructure the roomid from the useParams object
    // console.log(roomid); // roomid should now be a string or undefined

    const [room, setroom] = useState();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.post("http://localhost:5000/api/rooms/getroombyid", {roomid: roomid})).data;
                setroom(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
      }, []); 

    return (
        <div style={{margin: '50px'}}>
            {loading ? (<Loader/>) : room ? (<div>
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageUrls[0]} className='bigimg'/>
                    </div>
                    <div className='col-md-6'>
                        <div style={{textAlign: 'right'}}>
                            <h1>Booking Details</h1>
                            <hr/>
                            <b>
                                <p>Name : </p>
                                <p>From Date : </p>
                                <p>To Date : </p>
                                <p>Max Count : {room.maxCount}</p>
                            </b>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <h1>Amount</h1>
                            <hr/>
                            <b>
                                <p>Total days : </p>
                                <p>Rent per day : {room.rentPerDay}</p>
                                <p>Total Amount : </p>
                            </b>
                        </div>
                        <div style={{float: 'right'}}>
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
            ): (<Error/>)}
        </div>
    );
}

export default Bookingscreen;