import { CreateTagDto } from '@feature/tags/dto/create.dto'
import { TagResponseDto } from '@feature/tags/dto/response.dto'
import { TagsService } from '@feature/tags/tags.service'
import { UserResponseDto } from '@feature/users/dto/user-response.dto'
import { CurrentUser } from '@infrastructure/graphql/graphql.context'
import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { ADMIN_ROLE, USER_ROLE } from '@services/auth/roles.constants'
import {
  PaginatedResponseObject,
  PaginationInput,
} from '@services/pagination/dto/pagination.dto'

@Resolver('Tag')
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @ADMIN_ROLE()
  @Mutation(() => TagResponseDto, { name: 'createTag' })
  async create(
    @Args('createTagDto') createTagDto: CreateTagDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TagResponseDto> {
    return this.tagsService.create(createTagDto.name, user.id)
  }

  @USER_ROLE()
  @Query(() => TagResponseDto, { name: 'findTagById' })
  async findOne(@Args('id') id: string): Promise<TagResponseDto> {
    const tag = await this.tagsService.findOne(id)

    if (!tag) {
      throw new NotFoundException('Tag not found')
    }

    return tag
  }

  @USER_ROLE()
  @Query(() => PaginatedTagsResponse, { name: 'findAllTags' })
  async findAll(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<PaginatedTagsResponse> {
    return this.tagsService.findAll({ pagination })
  }
}

@ObjectType()
export class PaginatedTagsResponse extends PaginatedResponseObject(
  TagResponseDto,
) {}
