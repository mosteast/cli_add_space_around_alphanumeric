import { Command, flags } from '@oclif/command'
import { readFileSync, writeFileSync } from 'fs'
import * as Parser from '@oclif/parser'

class MosteastCliAddSpaceAroundAlphanumeric extends Command {
  static description = require('../package.json').description

  static flags: flags.Input<any> = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  }

  static args: Parser.args.IArg[] = [
    { name: 'file', required: true },
  ]

  async run() {
    const { args: { file } } = this.parse(MosteastCliAddSpaceAroundAlphanumeric)

    if (!file) {
      this.error('Invalid file name')
    }

    const content = readFileSync(file, 'utf8')

    const result = content
      .replace(/([\w\d]+)([\u4e00-\u9fa5]+)/g, '$1 $2')
      .replace(/([\u4e00-\u9fa5]+)([\w\d]+)/g, '$1 $2')

    writeFileSync(file, result, 'utf8')
  }
}

export = MosteastCliAddSpaceAroundAlphanumeric
