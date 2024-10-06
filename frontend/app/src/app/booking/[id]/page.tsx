import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Booking, BookingDetailsPageProps } from '@/types/booking.types';

async function getBookings(): Promise<Booking[]> {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });
//   const res = await fetch('http://localhost:5000/api/bookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return res.json();
}



  const BookingDetailsPage: React.FC<BookingDetailsPageProps> = async ({ params }) => {
    const bookings = await getBookings();
  const { id } = params;

  const booking = bookings.find(b => b.id === parseInt(id, 10));

  if (!booking) {
    return notFound(); 
  }
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">This Booking is with:</h1>
      <div className="border-b mb-6 pb-4">
        <h2 className="text-2xl font-semibold">Doctor: {booking.doctor_name}</h2>
        <p className="text-gray-600">For service: {booking.service}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium">Date: <span className="font-normal">{booking.date.slice(0, 10)}</span></p>
        <p className="text-lg font-medium">Start Time: <span className="font-normal">{booking.start_time}</span></p>
        <p className="text-lg font-medium">End Time: <span className="font-normal">{booking.end_time}</span></p>
      </div>

      <Link href="/" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Back to Home
      </Link>
    </div>
  );
};

export default BookingDetailsPage;
