import { comparePasswords } from '../helpers/password';         
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANT } from '../constants/constants';
import { hashPassword } from '../helpers/password';
import { LoginDto } from '../models/login.dto';
import { ForgetPasswordDto } from '../models/forget-password.dto';
import { ResetPasswordDto } from '../models/reset-password.dto';
import { CustomerController } from 'src/customer/customer.controller';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private user: CustomerService,
    private jwtService: JwtService,
  ) {}

  //////////////////////////////////////////////////////////////LOG IN///////////////////////////////////////////////////////////////

  async logIn(data: LoginDto) {
    let findUser = await this.user.findOneWithUserName(data.emailid);  
    
    if (!findUser) {
      throw new NotFoundException('Invalid username password.');
    }
    
    const isMached = await comparePasswords(data.password, findUser.password);
    if (!isMached) {
      throw new NotFoundException('Invalid username password.');
    }
    const token = await this.jwtToken(findUser._id, findUser.role);

    return {
      code: '200',
      message: '',
      status: 'success',
      data: { access_token: token.access_token },
    };
  }


  ///////////////////////////////////////////////////////////////////FORGET PASSWORD////////////////////////////////////////////////


  async jwtToken(id, role) {
    const payload = { id: id, role:role };
    return {
      access_token:await this.jwtService.sign(payload, {
        privateKey: JWT_CONSTANT,
        expiresIn: '7d',
      }),
    };
  }

  
  async getbyid(id) {
    console.log('id', id);
    const findUser = await this.user.findById(id);
    if (!findUser) {
      throw new UnauthorizedException('User not found!');
    }

    return findUser;
  }



}