import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


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



  @Delete(':userId')
  remove(@Param('userId') id: string) {
    return this.usersService.remove(+id);
  }
}
