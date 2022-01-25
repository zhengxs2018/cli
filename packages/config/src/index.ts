import { cosmiconfig, Options } from 'cosmiconfig'
import TsLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

export type ConfigExplorer = ReturnType<typeof cosmiconfig>

export function defineConfigExplorer(
  name: string,
  options?: Options
): ConfigExplorer {
  const { loaders = {}, ...optionalOptions } = options || {}
  const explorer = cosmiconfig(name, {
    ...optionalOptions,
    searchPlaces: [
      'package.json',
      `.${name}rc`,
      `.${name}rc.json`,
      `.${name}rc.yaml`,
      `.${name}rc.yml`,
      `.${name}rc.ts`,
      `.${name}rc.js`,
      `${name}.config.ts`,
      `${name}.config.js`
    ],
    loaders: {
      ...loaders,
      '.ts': TsLoader
    }
  })

  return explorer
}
