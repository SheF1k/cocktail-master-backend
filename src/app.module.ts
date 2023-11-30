import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import authConfig from './config/auth.config'
import databaseConfig from './config/database.config'
import { AuthModule } from './feature/auth/auth.module'
import { JwtAuthGuard } from './feature/auth/jwt/jwt-auth.guard'
import { RbacGuard } from './feature/rbac/rbac.guard'
import { UsersModule } from './feature/users/users.module'
import { MongooseConfigService } from './services/database/mongoose-config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
})
export class AppModule {}
