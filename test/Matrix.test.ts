import { Matrix } from '../src/Matrix'

describe('Matrix Calculation', () => {
  test('Matrix.VecDot', () => {
    const matA = Matrix.Create(1, 3, [1, 2, 3])
    const matB = Matrix.Create(1, 3, [1, 2, 3])
  
    const ret = Matrix.VecDot(matA, matB)
    expect(ret).toBe(14)
  })

  test('Matrix.VecCosSim', () => {
    const matA = Matrix.Create(1, 3, [1, 2, 3])
    const matB = Matrix.Create(1, 3, [1, 2, 3])
  
    const ret = Matrix.VecCosSim(matA, matB)
    expect(ret).toBe(1)
  })

  test('Matrix.GetLocalMatrix', () => {
    const matA = Matrix.Create(3, 3, [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ])

    const localA = Matrix.GetLocalMatrix(matA, 1, 1)
    expect(localA.elements).toEqual([
      null, null, null,
      null, 1, 2,
      null, 4, 5
    ])

    const localB = Matrix.GetLocalMatrix(matA, 1, 1, 3, 3, 0)
    expect(localB.elements).toEqual([
      0, 0, 0,
      0, 1, 2,
      0, 4, 5
    ])

    const localC = Matrix.GetLocalMatrix(matA, 1, 1, 5, 5)
    expect(localC.elements).toEqual([
      null, null, null, null, null,
      null, null, null, null, null,
      null, null, 1, 2, 3,
      null, null, 4, 5, 6,
      null, null, 7, 8, 9
    ])
  })
})
