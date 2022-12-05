# coord-matrix2d

[![Hit](https://data.jsdelivr.com/v1/package/npm/coord-matrix2d/badge)](https://www.jsdelivr.com/package/npm/coord-matrix2d)

The two-dimensional matrix resembling a Cartesian coordinate system.

## How to use

```typescript
import { Matrix } from 'coord-matrix2d'

const matrix = Matrix.Create(3, 3, [
  1,2,3,
  4,5,6,
  7,8,9
])


matrix.elements // [1,2,3,4,5,6,7,8,9]
matrix.size // 9

const eight = matrix.getElement(3, 2) // 8
const outOfRange = matrix.getElement(5, 5) // error!


const sourceMatrix = Matrix.Create(5, 5, [
  1,  2,  3,  4,  5,
  6,  7,  8,  9,  10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20
])

const center = sourceMatrix.getElement(3, 4) // 14

// Gets the elements around a given row and column and returns the matrix.
const localMatrix = Matrix.GetLocalMatrix(sourceMatrix, 3, 4)

localMatrix
// [
//    8,  9,  10,
//    13, 14, 15,
//    18, 19, 20
// ]
```

```typescript
// Matrix scalar product
import { Matrix } from 'coord-matrix2d'

const matrix = Matrix.Create(3, 3, [
  1, 1, 1,
  2, 2, 2,
  3, 3, 3
])
const scalar3 = matrix.clone.fill(3) // create same sized matrix and fill all to 3.

const result = Matrix.Mul(matrix, scalar3)
// [
//   3, 3, 3,
//   6, 6, 6,
//   9, 9, 9
// ]
```

## Install

```bash
npm i coord-matrix2d
```

or

```html
<script type="module">
  import { Matrix } from 'https://cdn.jsdelivr.net/npm/coord-matrix2d@1.x.x/dist/esm/index.js'
</script>
```

## Matrix Static functions

### `Matrix.Create<T>`(row: `number`, col: `number`, elements: `T|T[]`): `Matrix<T>`

Creates a new matrix instance with same row and col size.

### `Matrix.From2DArray<T>`(array: `T[][]`): `Matrix<T>`

Create matrix instance from 2d-array data type.

### `Matrix.Add`(a: `Matrix<number>`, b: `Matrix<number>`): `Matrix<number>`

Returns added result matrix between both matrix. It will returns `a + b`.

### `Matrix.Sub`(a: `Matrix<number>`, b: `Matrix<number>`): `Matrix<number>`

Returns subtracted result matrix between both matrix. It will returns `a - b`.

### `Matrix.Mul`(a: `Matrix<number>`, b: `Matrix<number>`): `Matrix<number>`

Returns multiplied result matrix between both matrix. It will returns `a * b`.

WARNING! This method is not product matrix. It's just a multiply each element of matrix.
If you want to product matrix, use `Prod` method.

### `Matrix.Div`(a: `Matrix<number>`, b: `Matrix<number>`): `Matrix<number>`

Returns divided result matrix between both matrix. It will returns `a / b`.
It's just a divide each element of matrix.

### `Matrix.Prod`(a: `Matrix<number>`, b: `Matrix<number>`): `Matrix<number>`

Returns multiplied result matrix between both matrix.
The matrix product must be same `a.col` and `b.row` size. If not, it will throw an error.

### `Matrix.VecDot`(a: `Matrix<number>`, b: `Matrix<number>`): `number`

Returns the scalar product results of two matrices.

WARNING! This does NOT distinguish between the rows and columns of the matrix. List all the elements of the matrix and convert it to a vector, Returns the value that adds all the elements.

### `Matrix.VecCosSim`(a: `Matrix<number>`, b: `Matrix<number>`): `number`

Calculate and return cosine similarity between the two matrices.

WARNING! This does NOT distinguish between the rows and columns of the matrix. List all the elements of the matrix and convert it to a vector, then compare the similarity.

### `Matrix.IsSameSize`(a: `Matrix<any>`, b: `Matrix<any>`): `boolean`

Returns whether the matrix has same size. It calculates with `row` and `col` properties.

### `Matrix.GetLocalMatrix<T>`(source: `Matrix<T>`, rowIndex: `number`, colIndex: `number`, row = `3`, col = `3`, fill: `any` = `null`): `Matrix<T>`

Get new matrix from part of source matrix. It returns neighbor elements from point of coordinates of source matrix.
The size of new matrix is multiple of row and column of arguments.

```typescript
const sourceMatrix = Matrix.Create(5, 5, [
  1,  2,  3,  4,  5,
  6,  7,  8,  9,  10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20
])

const center = sourceMatrix.getElement(3, 4) // 14

// Gets the elements around a given row and column and returns the matrix.
const localMatrix = Matrix.GetLocalMatrix(sourceMatrix, 3, 4)

localMatrix.elements
// [
//    8,  9,  10,
//    13, 14, 15,
//    18, 19, 20
// ]
```

## Instance methods

### `getRowElements`(index: `number`): `T[]`

Returns all elements in matrix's row vector as array.

### `getColElements`(index: `number`): `T[]`

Returns all elements in matrix's column vector as array.

### `getIndex`(rowIndex: `number`, colIndex: `number`): `number`

Get elements index of `matrix.elements` property with calculates row and column.

### `setElement`(rowIndex: `number`, colIndex: `number`, element: `T`): `void`

Sets element for matrix.

### `getRowIndex`(elOffset: `number`): `number`

Returns row index of matrix from calculated with element index.

### `getColIndex`(elOffset: `number`): `number`

Returns column index of matrix of calculated with element index.

### `reachable`(rowIndex: `number`, colIndex: `number`): `boolean`

Returns whether the positions of rows and columns are within the range of the current matrix.
If the position is within the range of the matrix, it returns `true`. Otherwise, it returns `false`.
You can use this method to get element safely.

```typescript
if (matrix.reachable(rowIndex, colIndex)) {
  const element = matrix.getElement(rowIndex, colIndex)
}
```

### `getElement`(rowIndex: `number`, colIndex: `number`): `T`

Returns element what you find in point of coordinates in matrix.

### `fill`(element: `T`): `this`

Fill matrix with a element.
It is useful with `Matrix.Add`, `Matrix.Sub`, `Matrix.Mul`, `Matrix.Div` like methods.

```typescript
const mat = Matrix.Create(3, 3, [1,2,3,4,5,6,7,8,9])
const result = Matrix.Mul(mat, mat.clone.fill(3))
```

### `as2DArray`(): `T[][]`

Returns all elements in matrix as 2d-array data type.

## Instance properties

### `(getter) clone: Matrix<T>`

Returns a clone of matrix.

### `(getter) magnitude: number`

Returns a length of matrix. This follows the calculation of Euclidean norm.

### `row: number`

The row size of matrix

### `col: number`

The column size of matrix.

### `size: number`

The elements length of matrix. It's NOT magnitude of matrix.

### `elements: T[]`

All of matrix's elements.
## License

MIT license
