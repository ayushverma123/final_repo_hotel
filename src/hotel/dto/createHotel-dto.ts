import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail,IsObject, IsNotEmpty, IsNumber, IsString, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";

export class CreateHotelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hotel_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;   

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    pincode: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString({ each: true }) // Validate each element as a string
    @IsOptional()
    houseRules: string[];

    @IsString()
    propertyType:string;
    
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    lat_lon: {
        lat: string;
        long: string;
    };

    @ApiProperty()
    @IsNumber()
    room_family: number;

    @ApiProperty()
    @IsNumber()
    room_single: number;

    @ApiProperty()
    @IsNumber()
    room_deluxe: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contact_person: string;

    @ApiProperty({ required: false })
    @IsArray()
    @IsString({ each: true }) // Validate each element of the array as a string
    @ArrayMinSize(1, { message: "At least one image URL is required" }) // Minimum number of images
    @ArrayMaxSize(5, { message: "Maximum of five images allowed" }) // Maximum number of images
    @IsOptional()
    image: string[]; // Array of image URLs (optional, can be empty, minimum 1, maximum 5)

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    contact_number: number;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    contact_email: string;


}








