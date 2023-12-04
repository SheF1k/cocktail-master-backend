import { UserRoles } from '@constants/roles'
import { Injectable } from '@nestjs/common'
import { includes, some } from 'lodash'

@Injectable()
export class RbacService {
  checkRoles(userRoles: UserRoles[], requiredRoles: UserRoles[]): boolean {
    return some(requiredRoles, (role) => includes(userRoles, role))
  }
}
