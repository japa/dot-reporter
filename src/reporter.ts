/*
 * @japa/dot-reporter
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { TestEndNode } from '@japa/core/types'
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
      output = this.colors.cyan('-')
    } else if (payload.hasError || payload.isFailing) {
      output = this.colors.red('×')
    } else if (payload.isSkipped) {
      output = this.colors.yellow('-')
    } else {
      output = this.colors.green('•')
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
