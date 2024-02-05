import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Hashing } from 'src/utils/harshing';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = await Hashing.harshPassword(createUserDto.password)
    try {
      const newUser: User = await this.userRepository.save(user)
      return newUser;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    try {
      const user = await this.userRepository.findBy({email: email})
      if(user.length == 0) {
        throw new Error('Incorrect email')
      } else {
        return user[0];
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findExisting(email: string) {
    try {
      const user = await this.userRepository.findBy({email: email})
      if(user.length != 0) {
        throw new Error('Username Already Exist')
      } else {
        return true;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
