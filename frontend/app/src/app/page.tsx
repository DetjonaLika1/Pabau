import ListBookings from "@/components/BookingList";
import { Booking } from "@/types/booking.types";
import Link from "next/link";

async function getBookings(): Promise<Booking[]> {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
  // const res = await fetch('http://localhost:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {

  const bookings = await getBookings()


  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Current booking count: {bookings.length}</h1>
        <Link href="/booking/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create New Booking
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings?.map((el) => (
          <ListBookings key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};

export default Home;
