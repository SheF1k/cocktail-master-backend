import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

import { UserRoles } from '../../../constants/roles'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string

  role: UserRoles[]
}
