import { Emitter, Runner } from '@japa/core'
import { fire } from '@japa/synthetic-events'
import { dotReporter } from '../index'

const emitter = new Emitter()
const runner = new Runner(emitter)

dotReporter()(runner, emitter)
runner['boot']()

fire(emitter)
