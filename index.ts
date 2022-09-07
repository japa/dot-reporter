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
