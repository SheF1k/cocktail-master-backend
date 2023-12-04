import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ADMIN_ROLE } from '../../services/auth/roles.constants'
import { CreateUserDto } from './dto/create-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { UsersService } from './users.service'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ADMIN_ROLE()
  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async create(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto)
  }

  @ADMIN_ROLE()
  @Query(() => UserResponseDto, { name: 'findUserByEmail' })
  async findByEmail(@Args('email') email: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  @ADMIN_ROLE()
  @Query(() => UserResponseDto, { name: 'findUserById' })
  async findOne(@Args('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
