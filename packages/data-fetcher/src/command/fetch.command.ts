import { Command, CommandRunner } from 'nest-commander';
import { DataWorker } from '../worker/data.worker';


const LOGGER_CONTEXT = 'fetch.command'

@Command({
  name: 'fetch',
  options: {
    isDefault: true
  }
})
export class FetchCommand extends CommandRunner {
  constructor(
    private readonly worker: DataWorker) {
    super();
  }
  async run(): Promise<void> {
    console.log(`Fetching data ...`)
    const updated = await this.worker.update()
    console.log('Updated', updated)
  }
}