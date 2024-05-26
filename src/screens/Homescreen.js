import React, {useState, useEffect} from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css'
import moment from 'moment'

const { RangePicker } = DatePicker;

function Homescreen(){

    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.get("http://localhost:5000/api/rooms/getAllRooms")).data;
                setrooms(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
      }, []); 

    function filterByDate(dates) {
        console.log(dates[0].format('DD-MM-YYYY'))
        console.log(dates[1].format('DD-MM-YYYY'))
        setFromDate(dates[0].format('DD-MM-YYYY'))
        setToDate(dates[1].format('DD-MM-YYYY'))
    }
      
    return(
        <div className="container">
            
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (<Loader/>) : rooms.length>=1 ? (rooms.map(room=>{
                        return <div className="col-md-9 mt-2">
                            <Room room={room} fromDate={fromDate} toDate={toDate} />
                        </div>
                })) : (<Error/>)}
            </div>
        </div>
    )
    
};

export default Homescreen;