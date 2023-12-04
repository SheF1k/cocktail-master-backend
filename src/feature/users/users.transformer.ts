import { UserResponseDto } from '@feature/users/dto/user-response.dto'
import { User } from '@feature/users/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersTransformer {
  transformUserToDto(user: User): UserResponseDto {
    const { _id, createdAt, email, roles } = user

    return {
      id: _id,
      createdAt,
      email,
      roles,
    }
  }
}
