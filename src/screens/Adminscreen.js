import { useState, useEffect, React } from 'react'
import { Tabs } from 'antd'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const { TabPane } = Tabs;
function Adminscreen() {

    useEffect(() => {
        if(!(JSON.parse(localStorage.getItem('currentUser')).data.isAdmin))
        {
            window.location.href='/home'    
        }

    },[])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Bookings' key='1'>
                    <Bookings />
                </TabPane>
                <TabPane tab='Rooms' key='2'>
                    <Rooms />
                </TabPane>
                <TabPane tab='Add room' key='3'>
                    <h1>Add Room</h1>
                </TabPane>
                <TabPane tab='Users' key='4'>
                    <Users />
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
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && bookings.map((booking) => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromDate}</td>
                                <td>{booking.toDate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function Rooms() {
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setloading(true)
                const result = (await axios.get('http://localhost:5000/api/rooms/getAllRooms')).data
                setRooms(result)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
                seterror(error)
            }
        }
        fetchRooms()
    },[])
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Rooms</h1>
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max count</th>
                            <th>Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && rooms.map((room) => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentPerDay}</td>
                                <td>{room.maxCount}</td>
                                <td>{room.phoneNumber}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function Users() {
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setloading(true)
                const result = (await axios.get('http://localhost:5000/api/users/getAllUsers')).data
                setUsers(result)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
                seterror(error)
            }
        }
        fetchUsers()
    },[])
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length && users.map((user) => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin?'YES':'NO'}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}