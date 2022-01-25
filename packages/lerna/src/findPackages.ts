import { getPackages } from '@lerna/project'
import { filterPackages } from '@lerna/filter-packages'
import type { Package } from '@lerna/package'

export async function findPackages(
  root: string = process.cwd(),
  include?: string[],
  exclude?: string[],
  showPrivate = false,
  continueIfNoMatch?: boolean
): Promise<Package[]> {
  const packages = await getPackages(root)
  return filterPackages(
    packages,
    include,
    exclude,
    showPrivate,
    continueIfNoMatch
  )
}
