import { UserResponseDto } from '@feature/users/dto/user-response.dto'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Tag')
export class TagResponseDto {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => UserResponseDto)
  createdBy: UserResponseDto

  @Field(() => UserResponseDto)
  updatedBy: UserResponseDto
}
