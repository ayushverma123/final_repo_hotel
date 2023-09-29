import { Customar } from "src/entities/customer.entity";

export interface CustomerInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Customar;

} 