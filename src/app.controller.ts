import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './feature/auth/auth.service'
import { LocalAuthGuard } from './feature/auth/local/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
