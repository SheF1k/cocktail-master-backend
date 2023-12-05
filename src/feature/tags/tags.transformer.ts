import { TagResponseDto } from '@feature/tags/dto/response.dto'
import { Tag } from '@feature/tags/entities/tag.entity'
import { UsersTransformer } from '@feature/users/users.transformer'
import { forwardRef, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class TagsTransformer {
  constructor(
    @Inject(forwardRef(() => UsersTransformer))
    private readonly usersTransformer: UsersTransformer,
  ) {}

  transformTagToDto(tag: Tag): TagResponseDto {
    const { _id, name, createdAt, createdBy, updatedBy, updatedAt } = tag

    return {
      id: _id,
      name,
      createdAt,
      updatedAt,
      createdBy: this.usersTransformer.transformUserToDto(createdBy),
      updatedBy: this.usersTransformer.transformUserToDto(updatedBy),
    }
  }
}
