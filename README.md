# coord-matrix2d

The two-dimensional matrix resembling a Cartesian coordinate system

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

## License

MIT license
