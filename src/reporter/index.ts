/* eslint-disable no-console */
import { logger } from '@poppinss/cliui'
import ms from 'ms'
import { ErrorsPrinter } from '@japa/errors-printer'
import type { DotReporterOptions } from '../contracts'
import type { Emitter, Runner, TestEndNode } from '@japa/core'

// TODO: A big part of the reporter is almost a copy and paste of SpecReporter.
// It might be nice to do something about this to avoid duplication of code.

/**
 * Minimal reporter that prints each test as an icon.
 */
export class DotReporter {
  private options: DotReporterOptions
  private uncaughtExceptions: { phase: 'test'; error: Error }[] = []

  constructor(options: Partial<DotReporterOptions> = {}) {
    this.options = { stackLinesCount: options.stackLinesCount || 5 }
  }

  /**
   * Print the aggregate count
   */
  private printAggregate(label: string, count: number, whitespaceLength: number) {
    if (count) {
      console.log(logger.colors.dim(`${label.padEnd(whitespaceLength + 2)} : ${count}`))
    }
  }

  /**
   * Print error summary
   */
  private async printErrorSummary(summary: ReturnType<Runner<any>['getSummary']>) {
    const errorPrinter = new ErrorsPrinter({
      stackLinesCount: this.options.stackLinesCount,
    })

    if (summary.failureTree.length || this.uncaughtExceptions.length) {
      console.log('')
      console.log('')
    }

    /**
     * Printing the errors tree
     */
    for (const suite of summary.failureTree) {
      await errorPrinter.printErrors(suite.name, suite.errors)

      for (const testOrGroup of suite.children) {
        if (testOrGroup.type === 'group') {
          await errorPrinter.printErrors(testOrGroup.name, testOrGroup.errors)
          for (const test of testOrGroup.children) {
            await errorPrinter.printErrors(test.title, test.errors)
          }
        } else {
          await errorPrinter.printErrors(testOrGroup.title, testOrGroup.errors)
        }
      }
    }

    /**
     * Uncaught exceptions
     */
    await errorPrinter.printErrors('Uncaught exception', this.uncaughtExceptions)
  }

  /**
   * Print tests summary
   */
  private async printSummary(summary: ReturnType<Runner<any>['getSummary']>) {
    console.log('')
    console.log('')

    if (summary.aggregates.total === 0) {
      console.log(logger.colors.bgYellow().black(' NO TESTS EXECUTED '))
      return
    }

    if (summary.hasError) {
      console.log(logger.colors.bgRed().black(' FAILED '))
    } else {
      console.log(logger.colors.bgGreen().black(' PASSED '))
    }
    console.log('')

    const aggregatesWhiteSpace = summary.aggregates.uncaughtExceptions ? 19 : 10

    this.printAggregate('total', summary.aggregates.total, aggregatesWhiteSpace)
    this.printAggregate('failed', summary.aggregates.failed, aggregatesWhiteSpace)
    this.printAggregate('passed', summary.aggregates.passed, aggregatesWhiteSpace)
    this.printAggregate('todo', summary.aggregates.todo, aggregatesWhiteSpace)
    this.printAggregate('skipped', summary.aggregates.skipped, aggregatesWhiteSpace)
    this.printAggregate('regression', summary.aggregates.regression, aggregatesWhiteSpace)
    this.printAggregate(
      'uncaught exceptions',
      summary.aggregates.uncaughtExceptions,
      aggregatesWhiteSpace
    )
    this.printAggregate('duration', ms(summary.duration), aggregatesWhiteSpace)

    this.printErrorSummary(summary)
  }

  /**
   * When test ends
   */
  private onTestEnd(payload: TestEndNode) {
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
   * When uncaught exception is raised
   */
  private onUncaughtException(error: Error) {
    this.uncaughtExceptions.push({ phase: 'test', error })
  }

  /**
   * When runner ends
   */
  private async onRunnerEnd(runner: Runner<any>) {
    const summary = runner.getSummary()
    this.printSummary(summary)
  }

  /**
   * Invoked by the tests runner when tests are about to start
   */
  public open(runner: Runner<any>, emitter: Emitter) {
    emitter.on('test:end', this.onTestEnd.bind(this))
    emitter.on('uncaught:exception', this.onUncaughtException.bind(this))
    emitter.on('runner:end', this.onRunnerEnd.bind(this, runner))
  }
}
