export interface AddNewBooking {
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }

  export interface Booking {
    id: number;
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }
  
  export interface BookingDetailsPageProps {
    params: {
      id: string;
    };
  }