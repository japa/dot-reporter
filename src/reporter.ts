/*
 * @japa/dot-reporter
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { logger } from '@poppinss/cliui'
import type { TestEndNode } from '@japa/core'
import { BaseReporter } from '@japa/base-reporter'

/**
 * Minimal reporter that prints each test as an icon.
 */
export class DotReporter extends BaseReporter {
  /**
   * When a test ended
   */
  protected onTestEnd(payload: TestEndNode) {
    let output = ''
    if (payload.isTodo) {
      output = logger.colors.cyan('-')
    } else if (payload.hasError || payload.isFailing) {
      output = logger.colors.red('×')
    } else if (payload.isSkipped) {
      output = logger.colors.yellow('-')
    } else {
      output = logger.colors.green('•')
    }

    process.stdout.write(`${output}`)
  }

  /**
   * When test runner ended
   */
  protected async end() {
    console.log('')
    await this.printSummary(this.runner.getSummary())
  }
}
