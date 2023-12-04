import { Type } from '@nestjs/common'
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Min } from 'class-validator'

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  page: number

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @Min(1)
  pageSize: number

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  allItems: boolean
}

@ObjectType()
export class PaginationMetadata {
  @Field(() => Int)
  totalItems: number

  @Field(() => Int)
  currentPage: number

  @Field(() => Int)
  pageSize: number

  @Field(() => Int)
  totalPages: number
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: PaginationMetadata
}

export function PaginatedResponseObject<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageClass implements PaginatedResponse<T> {
    @Field(() => [ItemType])
    items: T[]

    @Field(() => PaginationMetadata)
    meta: PaginationMetadata
  }

  return PageClass
}
