import { UsersModule } from '@feature/users/users.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtConfigService } from '@services/auth/jwt-config.service'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt/jwt.strategy'
import { LocalStrategy } from './local/local.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
