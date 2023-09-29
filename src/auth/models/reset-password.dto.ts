import {   
  IsEmail,
  IsString,
  IsStrongPassword, 
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {         
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)      
  otp: string;

  @IsString()
  @IsStrongPassword()            
  newPassword: string;
}
