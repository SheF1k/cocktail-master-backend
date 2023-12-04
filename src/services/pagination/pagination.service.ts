import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { PaginatedResponse, PaginationInput } from './dto/pagination.dto'

@Injectable()
export class PaginationService {
  async paginate<InputModel, ResponseDto>({
    model,
    pagination,
    transformer,
    queryParams = [],
  }: {
    model: Model<InputModel>
    transformer: (item: InputModel) => ResponseDto
    pagination: PaginationInput
    queryParams?: Parameters<Model<InputModel>['find']>
  }): Promise<PaginatedResponse<ResponseDto>> {
    const { skip, pageSize } = this.getPaginationOptions(pagination)

    const items = await this.fetchItems(model, skip, pageSize, queryParams)
    const totalItems = await this.countTotalItems(model, queryParams)

    const transformedItems = items.map(transformer)

    const meta = this.calculateMetadata(pagination, totalItems, pageSize)

    return {
      items: transformedItems,
      meta,
    }
  }

  private getPaginationOptions(pagination: PaginationInput) {
    const { page, pageSize, allItems } = pagination
    const skip = (page - 1) * pageSize

    return {
      skip: allItems ? 0 : skip,
      pageSize: allItems ? 0 : pageSize,
    }
  }

  private async fetchItems<T>(
    model: Model<T>,
    skip: number,
    pageSize: number,
    params: Parameters<Model<T>['find']>,
  ): Promise<T[]> {
    return model
      .find(...params)
      .skip(skip)
      .limit(pageSize)
      .exec()
  }

  private async countTotalItems<T>(
    model: Model<T>,
    params: Parameters<Model<T>['find']>,
  ): Promise<number> {
    return model.countDocuments(...params).exec()
  }

  private calculateMetadata(
    pagination: PaginationInput,
    totalItems: number,
    pageSize: number,
  ): {
    pageSize: number
    currentPage: number
    totalItems: number
    totalPages: number
  } {
    return {
      pageSize,
      currentPage: pagination.page,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    }
  }
}
