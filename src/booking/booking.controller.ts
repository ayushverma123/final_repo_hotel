import { Booking } from 'src/entities/booking.entity';
import { UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking-dto';
import { BookingService } from './booking.service';
import { GetQueryDto } from './dto/query-dto';
import { BookingInterfaceResponse } from './interface/BookingResponse-interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @UseGuards(JwtGuard)
  @Get('getall')
  async getBookings(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.bookingService.getFilteredBookings(queryDto);
  }
  
  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved Booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.getBookingById(id);
  }

  @ApiOkResponse({ description: 'Successfully retrieved bookings for the customer.' })
  @ApiNotFoundResponse({ description: 'Bookings not found for the customer.' })
  @Get('getByCustomerId/:cusId')
  async getBookingsByCustomerId(@Param('cusId') cusId: string): Promise<Booking[] | null> {
    return this.bookingService.getBookingsByCustomerId(cusId);
  }

  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('create')
  async createBooking(
    @Req() req: any, 
    @Body() createBookingDto: CreateBookingDto
  ): Promise<BookingInterfaceResponse | null > {
    const id=req.user.id;
    return this.bookingService.createBooking(createBookingDto, id);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved Booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @Put('updatebyid/:id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @Delete('deletebyid/:id')
  async deleteBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.deleteBookingnew(id);
  }

  @UseGuards(JwtGuard)
  @Delete('cancel/:id')
  async cancelBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.deleteBooking(id);
  }
}
