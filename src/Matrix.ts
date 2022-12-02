export class Matrix<T> {
  /** The row size of matrix. */
  readonly row: number
  /** The column size of matrix. */
  readonly col: number
  /** The elements length of matrix. */
  readonly size: number
  /** All of matrix's elements. */
  readonly elements: T[]

  constructor(row: number, col: number, elements: T|T[]) {
    const size = row * col

    if (!Array.isArray(elements)) {
      elements = new Array(row * col).fill(elements)
    }

    if (size !== elements.length) {
      throw new Error(`The size of element expected ${size}, but got a ${elements.length}.`)
    }

    this.elements = elements
    this.size = size
    this.row = row
    this.col = col
  }

  /** Returns a clone of matrix. */
  get clone(): Matrix<T> {
    return Matrix.Create(this.row, this.col, [...this.elements])
  }

  /**
   * Creates a new matrix instance with same row and col size.
   * @param row The row size of new matrix.
   * @param col The column size of new matrix.
   * @param elements The elements of new matrix. If `elements` argument is not array, it will be filled with `elements` argument.
   * @returns The new matrix instance.
   */
  static Create<T>(row: number, col: number, elements: T|T[]): Matrix<T> {
    return new Matrix(row, col, elements)
  }

  /**
   * Create matrix instance from 2d-array data type.
   * @param array Source of matrix elements as 2d-array data type.
   * @returns Matrix instance.
   */
  static From2DArray<T>(array: T[][]): Matrix<T> {
    const row = array.length
    if (!row) {
      throw new Error(`The size of array is should at least least 1.`)
    }

    const col = array[0].length
    const elements: T[] = []
    for (const list of array) {
      if (list.length !== col) {
        throw new Error(`The size of all rows in array are should be same size.`)
      }
      elements.push(...list)
    }

    return new Matrix(row, col, elements)
  }

  /**
   * Returns added result matrix between both matrix. It will returns `a + b`.
   * @param a The matrix.
   * @param b The matrix.
   */
  static Add(a: Matrix<number>, b: Matrix<number>): Matrix<number> {
    if (!Matrix.IsSameSize(a, b)) {
      throw Matrix.ERR_SIZE_NOT_MATCH()
    }
    return new Matrix(a.row, a.col, a.elements.map((av, i) => av + b.elements[i]))
  }

  /**
   * Returns subtracted result matrix between both matrix. It will returns `a - b`.
   * @param a The matrix.
   * @param b The matrix.
   */
  static Sub(a: Matrix<number>, b: Matrix<number>): Matrix<number> {
    if (!Matrix.IsSameSize(a, b)) {
      throw Matrix.ERR_SIZE_NOT_MATCH()
    }
    return new Matrix(a.row, a.col, a.elements.map((av, i) => av - b.elements[i]))
  }

  /**
   * Returns multiplied result matrix between both matrix. It will returns `a * b`.
   * WARNING! This method is not product matrix. It's just a multiply each element of matrix.
   * If you want to product matrix, use `Prod` method.
   * @param a The matrix.
   * @param b The matrix.
   */
  static Mul(a: Matrix<number>, b: Matrix<number>): Matrix<number> {
    if (!Matrix.IsSameSize(a, b)) {
      throw Matrix.ERR_SIZE_NOT_MATCH()
    }
    return new Matrix(a.row, a.col, a.elements.map((av, i) => av * b.elements[i]))
  }

  /**
   * Returns divided result matrix between both matrix. It will returns `a / b`.
   * It's just a divide each element of matrix.
   * @param a The matrix.
   * @param b The matrix.
   */
  static Div(a: Matrix<number>, b: Matrix<number>): Matrix<number> {
    if (!Matrix.IsSameSize(a, b)) {
      throw Matrix.ERR_SIZE_NOT_MATCH()
    }
    return new Matrix(a.row, a.col, a.elements.map((av, i) => av / b.elements[i]))
  }

  /**
   * Returns multiplied result matrix between both matrix.
   * The matrix product must be same `a.col` and `b.row` size. If not, it will throw an error.
   * @param a The first matrix.
   * @param b The second matrix.
   * @returns New matrix instance.
   */
  static Prod(a: Matrix<number>, b: Matrix<number>): Matrix<number> {
    if (a.col !== b.row) {
      throw Matrix.ERR_MULTIPLY_SIZE_NOT_MATCH()
    }
    const matrix = new Matrix<number>(a.row, b.col, new Array(a.row * b.col).fill(0))
    matrix.elements.length = 0
    for (let i = 0; i < a.row; i++) {
      const aElement = a.getRowElements(i)
      for (let j = 0; j < b.col; j++) {
        const bElement = b.getColElements(j)
        const result = aElement.map((av, k) => av * bElement[k])
        matrix.elements.push(result.reduce((acc, cur) => acc + cur, 0))
      }
    }
    return matrix
  }

  /**
   * Returns the scalar product results of two matrices.
   * @param a The first matrix.
   * @param b The second matrix.
   * @returns The scalar value.
   */
  static Dot(a: Matrix<number>, b: Matrix<number>): number {
    if (a.col !== b.row) {
      throw Matrix.ERR_MULTIPLY_SIZE_NOT_MATCH()
    }
    const matrix = Matrix.Mul(a, b)
    return matrix.elements.reduce((acc, current) => acc + current, 0)
  }

  /**
   * Returns whether the matrix has same size. It calculates with `row` and `col` properties.
   * @param a The matrix.
   * @param b The matrix.
   */
  static IsSameSize(a: Matrix<any>, b: Matrix<any>): boolean {
    return a.row === b.row && a.col === b.col
  }

  /**
   * Returns whether the index has exceeded the range. Returns `true` if exceeded.
   * @param index The index number.
   * @param max Maximum index.
   * @param min Minimum index. Default value is `0`
   */
  static OutOfRange(index: number, max: number, min = 0): boolean {
    return index < min || index > max
  }

  protected static ERR_EXCEED_RANGE(min: number, max: number, index: number): Error {
    return new Error(`The index exceeds the size of the matrix. The size should be between ${min} to ${max}, but got a ${index}`)
  }

  protected static ERR_SIZE_NOT_MATCH(): Error {
    return new Error(`The both matrixes are not match row, col size.`)
  }

  protected static ERR_MULTIPLY_SIZE_NOT_MATCH(): Error {
    return new Error(`The size of matrixes are not match. You can't multiply them. The matrixes row and col size should be same.`)
  }

  /**
   * Get new matrix from part of source matrix. It returns neighbor elements from point of coordinates of source matrix.
   * The size of new matrix is multiple of row and column of arguments.
   * @param source The source matrix.
   * @param rowIndex Point of row index.
   * @param colIndex Point of column index.
   * @param row The matrix row size of result. Default value is `3`
   * @param col The matrix column size of result. Default value is `3`
   * @param fill Fill element if neighbor elements are out of range.
   */
  static GetLocalMatrix<T>(source: Matrix<T>, rowIndex: number, colIndex: number, row = 3, col = 3, fill: any = null): Matrix<T> {
    if (
      !(row%2) || !(col%2) ||
      row < 0 || col < 0
    ) {
      throw new Error(`The row and col parameter should be positive odd number.`)
    }

    const size = row * col
    const mat = new Matrix(row, col, new Array(size).fill(fill))

    const rowRadius = (row-1)/2
    const colRadius = (col-1)/2
    const startRowIndex = rowIndex - rowRadius
    const startColIndex = colIndex - colRadius

    for (let y = 0, i = 0; y < row; y++) {
      const rowOffset = startRowIndex + y
      if (Matrix.OutOfRange(rowOffset, source.row-1)) {
        i+=col
        continue
      }
      for (let x = 0; x < col; x++, i++) {
        const colOffset = startColIndex + x
        if (Matrix.OutOfRange(colOffset, source.col-1)) {
          continue
        }
        const element = source.getElement(rowOffset, colOffset)
        mat.elements[i] = element
      }
    }

    return mat
  }

  /**
   * Returns all elements in matrix's row vector as array.
   * @param index The matrix index of row.
   */
  getRowElements(index: number): T[] {
    if (Matrix.OutOfRange(index, this.row-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.row-1, index)
    }
    const start = index * this.col
    const end = start + this.col
    return this.elements.slice(start, end)
  }

  /**
   * Returns all elements in matrix's column vector as array.
   * @param index The matrix index of column.
   */
  getColElements(index: number): T[] {
    if (Matrix.OutOfRange(index, this.col-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.col-1, index)
    }
    const elements: T[] = []
    const start = index
    const step = this.col
    for (let i = start, len = this.elements.length; i < len; i += step) {
      const t = this.elements[i]
      elements.push(t)
    }
    return elements
  }

  /**
   * Get elements index of `matrix.elements` property with calculates row and column.
   * @param rowIndex The matrix index of row.
   * @param colIndex The matrix index of column.
   * @returns 
   */
  getIndex(rowIndex: number, colIndex: number): number {
    if (Matrix.OutOfRange(rowIndex, this.row-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.row-1, rowIndex)
    }
    if (Matrix.OutOfRange(colIndex, this.col-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.col-1, colIndex)
    }
    return (rowIndex * this.col) + colIndex
  }

  /**
   * Sets element for matrix.
   * @param rowIndex The matrix index of row.
   * @param colIndex The matrix index of column.
   * @param element The element what you want set.
   */
  setElement(rowIndex: number, colIndex: number, element: T): void {
    const index = this.getIndex(rowIndex, colIndex)
    this.elements[index] = element
  }

  /**
   * Returns row index of matrix from calculated with element index.
   * @param elOffset The index of `matrix.elements`
   */
  getRowIndex(elOffset: number): number {
    if (Matrix.OutOfRange(elOffset, this.elements.length-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.elements.length-1, elOffset)
    }
    return Math.floor(elOffset / this.col)
  }

  /**
   * Returns column index of matrix of calculated with element index.
   * @param elOffset The index of `matrix.elements`
   */
  getColIndex(elOffset: number): number {
    if (Matrix.OutOfRange(elOffset, this.elements.length-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.elements.length-1, elOffset)
    }
    return elOffset % this.col
  }

  /**
   * Returns whether the positions of rows and columns are within the range of the current matrix.
   * If the position is within the range of the matrix, it returns `true`. Otherwise, it returns `false`.
   * You can use this method to get element safely.
   * ```
   * if (matrix.reachable(rowIndex, colIndex)) {
   *  const element = matrix.getElement(rowIndex, colIndex)
   * }
   * ```
   * @param rowIndex The row index of matrix.
   * @param colIndex The column index of matrix.
   */
  reachable(rowIndex: number, colIndex: number): boolean {
    return !Matrix.OutOfRange(rowIndex, this.row-1) && !Matrix.OutOfRange(colIndex, this.col-1)
  }

  /**
   * Returns element what you find in point of coordinates in matrix.
   * @param rowIndex The row index of matrix.
   * @param colIndex The column index of matrix.
   */
  getElement(rowIndex: number, colIndex: number): T {
    if (Matrix.OutOfRange(rowIndex, this.row-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.row-1, rowIndex)
    }
    if (Matrix.OutOfRange(colIndex, this.col-1)) {
      throw Matrix.ERR_EXCEED_RANGE(0, this.col-1, colIndex)
    }
    const index = this.getIndex(rowIndex, colIndex)
    return this.elements[index]
  }

  /**
   * Fill matrix with a element.
   * It is useful with `Matrix.Add`, `Matrix.Sub`, `Matrix.Mul`, `Matrix.Div` like methods.
   * ```
   * const mat = Matrix.Create(3, 3, [1,2,3,4,5,6,7,8,9])
   * const result = Matrix.Mul(mat, mat.clone.fill(3))
   * ```
   * @param element The fill element.
   */
  fill(element: T): this {
    this.elements.fill(element)
    return this
  }

  /**
   * Returns all elements in matrix as 2d-array data type.
   */
  as2DArray(): T[][] {
    const array: T[][] = []
    for (let i = 0; i < this.row; i++) {
      const start = i * this.col
      const end = start + this.col
      const list = this.elements.slice(start, end)
      array.push(list)
    }
    return array
  }
}
