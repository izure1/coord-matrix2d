import { Matrix } from '../src/Matrix'

describe('Matrix Calculation', () => {
  test('Matrix.Dot', () => {
    const matA = Matrix.Create(3, 1, [1, 2, 3])
    const matB = Matrix.Create(1, 3, [1, 2, 3])
  
    const ret = Matrix.Dot(matA, matB)
    expect(ret).toBe(14)
  })
})
