import { UpdateCustomerDto } from './dto/updateCustomer-dto';
import * as bcrypt from 'bcrypt';
import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Customar, } from 'src/entities/customer.entity';
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { GetQueryDto } from './dto/query-dto';
import { Otp } from 'src/entities/otp.entity';
import { comparePasswords } from 'src/auth/helpers/password';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customar.name) private readonly customerModel: Model<Customar>,
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>
  ) { }

  async create(
    createCustomerDto: CreateCustomerDto
  ): Promise<CustomerInterfaceResponse | null> {
    // Check if a customer with the same email or mobile number already exists
    const { firstName,
      lastName,
      email,
      password,
      mobileNo,
      date_of_birth,
      gender
    } = createCustomerDto;

    const existingCustomer = await this.customerModel.findOne({
      $or: [
        { email: createCustomerDto.email },
        { mobileNo: createCustomerDto.mobileNo }
      ]
    });

    if (existingCustomer) {
      // Customer with the same email or mobile number already exists, throw an error
      throw new NotFoundException('Customer already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // No existing customer found, create a new one
    const createdCustomer = await this.customerModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNo,
      date_of_birth,
      gender
    });
    await createdCustomer.save();
    return {
      code: 200,
      message: 'Customer created successfully',
      status: 'success',
      data: createdCustomer,
    };
  }

  async getAllCustomers(): Promise<any> {
    return this.customerModel.find({}, { password: 0 }).exec();
  }

  async getFilteredCustomers(queryDto: GetQueryDto): Promise<any> {
    const { search,
      limit,
      pageNumber,
      pageSize,
      fromDate,
      toDate,
      sortField,
      sortOrder
    } = queryDto;
    const query = this.customerModel.find();


    if (search) {
      query.or([
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { gender: { $regex: search, $options: 'i' } },

      ]);
    }

    if (pageNumber && pageSize) {
      const skip = (pageNumber - 1) * pageSize;
      query.skip(skip).limit(pageSize);
    }

    if (fromDate && toDate) {
      query.where({
        date_of_birth: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      });
    }

    if (sortField && sortOrder) {
      const sortOptions: [string, SortOrder][] = [
        [sortField, sortOrder as SortOrder]
      ];
      query.sort(sortOptions);
    }

    const data = await query.exec();
    const totalRecords = await this.customerModel
      .find(query.getFilter())
      .countDocuments();

    return { data, totalRecords };
  }

  async getCustomerById(id: string): Promise<CustomerInterfaceResponse> {
    try {
      const FoundCustomer = await this.customerModel
        .findById(id)
        .exec();

      if (!FoundCustomer) {
        throw new NotFoundException('Unable to find customer');
      }
      else {
        return {
          code: 200,
          message: 'Customer found successfully',
          status: 'success',
          data: FoundCustomer,
        };
      }
    } catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid customer ID');
      }
      // Handle other potential errors or rethrow them
      throw error;
    }
  }

  async findById(id: string) {
    return this.customerModel.findById(id).exec();
  }

  async findOneWithUserName(username: string) {

    return await this.customerModel.findOne({ email: username }); 
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<CustomerInterfaceResponse> {
    try {
      const updatedCustomer = await this.customerModel
        .findByIdAndUpdate(id, updateCustomerDto, { new: true })
        .exec();

      if (!updatedCustomer) {
        throw new NotFoundException('Unable to update customer');
      }
      else {
        return {
          code: 200,
          message: 'Customer updated successfully',
          status: 'success',
          data: updatedCustomer,
        };
      }
    } catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid customer ID');
      }

      // Handle other potential errors or rethrow them
      throw error;
    }
  }

  async updatePassword(
    email: string,
    newPassword: string
  ): Promise<any> {
    const customer = await this.customerModel.findOne({ email });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    customer.password = newPassword;
    await customer.save();
    return newPassword;
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');  

    }
    const isMached = await comparePasswords(oldPassword, customer.password); 
    if (isMached == false) {
      throw new NotFoundException('Old password is wrong')
    }
    const hashPasswordd = await bcrypt.hash(newPassword, 10);
    customer.password = hashPasswordd;
    await customer.save();
    return newPassword;
  }

  async deleteCustomer(id: string): Promise<CustomerInterfaceResponse> {
    try {
      const deletedCustomer = await this.customerModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedCustomer) {
        throw new NotFoundException('Unable to delete customer');
      }
      else {
        return {
          code: 200,
          message: 'Customer deleted successfully',
          status: 'success',
          data: deletedCustomer,
        };
      }
    } catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid customer ID');
      }
      // Handle other potential errors or rethrow them
      throw error;
    }
  }

  async generateOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const check_email = await this.customerModel.findOne({ email });

    if (!check_email) {
      throw new NotFoundException('Invalid email');
    }
    await this.otpModel.create({ email, otp });
    return otp.toString();
  }

  async verifyOtpAndResetPassword(email: string, otp: string, newPassword: string) {
    const otpEntry = await this.otpModel.findOne({ email, otp });

    if (!otpEntry) {
      throw new NotFoundException('Invalid OTP');
    }
    // Update the customer's password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await this.updatePassword(email, hashPassword);
    // Delete the OTP entry
    await this.otpModel.deleteOne({ _id: otpEntry._id });
    // Return the updated user object
    const updatedUser = { email, password: newPassword }; // Assuming the user object has 'email' property
    return updatedUser;
  }
}

