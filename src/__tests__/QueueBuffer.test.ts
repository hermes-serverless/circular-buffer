import { QueueBuffer } from '../'

test('Zero length', () => {
  const buffer = new QueueBuffer(5)
  expect(buffer.getSize()).toBe(0)
  expect(buffer.getMaxSize()).toBe(5)
  expect(buffer.getString()).toBe('')
})

test('Pushing', () => {
  const buffer = new QueueBuffer(5)

  const check = (str: string) => {
    expect(buffer.getMaxSize()).toBe(5)
    expect(buffer.getSize()).toBe(str.length)
    expect(buffer.getString()).toBe(str)
  }

  check('')

  buffer.push('a')
  check('a')

  buffer.push('b')
  check('ab')

  buffer.push(Buffer.from('cd'))
  check('abcd')

  buffer.push('e')
  check('abcde')

  buffer.push(Buffer.from('fgh'))
  check('defgh')

  buffer.push('ijklm')
  check('ijklm')
})
