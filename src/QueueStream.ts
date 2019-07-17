import { Writable, WritableOptions } from 'stream'
import { QueueBuffer } from './QueueBuffer'

export class QueueStream extends Writable {
  data: QueueBuffer

  constructor(maxSize: number, options?: WritableOptions) {
    super(options)
    this.data = new QueueBuffer(maxSize)
  }

  public _write(chunk: Buffer, encoding: string, cb: (err?: Error) => void) {
    this.data.push(chunk)
    cb(null)
  }

  public toString = () => {
    return this.data.getString()
  }

  public getSize = () => {
    return this.data.getSize()
  }

  public getMaxSize = () => {
    return this.data.getMaxSize()
  }
}
