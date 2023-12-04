import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

import { UserRoles } from '../../../constants/roles'

@InputType('CreateUserInput')
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string

  @Field(() => [String], { defaultValue: [UserRoles.USER] })
  role: UserRoles[]
}
