import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { PaginationInput } from './dto/pagination.dto'

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationInput =>
    GqlExecutionContext.create(ctx).getArgs().pagination || {},
)
