import { User } from '@feature/users/entities/user.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MoongooseSchema } from 'mongoose'
import * as autopopulate from 'mongoose-autopopulate'

@Schema({ timestamps: true })
export class Tag extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date

  @Prop({
    type: MoongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  })
  createdBy: User

  @Prop({
    type: MoongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  })
  updatedBy: User
}

export const TagSchema = SchemaFactory.createForClass(Tag)

// @ts-expect-error requires because of mongoose-autopopulate
TagSchema.plugin(autopopulate)
