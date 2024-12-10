import { NestFactory } from '@nestjs/core';
import { MicroModule } from './microservice/micro.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import process from 'process';

const LOGGER_CONTEXT = 'micro.service.main'

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MicroModule, {
    transport: Transport.TCP
  })
  await app.listen()
  Logger.log(`Listening on TCP ...`, LOGGER_CONTEXT)
}

;((): void => {
  main()
    .then(() => Logger.log(`DONE`, LOGGER_CONTEXT))
    .catch((err) => {
      console.error(
        `!!! FAILED:
         ${err.message} - ${JSON.stringify(err, null, 2)}`,
        err.stack,
        LOGGER_CONTEXT
      )
      process.exit(-1)
    })
})()
