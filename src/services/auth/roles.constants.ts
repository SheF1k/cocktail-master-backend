import { SetMetadata } from '@nestjs/common'

import { UserRoles } from '../../constants/roles'

export const ROLES_METADATA_KEY = 'roles'

export const Roles = (...roles: UserRoles[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles)

export const ADMIN_ROLE = () =>
  SetMetadata(ROLES_METADATA_KEY, [UserRoles.ADMIN])

export const USER_ROLE = () => SetMetadata(ROLES_METADATA_KEY, [UserRoles.USER])
