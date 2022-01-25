import { getPackagesSync } from '@lerna/project'
import { filterPackages } from '@lerna/filter-packages'
import type { Package } from '@lerna/package'

export function findPackagesSync(
  root = process.cwd(),
  include?: string[],
  exclude?: string[],
  showPrivate = false,
  continueIfNoMatch?: boolean
): Promise<Package[]> {
  const packages = getPackagesSync(root)
  return filterPackages(
    packages,
    include,
    exclude,
    showPrivate,
    continueIfNoMatch
  )
}
