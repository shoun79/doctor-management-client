import { Card } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceSingle = ({ service }) => {
    const { image, name, duration_minutes, fee, id } = service;
    return (
        <Card
            className=""
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={image}
        >
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
            </a>
            <div className="mb-5 mt-2.5 flex items-center">
                <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    {duration_minutes}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${fee}</span>
                <Link
                    to={`/service-details/${id}`}
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Book
                </Link>
            </div>
        </Card>
    );
};

export default ServiceSingle;