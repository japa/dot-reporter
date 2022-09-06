import { DotReporterOptions } from './src/contracts'
import { DotReporter } from './src/reporter/index'

/**
 * Dot reporter function
 */
export function dotReporter(options: Partial<DotReporterOptions> = {}) {
  const reporter = new DotReporter(options)
  return reporter.open.bind(reporter)
}

export { DotReporter }
