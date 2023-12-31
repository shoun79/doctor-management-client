import React, { useEffect, useState } from 'react';
import ServiceSingle from './ServiceSingle';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))


    }, []);

    return (
        <div className='my-10'>
            <h2 className='text-center text-4xl bold'>Services</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                {
                    services.map(service => <ServiceSingle
                        key={service.id}
                        service={service}
                    ></ServiceSingle>)
                }
            </div>
        </div>
    );
};

export default Services;