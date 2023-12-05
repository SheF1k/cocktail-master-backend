import { TagsTransformer } from '@feature/tags/tags.transformer'
import { UsersModule } from '@feature/users/users.module'
import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Tag, TagSchema } from './entities/tag.entity'
import { TagsResolver } from './tags.resolver'
import { TagsService } from './tags.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [TagsService, TagsResolver, TagsTransformer],
  exports: [TagsService],
})
export class TagsModule {}
