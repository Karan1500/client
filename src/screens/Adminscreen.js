import { useState, useEffect, React } from 'react'
import { Tabs } from 'antd'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const { TabPane } = Tabs;
function Adminscreen() {
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Bookings' key='1'>
                    <Bookings />
                </TabPane>
                <TabPane tab='Rooms' key='2'>
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab='Add room' key='3'>
                    <h1>Add Room</h1>
                </TabPane>
                <TabPane tab='Users' key='4'>
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;


export function Bookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setloading(true)
                const result = (await axios.get('http://localhost:5000/api/bookings/getAllBookings')).data
                setBookings(result)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
                seterror(error)
            }
        }
        fetchBookings()
    },[])
    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {loading && <Loader />}
                {bookings.length && (<h1>There are total {bookings.length} bookings</h1>)}
            </div>
        </div>
    )
}