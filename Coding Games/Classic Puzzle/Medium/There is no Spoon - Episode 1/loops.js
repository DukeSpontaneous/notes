/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis

const matrix = new Array(height).fill(null)
  .map(() => readline().split('')); // width characters, each either 0 or .

function getRightNeighbor(matrix, { x: x0, y }) {
  const line = matrix[y];
  for (let x = x0 + 1; x < line.length; ++x)
    if (line[x] === '0') return { x, y };

  return { x: -1, y: -1 };
}

function getBottomNeighbor(matrix, { x, y: y0 }) {
  for (let y = y0 + 1; y < matrix.length; ++y)
    if (matrix[y][x] === '0') return { x, y };

  return { x: -1, y: -1 };
}

for (let y = 0; y < height; ++y) {
  for (let x = 0; x < width; ++x) {
    if (matrix[y][x] === '0') {
      const rNeighbor = getRightNeighbor(matrix, { x, y });
      const bNeighbor = getBottomNeighbor(matrix, { x, y });

      // Write an action using console.log()
      // To debug: console.error('Debug messages...');

      // Three coordinates: a node, its right neighbor, its bottom neighbor
      console.log(`${x} ${y} ${rNeighbor.x} ${rNeighbor.y} ${bNeighbor.x} ${bNeighbor.y}`);
      x = (rNeighbor.x !== -1) ? rNeighbor.x - 1 : x;
    }
  }
}