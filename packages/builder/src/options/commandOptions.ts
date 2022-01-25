import type { ModuleFormat, ExternalOption } from '../types'
import type { GenericConfigObject } from './options'

export interface CommandConfigObject {
  mode: string
  root: string
  monorepo: boolean
  name?: string
  entryPoints: string[]
  outFile?: string
  excludePackages?: string[]
  external?: ExternalOption[]
  tsconfigFilePath?: string
  formats?: ModuleFormat[]
  [key: string]: unknown
}

export function getCommandOptions(
  rawCommandOptions: GenericConfigObject
): CommandConfigObject {
  return {
    monorepo: rawCommandOptions['monorepo'] === true,
    root: rawCommandOptions['root'] || process.cwd(),
    mode: rawCommandOptions['mode'] || process.env.NODE_ENV || 'development',
    name: rawCommandOptions['name'],
    entryPoints: arrify(rawCommandOptions['entryPoints']),
    excludePackages: arrify(rawCommandOptions['excludePackages']),
    external: arrify(rawCommandOptions['external']),
    tsconfigFilePath: rawCommandOptions['tsconfigFilePath'],
    outFile: rawCommandOptions['outFile'],
    formats: arrify(
      rawCommandOptions['f'] || rawCommandOptions['format'] || ['esm', 'cjs']
    )
  }
}

function arrify(v) {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}
