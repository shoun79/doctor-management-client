import { Button, Card, Checkbox, Datepicker, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    //const service = useLoaderData();
    const [service, setService] = useState({});
    const { id } = useParams();
    const { image, name, duration_minutes, fee, service_details } = service;
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))


    }, [id]);
    const hendleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const date = form.date.value;
        const bookings = {
            name, email, phone, date, image
        }
        console.log(name, email, phone, date);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookings)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    Swal.fire({
                        title: "Good job!",
                        text: data.message,
                        icon: "success"
                    });
                    navigate('/bookings')
                }
            })
    }
    return (
        <div className='my-10 md:flex items-center'>
            <div >
                <Card className="" imgSrc={image} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {service_details}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${fee}</span>
                        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                            {duration_minutes}
                        </span>
                    </div>
                </Card>
            </div>
            <div className='lg:w-1/4 mx-auto mt-6 lg:mt-0'>
                <h3 className='bg-cyan-500 py-3 text-center text-white font-bold'>Book an Appointment
                </h3>
                <Card className="rounded-none bg-[#F2F2F2]">

                    <form onSubmit={hendleSubmit} className="flex flex-col gap-4">
                        <div>
                            <TextInput name='name' id="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div>
                            <TextInput name='email' id="email1" type="email" placeholder="Your Email" required />
                        </div>
                        <div>
                            <TextInput name='phone' id="number" type="text" placeholder="Your Phone Number" required />
                        </div>
                        <div>
                            <Datepicker name='date' />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Card>
            </div>

        </div>
    );
};

export default ServiceDetails;