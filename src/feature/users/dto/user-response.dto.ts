import { UserRoles } from '@constants/roles'
import { TagResponseDto } from '@feature/tags/dto/response.dto'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class UserResponseDto {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  createdAt: Date

  @Field(() => [String])
  roles: UserRoles[]

  @Field(() => [TagResponseDto], { nullable: true, defaultValue: [] })
  tags?: TagResponseDto[]
}
