import { defineConfigExplorer, ConfigExplorer } from '@zhengxs/config'
import { findPackages } from '@zhengxs/lerna'

import {
  getCommandOptions,
  CommandConfigObject
} from './options/commandOptions'
// import { mergeOptions } from './options/mergeOptions'
import type { GenericConfigObject } from './options/options'

export class Builder {
  explorer: ConfigExplorer

  commandOptions: CommandConfigObject

  rootPath: string

  constructor(rawCommandOptions: GenericConfigObject) {
    const commandOptions = getCommandOptions(rawCommandOptions)
    const explorer = defineConfigExplorer('build')

    this.explorer = explorer
    this.commandOptions = commandOptions
    this.rootPath = commandOptions['root']
  }

  async bundle() {
    // pass
  }

  async bundlePackagesInWorkspace() {
    const { rootPath, commandOptions } = this
    const rootConfig = await this.loadRootConfigFile(rootPath)
    const packages = await findPackages(
      rootPath,
      commandOptions['entryPoints'],
      commandOptions['excludePackages']
    )

    for (const pkg of packages) {
      const projectConfig = await this.loadConfigFile(pkg['location'])
      console.log(projectConfig === rootConfig)
    }
  }

  async bundlePackage() {
    // pass
  }

  async run() {
    if (this.commandOptions.monorepo) {
      return this.bundlePackagesInWorkspace()
    } else {
      return this.bundle()
    }
  }

  async loadRootConfigFile(searchFrom: string): Promise<GenericConfigObject> {
    const result = await this.explorer.search(searchFrom)
    const configFileExport = result ? result.config : {}

    const config = await (typeof configFileExport === 'function'
      ? configFileExport(this.commandOptions)
      : configFileExport)

    if (Array.isArray(config)) {
      throw new TypeError(`[@zhengxs/builder] 项目根路径下的配置只允许返回对象`)
    }

    return config
  }

  async loadConfigFile(searchFrom: string): Promise<GenericConfigObject[]> {
    const result = await this.explorer.search(searchFrom)
    const configFileExport = result ? result.config : {}

    const config = await (typeof configFileExport === 'function'
      ? configFileExport(this.commandOptions)
      : configFileExport)

    return Array.isArray(config) ? config : [config]
  }
}
