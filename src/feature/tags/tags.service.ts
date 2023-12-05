import { ERROR_CODES } from '@constants/database'
import { TagResponseDto } from '@feature/tags/dto/response.dto'
import { Tag } from '@feature/tags/entities/tag.entity'
import { PaginatedTagsResponse } from '@feature/tags/tags.resolver'
import { TagsTransformer } from '@feature/tags/tags.transformer'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PaginationInput } from '@services/pagination/dto/pagination.dto'
import { PaginationService } from '@services/pagination/pagination.service'
import { bind } from 'lodash'
import { FilterQuery, isValidObjectId, Model } from 'mongoose'

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    private readonly tagsTransformer: TagsTransformer,
    private readonly paginationService: PaginationService,
  ) {}

  async create(name: string, userId: string) {
    try {
      const createdTag = new this.tagModel({
        name: name,
        updatedBy: userId,
        createdBy: userId,
      })

      await createdTag.save()

      return this.tagsTransformer.transformTagToDto(createdTag)
    } catch (error) {
      if (error.code === ERROR_CODES.DUPLICATE) {
        throw new ConflictException('Tag with this name already exists')
      }

      throw error
    }
  }

  async findOne(id: string): Promise<TagResponseDto | null> {
    if (!isValidObjectId(id)) {
      return null
    }

    try {
      const tag = await this.tagModel.findById(id).exec()

      return tag ? this.tagsTransformer.transformTagToDto(tag) : null
    } catch (e) {
      return null
    }
  }

  async findAllPaginated({
    pagination,
  }: {
    pagination: PaginationInput
  }): Promise<PaginatedTagsResponse> {
    return this.paginationService.paginate({
      model: this.tagModel,
      transformer: bind(
        this.tagsTransformer.transformTagToDto,
        this.tagsTransformer,
      ),
      pagination: pagination,
    })
  }

  async findAll(filter: FilterQuery<Tag>): Promise<TagResponseDto[]> {
    const tags = await this.tagModel.find(filter).exec()

    return tags.map((tag) => this.tagsTransformer.transformTagToDto(tag))
  }
}
