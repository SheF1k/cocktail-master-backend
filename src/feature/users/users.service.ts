import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'

import { ERROR_CODES } from '../../constants/database'
import { CreateUserDto } from './dto/create-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const createdUser = new this.userModel(createUserDto)

      await createdUser.save()

      return this.mapUserToDto(createdUser)
    } catch (error) {
      if (error.code === ERROR_CODES.DUPLICATE) {
        throw new ConflictException('User with this email already exists')
      }

      throw error
    }
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    if (!isValidObjectId(id)) {
      return null
    }

    try {
      const user = await this.userModel.findById(id).exec()

      return user ? this.mapUserToDto(user) : null
    } catch (e) {
      return null
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findOne({ email }).exec()

    return user ? this.mapUserToDto(user) : null
  }

  async findFullUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec()
  }

  private mapUserToDto(user: User): UserResponseDto {
    const { _id, email, createdAt, roles } = user

    return { id: _id, email, createdAt, roles }
  }
}
