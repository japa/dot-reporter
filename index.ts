/*
 * @japa/dot-reporter
 *
 * (c) Japa
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseReporterOptions } from '@japa/base-reporter'
import { DotReporter } from './src/reporter'

/**
 * Dot reporter function
 */
export function dotReporter(options: BaseReporterOptions = {}) {
  const reporter = new DotReporter(options)
  return reporter.boot.bind(reporter)
}

export { DotReporter }
