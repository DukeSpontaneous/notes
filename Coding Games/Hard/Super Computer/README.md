Описание решения задачи "Super Computer"
Ссылка: https://www.codingame.com/ide/puzzle/super-computer

## Исходные данные

```JavaScript
// N - число конкурирующих вычислений
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
  // J - день начала, D - продолжительность
  const [J, D] = readline().split(' ').map(str => parseInt(str));
}

console.log('максимальное число выполненных вычислений');
```

## Варианты решений

- [Сортировка по дате завершения](#sorting)

## Сортировка по дате завершения

Хотя это и не очень очевидно, но в задача может быть решена через последовательный отбор Вычислений,
которые завершаются раньше, чем другие.

Для этого достаточно отсортировать массив Вычислений по дате завершения `J + D - 1`,
после чего можно последовательно добавлять в набор очередное Вычисление с подходящей датой начала `J`.

Таким образом мы получаем достаточно простой и компактный код:
```JavaScript
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
```