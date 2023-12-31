import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { Table } from 'flowbite-react';
import BookingSingle from './BookingSingle';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data.data);
            })
    }, [url, refresh])
    console.log(bookings);
    return (

        <div className="overflow-x-auto py-10">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Number</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>
                        Action
                        <span className="sr-only">Action</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        bookings.map(booking => <BookingSingle
                            key={booking._id}
                            booking={booking}
                            setRefresh={setRefresh}
                            refresh={refresh}
                        ></BookingSingle>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export default Booking;