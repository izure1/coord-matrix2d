import { Matrix } from '../src/Matrix'

const vecA13 = Matrix.Create(1, 3, [1, 2, 3])
const vecB13 = Matrix.Create(1, 3, [4, 5, 6])
const matA33 = Matrix.Create(3, 3, [
  1, 2, 3,
  4, 5, 6,
  7, 8, 9
])

describe('Matrix Static function', () => {
  test('VecDot', () => {
    expect(Matrix.VecDot(vecA13, vecA13)).toBe(14)
    expect(Matrix.VecDot(vecA13, vecB13)).toBe(32)
  })

  test('VecCosSim', () => {
    expect(Matrix.VecCosSim(vecA13, vecA13)).toBe(1)
  })

  test('IsSameSize', () => {
    expect(Matrix.IsSameSize(vecA13, vecB13)).toBe(true)
    expect(Matrix.IsSameSize(vecA13, matA33)).toBe(false)
  })

  test('GetLocalMatrix', () => {
    const localA = Matrix.GetLocalMatrix(matA33, 1, 1)
    expect(localA.elements).toEqual([
      null, null, null,
      null, 1, 2,
      null, 4, 5
    ])

    const localB = Matrix.GetLocalMatrix(matA33, 1, 1, 3, 3, 0)
    expect(localB.elements).toEqual([
      0, 0, 0,
      0, 1, 2,
      0, 4, 5
    ])

    const localC = Matrix.GetLocalMatrix(matA33, 1, 1, 5, 5)
    expect(localC.elements).toEqual([
      null, null, null, null, null,
      null, null, null, null, null,
      null, null, 1, 2, 3,
      null, null, 4, 5, 6,
      null, null, 7, 8, 9
    ])
  })
})

describe('Matrix instance method', () => {
  test('getRowElements', () => {
    const a = vecA13.getRowElements(1)
    const b = matA33.getRowElements(1)
    const c = matA33.getRowElements(2)
    const d = () => matA33.getRowElements(4)
    expect(a).toEqual([1, 2, 3])
    expect(b).toEqual([1, 2, 3])
    expect(c).toEqual([4, 5, 6])
    expect(d).toThrow()
  })

  test('getColElements', () => {
    const a = vecA13.getColElements(1)
    const b = matA33.getColElements(1)
    const c = matA33.getColElements(2)
    const d = () => matA33.getColElements(4)
    expect(a).toEqual([1])
    expect(b).toEqual([1, 4, 7])
    expect(c).toEqual([2, 5, 8])
    expect(d).toThrow()
  })

  test('getIndex', () => {
    expect(matA33.getIndex(1, 1)).toBe(0)
    expect(vecA13.getIndex(1, 2)).toBe(1)
    expect(() => vecA13.getIndex(2, 2)).toThrow()
  })

  test('getRowIndex', () => {
    expect(vecA13.getRowIndex(1)).toBe(1)
    expect(matA33.getRowIndex(3)).toBe(2)
  })

  test('getColIndex', () => {
    expect(vecA13.getColIndex(1)).toBe(2)
    expect(matA33.getColIndex(3)).toBe(1)
    expect(matA33.getColIndex(5)).toBe(3)
  })

  test('reachable', () => {
    expect(matA33.reachable(0, 0)).toBe(false)
    expect(matA33.reachable(3, 3)).toBe(true)
    expect(matA33.reachable(3, 4)).toBe(false)
  })

  test('getElement', () => {
    expect(matA33.getElement(1, 3)).toBe(3)
    expect(matA33.getElement(3, 1)).toBe(7)
    expect(matA33.getElement(2, 2)).toBe(5)
  })

  test('as2DArray', () => {
    expect(matA33.as2DArray()).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
  })
})