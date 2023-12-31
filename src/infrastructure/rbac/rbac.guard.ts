import { UserRoles } from '@constants/roles'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ROLES_METADATA_KEY } from '@services/auth/roles.constants'
import { isEmpty } from 'lodash'
import { Observable } from 'rxjs'

import { RbacService } from './rbac.service'

@Injectable()
export class RbacGuard implements CanActivate {
  private readonly rbacService: RbacService

  constructor(private readonly reflector: Reflector) {
    this.rbacService = new RbacService()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.getRequiredRoles(context)

    if (isEmpty(requiredRoles)) {
      return true
    }

    const userRoles = this.getUserRoles(context)

    return this.rbacService.checkRoles(userRoles, requiredRoles)
  }

  private getRequiredRoles(context: ExecutionContext): UserRoles[] {
    const requiredRoles = this.reflector.get(
      ROLES_METADATA_KEY,
      context.getHandler(),
    )

    return requiredRoles || []
  }

  private getUserRoles(context: ExecutionContext): UserRoles[] {
    const userRoles =
      GqlExecutionContext.create(context).getContext().req.user?.roles

    return userRoles || []
  }
}
