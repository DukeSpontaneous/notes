/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis

const grid = new Array(height).fill(null)
  .map((line, y) => readline().split('') // width characters, each either 0 or .
    .map((cell, x) => ({ x, y, isNode: cell === `0` }))
  )

function getRightNeighbor(grid, { x, y }) {
  return grid[y]
    .slice(x + 1)
    .find((cell) => cell.isNode) || { x: -1, y: -1 };
}

function getBottomNeighbor(grid, { x, y }) {
  return grid
    .map((line) => line[x])
    .filter((cell) => cell.y > y)
    .find((cell) => cell.isNode) || { x: -1, y: -1 };
}

grid.forEach((line, y) => {
  line
    .filter((cell) => cell.isNode)
    .forEach((cell) => {
      const rNeighbor = getRightNeighbor(grid, cell);
      const bNeighbor = getBottomNeighbor(grid, cell);

      // Write an action using console.log()
      // To debug: console.error('Debug messages...');

      // Three coordinates: a node, its right neighbor, its bottom neighbor
      console.log(`${cell.x} ${cell.y} ${rNeighbor.x} ${rNeighbor.y} ${bNeighbor.x} ${bNeighbor.y}`);
    });
})