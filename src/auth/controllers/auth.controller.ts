import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtGuard } from '../guards/jwt.guard';   
import { AuthService } from '../services/auth.service';  
import {
  Put,    
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from '../models/login.dto';
import { CustomerService } from 'src/customer/customer.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly customerService: CustomerService) {}        

  @Post('register')
  async registerUser(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.logIn(data);
  }  

  @Get('getlogininfo')
  @UseGuards(JwtGuard)
  async getLoginInfo(@Req() req: any) {   
    const id = req.user.id;
    const user = await this.authService.getbyid(id);   
    return { user:user };
  }

  @Post('forgot-password')
  async generateOtp(@Body() body: { email: string }) {
    const { email } = body;
    const otp = await this.customerService.generateOtp(email);
    return { message: 'OTP generated successfully', otp };
  }

  @Put('reset-password')
  async verifyOtpAndResetPassword(
    @Body() body: { email: string, otp: string, newPassword: string 
  }) {
    const { email, otp, newPassword } = body;

    // Verify OTP and reset password
    const updatedUser = await this.customerService
    .verifyOtpAndResetPassword(email, otp, newPassword);
    if (updatedUser) {
      return { message: 'Password reset successfully', user: updatedUser };
    }
    else {
      throw new NotFoundException("Cannot reset password");

    }
  }
}
