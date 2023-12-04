import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GqlConfigService } from './graphql.config'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
      driver: ApolloDriver,
    }),
  ],
})
export class GraphqlModule {}
