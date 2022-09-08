import { logger } from '@poppinss/cliui'
import { BaseReporter } from '@japa/base-reporter'
import { TestEndNode } from '@japa/core'

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
