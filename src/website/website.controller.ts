import { Booking } from 'src/entities/booking.entity';
import { CustomerInterfaceResponse } from 'src/customer/interface/CustomerResponse.interface';
import { UpdateCustomerDto } from 'src/customer/dto/updateCustomer-dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { LoginDto } from 'src/auth/models/login.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { BookingService } from 'src/booking/booking.service';
import { CreateBookingDto } from 'src/booking/dto/createBooking-dto';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { GetQueryDto } from 'src/hotel/dto/query-dto';
import { BookingInterfaceResponse } from 'src/booking/interface/BookingResponse-interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomerService } from 'src/customer/customer.service';

@Controller('website')
export class WebsiteController {
  constructor(private readonly hotelService: HotelService,
    private readonly bookingService: BookingService,
    private readonly authService: AuthService,
    private readonly customerService: CustomerService
  ) { }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.logIn(data);
  }

  @Get('getlogininfo')
  @UseGuards(JwtGuard)
  async getLoginInfo(@Req() req: any) {
    const id = req.user.id;
    const user = await this.authService.getbyid(id);
    return { user: user };
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

  @Get('getall')
  async getHotels(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.hotelService.getFilteredHotels(queryDto);
  }

  @Get('getByCustomerId/:cusId')
  async getBookingsByCustomerId(@Param('cusId') cusId: string): Promise<Booking[] | null> {
    return this.bookingService.getBookingsByCustomerId(cusId);
  }

  @UseGuards(JwtGuard)
  @Put('updatebyid/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createBooking(
    @Req() req: any,
    @Body() createBookingDto: CreateBookingDto
  ): Promise<BookingInterfaceResponse> {
    const id = req.user.id;
    return this.bookingService.createBooking(createBookingDto, id);
  }

  @UseGuards(JwtGuard)
  @Put('change-password')
  async changerCustomerPassword(
    @Req() req: any,
    @Body() body: { oldPassword: string, newPassword: string }
  ): Promise<any> {
    const id = req.user.id;
    const { oldPassword, newPassword } = body;

    // Verify OTP and reset password
    const User = await this.customerService.getCustomerById(id);
    if (User) {
      const Password = await this.customerService.changePassword(id, oldPassword, newPassword);
      return { message: 'Password changed successfully' }
    }
    else {
      throw new NotFoundException("Cannot reset password");
    }
  }

  @UseGuards(JwtGuard)
  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.getBookingById(id);
  }
}


