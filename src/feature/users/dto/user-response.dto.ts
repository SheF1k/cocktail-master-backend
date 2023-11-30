import { UserRoles } from '../../../constants/roles'

export class UserResponseDto {
  id: string
  email: string
  createdAt: Date
  roles: UserRoles[]
}
