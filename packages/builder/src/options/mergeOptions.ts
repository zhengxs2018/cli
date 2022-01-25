import type { CommandConfigObject } from './commandOptions'
import type { GenericConfigObject } from './options'

import { InputOptions } from '../types'

export interface MergedConfigObject {}

export function mergeOptions(
  configs: GenericConfigObject[],
  commandOptions: CommandConfigObject
): { options: MergedConfigObject[] } {
  const options: MergedConfigObject[] = []

  for (const config of configs) {
    const inputOptions = mergeInputOptions(config, commandOptions)
    console.log(config)
  }

  return { options }
}

function mergeInputOptions(config: GenericConfigObject, commandOptions: CommandConfigObject): InputOptions {
  return {
    entryPoints: config['entryPoints'] || commandOptions['entryPoints'] || ['src/index.ts']
  }
}
