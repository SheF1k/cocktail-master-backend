import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Public } from '../../services/auth/public.constants'
import { ADMIN_ROLE } from '../../services/auth/roles.constants'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ADMIN_ROLE()
  @Get('/by-email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  @ADMIN_ROLE()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
