import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { contextBuilder } from '@infrastructure/graphql/graphql.context'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory } from '@nestjs/graphql'
import { join } from 'path'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: contextBuilder,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }
  }
}
