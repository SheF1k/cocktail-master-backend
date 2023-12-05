import { TagResponseDto } from '@feature/tags/dto/response.dto'
import { TagsService } from '@feature/tags/tags.service'
import { forwardRef, Inject, NotFoundException } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { ADMIN_ROLE } from '@services/auth/roles.constants'

import { CreateUserDto } from './dto/create-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { UsersService } from './users.service'

@Resolver(() => UserResponseDto)
export class UsersResolver {
  constructor(
    @Inject(forwardRef(() => TagsService))
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
  ) {}

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

  @ResolveField(() => [TagResponseDto])
  async tags(@Parent() user: UserResponseDto): Promise<TagResponseDto[]> {
    return this.tagsService.findAll({ createdBy: user.id })
  }
}
