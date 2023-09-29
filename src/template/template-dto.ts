import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsEmail, IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';  

export class CreateTemplateDto {    

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    template: string;
}

    


