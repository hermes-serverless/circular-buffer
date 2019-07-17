import { PassThrough } from 'stream'
import { QueueStream } from '../..'

describe('Pipe work', () => {
  test('Surpass limit', done => {
    const src = new PassThrough()
    const dest = new QueueStream(5)
    src.pipe(dest)
    src.write('.'.repeat(10000))
    src.end()
    dest.on('finish', () => {
      expect(dest.toString()).toBe('.....')
      done()
    })
  })

  test('Output intensive', done => {
    const src = new PassThrough()
    const dest = new QueueStream(10000)
    src.pipe(dest)
    src.write(Buffer.from('.'.repeat(10000000)))
    src.end()
    dest.on('finish', () => {
      expect(dest.toString()).toBe('.'.repeat(10000))
      done()
    })
  })
})

describe('Write work', () => {
  test('Output intensive', done => {
    const stream = new QueueStream(1000)
    stream.on('finish', done)
    stream.write(Buffer.from('.'.repeat(10000000)))
    expect(stream.toString()).toBe('.'.repeat(1000))
    stream.end()
  })
})
