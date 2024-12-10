import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest/rest.module';
import process from 'process';
import { Logger } from '@nestjs/common';
import { Constants } from './constants';
import { RestAPIResponseInterceptor } from '../../common/core/interceptor/response.interceptor';

const LOGGER_CONTEXT = 'rest.service.main'

async function main() {
    const app = await NestFactory.create(RestModule)

    app.useGlobalInterceptors(new RestAPIResponseInterceptor())

    await app.listen(process.env.PORT ?? Constants.service.rest.port)
    Logger.log(`Listening on ${await app.getUrl()} ...`, LOGGER_CONTEXT)
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
