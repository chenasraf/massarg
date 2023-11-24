import { toCamelCase } from '../src/utils'

describe('toCamelCase', () => {
  test('works', () => {
    expect(toCamelCase('foo')).toBe('foo')
    expect(toCamelCase('foo-bar')).toBe('fooBar')
    expect(toCamelCase('foo-bar baz')).toBe('fooBarBaz')
    expect(toCamelCase('foo-bar baz-qux')).toBe('fooBarBazQux')

    expect(toCamelCase('foo123')).toBe('foo123')
    expect(toCamelCase('foo-123')).toBe('foo123')
    expect(toCamelCase('foo-123 bar')).toBe('foo123Bar')
  })
})
