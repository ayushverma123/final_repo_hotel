import {  
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator'; 

export class SignupDto {  
  @IsEmail()
  emailid: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsMobilePhone('en-IN')
  mobile: string;

  @IsOptional()
  @IsNumber()
  countrycode: string;
}


