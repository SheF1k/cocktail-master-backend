import { TagsModule } from '@feature/tags/tags.module'
import { UsersModule } from '@feature/users/users.module'
import { AuthModule } from '@infrastructure/auth/auth.module'
import { JwtAuthGuard } from '@infrastructure/auth/jwt/jwt-auth.guard'
import { GraphqlModule } from '@infrastructure/graphql/graphql.module'
import { RbacGuard } from '@infrastructure/rbac/rbac.guard'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseConfigService } from '@services/database/mongoose-config.service'
import { PaginationModule } from '@services/pagination/pagination.module'

import { AppController } from './app.controller'
import authConfig from './config/auth.config'
import databaseConfig from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    TagsModule,
    AuthModule,
    GraphqlModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
})
export class AppModule {}
