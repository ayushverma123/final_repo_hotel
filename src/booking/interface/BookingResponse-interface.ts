import { Booking } from "src/entities/booking.entity";
export interface BookingInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Booking;
  
}
