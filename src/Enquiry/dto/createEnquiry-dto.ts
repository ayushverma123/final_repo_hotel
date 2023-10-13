import { Role } from 'src/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsEmail, IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';     

export class CreateEnquiryDto {  

    @IsString()
    @IsNotEmpty()
    name: string;   

    @IsMobilePhone()
    @IsNotEmpty()
    mobileNo: number;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsEmail()
    @IsNotEmpty()
    enquiry: string;

}

    


