import execa from 'execa'
import { QueueStream } from '../..'

const MAX_SIZE = 1000 * 1000
describe('Output intensive - Run with --logHeapUsage to check memory test', () => {
  test('0.5MB', done => {
    const dest = new QueueStream(MAX_SIZE)
    const p = execa('node', ['-e', 'console.log(".".repeat(500000))'], { buffer: false })
    p.all.pipe(dest)
    dest.on('finish', () => {
      const res = dest.toString()
      expect(res.length).toBe(MAX_SIZE / 2 + 1)
      expect(res).toBe('.'.repeat(MAX_SIZE / 2) + '\n')
      done()
    })
  })

  test('1MB', done => {
    const dest = new QueueStream(MAX_SIZE)
    const p = execa('node', ['-e', 'console.log(".".repeat(1000000))'], { buffer: false })
    p.all.pipe(dest)
    dest.on('finish', () => {
      const res = dest.toString()
      expect(res.length).toBe(MAX_SIZE)
      expect(res).toBe('.'.repeat(MAX_SIZE - 1) + '\n')
      done()
    })
  })

  test('10MB', done => {
    const dest = new QueueStream(MAX_SIZE)
    const p = execa('node', ['-e', 'console.log(".".repeat(10000000))'], { buffer: false })
    p.all.pipe(dest)
    dest.on('finish', () => {
      const res = dest.toString()
      expect(res.length).toBe(MAX_SIZE)
      expect(res).toBe('.'.repeat(MAX_SIZE - 1) + '\n')
      done()
    })
  })

  test(
    '100MB',
    done => {
      const dest = new QueueStream(MAX_SIZE)
      const p = execa('node', ['-e', 'console.log(".".repeat(100000000))'], { buffer: false })
      p.all.pipe(dest)
      dest.on('finish', () => {
        const res = dest.toString()
        expect(res.length).toBe(MAX_SIZE)
        expect(res).toBe('.'.repeat(MAX_SIZE - 1) + '\n')
        done()
      })
    },
    30 * 1000
  )

  test(
    '250MB',
    done => {
      const dest = new QueueStream(MAX_SIZE)
      const p = execa('node', ['-e', 'console.log(".".repeat(250000000))'], { buffer: false })
      p.all.pipe(dest)
      dest.on('finish', () => {
        const res = dest.toString()
        expect(res.length).toBe(MAX_SIZE)
        expect(res).toBe('.'.repeat(MAX_SIZE - 1) + '\n')
        done()
      })
    },
    30 * 1000
  )

  test(
    '500MB',
    done => {
      const dest = new QueueStream(MAX_SIZE)
      const p = execa('node', ['-e', 'console.log(".".repeat(500000000))'], { buffer: false })
      p.all.pipe(dest)
      dest.on('finish', () => {
        const res = dest.toString()
        expect(res.length).toBe(MAX_SIZE)
        expect(res).toBe('.'.repeat(MAX_SIZE - 1) + '\n')
        done()
      })
    },
    30 * 1000
  )

  test(
    '1000MB',
    done => {
      const dest = new QueueStream(MAX_SIZE)
      const p = execa(
        'python3',
        ['-c', `import sys; print('.' * 1000000000, end=''); sys.stdout.flush();`],
        { buffer: false }
      )
      p.all.pipe(dest)
      dest.on('finish', () => {
        const res = dest.toString()
        expect(res.length).toBe(MAX_SIZE)
        expect(res).toBe('.'.repeat(MAX_SIZE))
        done()
      })
    },
    40 * 1000
  )
})
