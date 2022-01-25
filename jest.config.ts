// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
import path from 'path'

import type { Config } from '@jest/types'
import { keyBy, mapValues } from 'lodash'

import { findPackages } from '@zhengxs/lerna'

export default async (): Promise<Config.InitialOptions> => {
  const packages = await findPackages(__dirname, [], [
    '@zhengxs/eslint-config-*'
  ])

  return {
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: packages.map(pkg =>
      path.resolve(pkg['location'], 'src/**/*.ts')
    ),

    projects: packages.map(pkg => {
      return {
        displayName: pkg['name'],
        preset: 'ts-jest',
        testMatch: [path.resolve(pkg['location'], 'src/**/*.(spec|test).ts')]
      }
    }),

    moduleNameMapper: mapValues(keyBy(packages, 'name'), pkg =>
      path.resolve(pkg['location'], 'src')
    )
  }
}
