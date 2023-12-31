import { Dropdown, Table } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingSingle = ({ booking, setRefresh, refresh }) => {
    const { _id, name, email, phone, date, image } = booking;
    const hendleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setRefresh(!refresh)
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success"
                            });

                        }
                        else {
                            Swal.fire({
                                title: "Oops...!",
                                text: data.error,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        });



    }
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            <Table.Cell>
                <img className='w-24' src={image} alt="" />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{phone}</Table.Cell>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell>

                <Dropdown label="Edit/Delete" arrowIcon={false}>
                    <Dropdown.Item> <Link to={`/Booking-edit/${_id}`}>Edit</Link> </Dropdown.Item>
                    <Dropdown.Item onClick={() => hendleDelete(_id)}>Delete</Dropdown.Item>
                </Dropdown>
            </Table.Cell>
        </Table.Row>



    );
};

export default BookingSingle;