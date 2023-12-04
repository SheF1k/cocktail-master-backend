import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType('CreateTagInput')
export class CreateTagDto {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string
}
