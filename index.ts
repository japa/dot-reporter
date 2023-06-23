/*
 * @japa/dot-reporter
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { BaseReporterOptions } from '@japa/base-reporter/types'
import { DotReporter } from './src/reporter.js'

/**
 * Dot reporter function
 */
export function dotReporter(options: BaseReporterOptions = {}) {
  const reporter = new DotReporter(options)
  return reporter.boot.bind(reporter)
}

export { DotReporter }
