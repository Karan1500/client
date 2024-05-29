import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'

function Bookingscreen() {
    let { roomid,fromDate,toDate } = useParams(); // Destructure the roomid from the useParams object
    // console.log(roomid); // roomid should now be a string or undefined

    const [room, setroom] = useState();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    const totalDays = moment.duration(moment(toDate,'DD-MM-YYYY').diff(moment(fromDate,'DD-MM-YYYY'))).asDays()+1
    const [totalAmount,setTotalAmount] = useState()
    useEffect(() => {
        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.post("http://localhost:5000/api/rooms/getroombyid", {roomid: roomid})).data;
                setroom(data);
                setTotalAmount(totalDays*data.rentPerDay)
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
      }, []); 
    
    async function bookRoom() {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }

        try {
            const result = await axios.post("http://localhost:5000/api/bookings/bookroom", bookingDetails)
        } catch (error) {
            
        }
    }  
      
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
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                                <p>From Date : {fromDate}</p>
                                <p>To Date : {toDate}</p>
                                <p>Max Count : {room.maxCount}</p>
                            </b>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <h1>Amount</h1>
                            <hr/>
                            <b>
                                <p>Total days : {totalDays}</p>
                                <p>Rent per day : {room.rentPerDay}</p>
                                <p>Total Amount : {totalAmount}</p>
                            </b>
                        </div>
                        <div style={{float: 'right'}}>
                            <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
            ): (<Error/>)}
        </div>
    );
}

export default Bookingscreen;
