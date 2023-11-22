import { registerAs } from '@nestjs/config'
import * as process from 'process'

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}))
