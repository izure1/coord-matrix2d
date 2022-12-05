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
})
