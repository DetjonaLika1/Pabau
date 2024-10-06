import { Booking } from '@/types/booking.types'
import Link from 'next/link'
import React from 'react'

const ListBookings: React.FC<Booking> = (props) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        className="object-contain w-full h-48 rounded-t-lg md:h-32 md:w-48 md:rounded-none md:rounded-l-lg"
        src="https://pabau.com/wp-content/uploads/2022/05/Logo-4-e1654525062364.png"
        alt=""
      />
      <div className="flex flex-col justify-between p-4">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{props.doctor_name}</h5>
        <p className="mb-3 text-gray-700">
          This Doctor Works <b>{props.date.slice(0, 10)}</b> at <b>{props.start_time}</b>
        </p>
        <div className="flex mt-4">
          <Link
            href={`/booking/${props.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Go to Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListBookings