const N = parseInt(readline());

const { count } = new Array(N)
  .fill(null)
  .map(() => readline().split(' ').map(str => parseInt(str)))
  .map(([J, D]) => ({ start: J, end: J + D - 1 }))
  .sort((a, b) => a.end - b.end)
  .reduce(({ lastEnd, count }, calc) =>
    calc.start <= lastEnd ?
      { lastEnd, count } : { lastEnd: calc.end, count: count + 1 },
    { lastEnd: 0, count: 0 });

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log(count);