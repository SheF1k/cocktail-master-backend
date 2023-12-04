import { AuthService } from '@infrastructure/auth/auth.service'
import { LocalAuthGuard } from '@infrastructure/auth/local/local-auth.guard'
import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from '@services/auth/public.constants'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
