import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtOptionsFactory } from '@nestjs/jwt'
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.get<string>('auth.secret'),
      signOptions: { expiresIn: '1h' },
    }
  }
}
