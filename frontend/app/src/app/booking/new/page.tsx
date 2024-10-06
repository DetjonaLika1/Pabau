'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddNewBooking } from '@/types/booking.types';
import Link from 'next/link';

const NewBookingPage = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<AddNewBooking>({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]); 
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...bookingData,
          }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const errorData = await res.json();
        setErrors(errorData.errors || ['An error occurred. Please try again.']);
      }
    } catch (err) {
        console.log("err",err)
      setErrors(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h1 className="text-2xl font-semibold mb-4 text-center">Create a New Booking</h1>

      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="doctor_name" className="block text-sm font-medium text-gray-700">
            Doctor Name
          </label>
          <input
            type="text"
            id="doctor_name"
            name="doctor_name"
            value={bookingData.doctor_name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <input
            type="text"
            id="service"
            name="service"
            value={bookingData.service}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={bookingData.start_time}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={bookingData.end_time}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
        </label>
        <input
            type="date"
            id="date"
            name="date"
            value={bookingData.date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        </div>
        <div className="flex justify-between items-center mb-4">
        <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Back to Home
      </Link>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Booking
        </button>
      </div>
      </form>
    </div>
    </div>
  );
};

export default NewBookingPage;
