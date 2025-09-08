import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
  constructor(
    @InjectModel(User) private UserModel: typeof User,
    private jwtService: JwtService,
  ) {}

  // ✅ Ro‘yxatdan o‘tkazish
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    if (!email) {
      throw new BadRequestException('Email kiritilishi shart');
    }

    if (!password) {
      throw new BadRequestException('Parol kiritilishi shart');
    }

    // Email bo‘yicha tekshiruv
    const dbUser = await this.findUserByEmail(email);
    if (dbUser) {
      throw new BadRequestException('Bunday email oldin ro‘yxatdan o‘tgan');
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.UserModel.create({
      ...createUserDto,
      password: hashedPassword,
    } as CreationAttributes<User>);
  }

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

  // ✅ Yangilash
  async update(userId: number, updateUserDto: UpdateUserDto) {
    const res = await this.UserModel.findOne({ where: { userId } });
    if (!res) throw new NotFoundException('Foydalanuvchi topilmadi');
    return res.update(updateUserDto);
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
