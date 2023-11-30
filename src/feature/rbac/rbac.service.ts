import { Injectable } from '@nestjs/common'
import { includes, some } from 'lodash'

import { UserRoles } from '../../constants/roles'

@Injectable()
export class RbacService {
  checkRoles(userRoles: UserRoles[], requiredRoles: UserRoles[]): boolean {
    return some(requiredRoles, (role) => includes(userRoles, role))
  }
}
