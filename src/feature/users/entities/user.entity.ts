import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hash } from 'bcrypt'
import { Document } from 'mongoose'

import { UserRoles } from '../../../constants/roles'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ type: [String], enum: UserRoles, default: [UserRoles.USER] })
  roles: UserRoles[]
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await hash(this.password, 10)
  }

  next()
})
