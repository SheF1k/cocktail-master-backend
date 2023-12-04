import { Field, ID, ObjectType } from '@nestjs/graphql'

import { UserRoles } from '../../../constants/roles'

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
}
