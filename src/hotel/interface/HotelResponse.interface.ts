import { Hotel } from "src/entities/hotel.entity";  

export interface HotelInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Hotel;
}

