export type InternalModuleFormat =
  | 'amd'
  | 'cjs'
  | 'es'
  | 'iife'
  | 'system'
  | 'umd'

export type ModuleFormat =
  | InternalModuleFormat
  | 'commonjs'
  | 'esm'
  | 'module'
  | 'systemjs'

export type InputOption = string | string[] | { [entryAlias: string]: string }

export type ExternalOption = (string | RegExp)[] | string | RegExp

export type WatchOption = boolean | Record<string, unknown>

export type GlobalsOption =
  | { [name: string]: string }
  | ((name: string) => string)

export interface InputOptions {
  entryPoints?: InputOption
  external?: ExternalOption
  plugins?: any[]
}

export interface OutputOptions {
  name?: string
  banner?: string | Record<string, string>
  footer?: string | Record<string, string>
  format?: ModuleFormat
  outFile?: string | ((format: ModuleFormat) => string)
  outDir?: string
  globals?: GlobalsOption
  sourcemap?: boolean | 'inline' | 'hidden'
  sourcemapFile?: string
  minify?: boolean
  assetFileNames?: string | ((chunkInfo: any) => string)
  chunkFileNames?: string | ((chunkInfo: any) => string)
  entryFileNames?: string | ((chunkInfo: any) => string)
}

export interface UserConfig extends InputOptions, OutputOptions {
  /**
   * 构建目标
   */
  target?: string | string[]

  /**
   * 是否 typescript 项目
   */
  isTypeScript?: boolean

  /**
   * 自定义 tsconfig 文件路径
   */
  tsconfigFilePath?: string

  /**
   * 允许外部覆盖 tsconfig.json 的配置
   *
   * @see https://aka.ms/tsconfig.json
   */
  tsconfigOverride?: any

  /**
   * 是否禁用 ts 类型检查
   */
  disableTypeCheck?: boolean
}

export interface MergedBuilderOptions extends InputOptions {
	output: OutputOptions[];
}
