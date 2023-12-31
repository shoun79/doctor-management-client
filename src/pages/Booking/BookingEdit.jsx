import { Button, Card, Datepicker, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingEdit = () => {
    const [booking, setBooking] = useState({});
    const { name, email, phone, date, image } = booking;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/bookings/${id}`)
            .then(res => res.json())
            .then(data => {
                setBooking(data.data)
            })
    }, [id]);

    const hendleEdit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const date = form.date.value;
        const editedBooking = {
            name, email, phone, date, image
        }

        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedBooking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Good job!",
                        text: data.message,
                        icon: "success"
                    });
                    navigate('/bookings')
                }
                else {
                    Swal.fire({
                        title: "Opps...!",
                        text: data.error,
                        icon: "error"
                    });
                }

            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className='lg:w-1/3 mx-auto my-10'>
            <Card className="rounded-none bg-[#F2F2F2]">

                <form onSubmit={hendleEdit} className="flex flex-col gap-4">
                    <div>
                        <TextInput defaultValue={name} name='name' id="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div>
                        <TextInput defaultValue={email} name='email' id="email1" type="email" placeholder="Your Email" required />
                    </div>
                    <div>
                        <TextInput defaultValue={phone} name='phone' id="number" type="text" placeholder="Your Phone Number" required />
                    </div>
                    <div>
                        <Datepicker name='date' />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </div>
    );
};

export default BookingEdit;