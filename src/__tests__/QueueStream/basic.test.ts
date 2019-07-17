import { PassThrough } from 'stream'
import { QueueStream } from '../..'

describe('Pipe work', () => {
  test('Limit not reached', done => {
    const src = new PassThrough()
    const dest = new QueueStream(5)
    src.pipe(dest)
    src.write('...')
    src.end()
    dest.on('finish', () => {
      expect(dest.toString()).toBe('...')
      done()
    })
  })

  test('Equal limit', done => {
    const src = new PassThrough()
    const dest = new QueueStream(5)
    src.pipe(dest)
    src.write('.....')
    src.end()
    dest.on('finish', () => {
      expect(dest.toString()).toBe('.....')
      done()
    })
  })

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
})

describe('Write work', () => {
  test('Limit not reached', done => {
    const stream = new QueueStream(5)
    stream.on('finish', done)
    stream.write('...')
    expect(stream.toString()).toBe('...')
    stream.end()
  })

  test('Equal limit', done => {
    const stream = new QueueStream(1000)
    stream.on('finish', done)
    stream.write('.'.repeat(1000))
    expect(stream.toString()).toBe('.'.repeat(1000))
    stream.end()
  })

  test('Surpass limit', done => {
    const stream = new QueueStream(1000)
    stream.on('finish', done)
    stream.write(Buffer.from('.'.repeat(10000)))
    expect(stream.toString()).toBe('.'.repeat(1000))
    stream.end()
  })
})
