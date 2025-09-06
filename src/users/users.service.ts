import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { CreationAttributes } from 'sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserModel: typeof User, 
  private jwtService: JwtService,
  ){}
  async create(createUserDto: CreateUserDto) {
    const dbUser = await this.findUserByEmail(createUserDto.email);
    if (dbUser) {
      throw new BadRequestException('Bunday email oldin royhatdan otgan');
    }
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.UserModel.create({
      ...createUserDto,
      password: hashedPassword,
    } as CreationAttributes<User>);
  }
  findUserByEmail(email) {
    return this.UserModel.findOne({ where: { email } });
  }

  // async login(loginUserDto: LoginUserDto) {
  //   const { email, password } = loginUserDto;

  //   const user = await this.UserModel.findOne({ where: { email } });
  //   if (!user) {
  //     throw new UnauthorizedException('Email yoki parol notogri!');
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     throw new UnauthorizedException('Email yoki parol notogri!');
  //   }

  //   const token = this.jwtService.sign({
  //     userId: user.userId,
  //     email: user.email,
  //     role: user.role,
  //   });

  //   return { message: 'Muvaffaqiyatli login', token, user };
  // }
  async login(loginUserDto: LoginUserDto) {
    console.log("Kelgan DTO:", loginUserDto);
  
    const { email, password } = loginUserDto;
  
    if (!email || !password) {
      throw new BadRequestException("Email va parol talab qilinadi");
    }
  
    const user = await this.UserModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
  
    if (!user.dataValues.password) {
      throw new BadRequestException("Foydalanuvchida parol saqlanmagan!");
    }
    console.log("Compare args:", password, user.dataValues.password);
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    console.log("Compare natija:", isMatch);
    
    return {
      message: "Muvaffaqiyatli login",
      token: this.jwtService.sign({
        userId: user.userId,
        email: user.email,
        role: user.role,
      }),
      user,
    };
  }
  

  findAll() {
    return this.UserModel.findAll();
  }

  findOne(userId: number) {
    return this.UserModel.findOne({where: {userId}});
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const res = await this.UserModel.findOne({where: {userId}});
    return res?.update(updateUserDto);
  }

  remove(userId: number) {
    return this.UserModel.destroy({where: {userId}});
  }
}
