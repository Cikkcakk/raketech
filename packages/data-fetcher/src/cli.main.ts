import { CommandFactory } from 'nest-commander';
import { FetchModule } from './command/fetch.module';
import { Logger } from '@nestjs/common';
import process from 'process';

const LOGGER_CONTEXT = 'cli.main'

async function  main() {
  await CommandFactory.run(FetchModule)
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
