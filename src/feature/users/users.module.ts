import { UsersTransformer } from '@feature/users/users.transformer'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './entities/user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersResolver, UsersTransformer],
  exports: [UsersService, UsersTransformer],
})
export class UsersModule {}
