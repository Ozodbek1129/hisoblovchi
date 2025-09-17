import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserModel: typeof User,
    private jwtService: JwtService,
  ) {}



  // ✅ Email orqali foydalanuvchini topish
  findUserByEmail(email: string) {
    return this.UserModel.findOne({ where: { email } });
  }

  // ✅ Login qilish
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new BadRequestException('Email va parol talab qilinadi');
    }

    const user = await this.UserModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email noto‘g‘ri');
    }

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw new UnauthorizedException('Parol noto‘g‘ri');
    }

    return {
      message: 'Muvaffaqiyatli login',
      token: this.jwtService.sign({
        userId: user.userId,
        email: user.email,
        role: user.role,
      }),
      user,
    };
  }

  // ✅ Barcha foydalanuvchilar
  findAll() {
    return this.UserModel.findAll();
  }

  // ✅ ID bo‘yicha foydalanuvchini topish
  findOne(userId: number) {
    return this.UserModel.findOne({ where: { userId } });
  }


  // ✅ O‘chirish
  async remove(userId: number) {
    const deleted = await this.UserModel.destroy({ where: { userId } });
    if (!deleted) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }
    return { message: 'Foydalanuvchi o‘chirildi' };
  }
}
