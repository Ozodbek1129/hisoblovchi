import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // @Post("/login")
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return this.usersService.login(loginUserDto);
  // }

  @Post("login")
async login(@Body() loginUserDto: LoginUserDto) {
  console.log("Controller DTO:", loginUserDto);
  return this.usersService.login(loginUserDto);
}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':userId')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') id: string) {
    return this.usersService.remove(+id);
  }
}
