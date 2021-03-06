﻿Описание решения задачи "There is no Spoon - Episode 2"

Ссылка: https://www.codingame.com/ide/puzzle/there-is-no-spoon-episode-2

## Исходные данные

```JavaScript
const width = parseInt(readline()); // число ячеек по оси X 
const height = parseInt(readline()); // число ячеек по оси Y
for (let i = 0; i < height; i++) {
    const line = readline(); // строка символов; каждый либо число от 1 до 8, либо '.'
}

// Три координаты: [узел, его-правый-сосед, его-нижний-сосед]
console.log('0 0 1 0 0 1');
// Две координаты и число: узел, соседний узел, и число связей между ними.
console.log('0 0 2 0 1');
```

## Цель

Дано прямоугольно поле фиксированного размера. Некоторые ячейки поля
содержат узлы с числами в них **от 1 до 8** включительно. Эти значения
представляют количество связей, которые узел должен иметь **с соседними
узлами**. Остальные ячейки поля пусты.

Цель состоит в том, чтобы **соединить все узлы**.

## Правила

Связи должны отвечать нескольким требованиям:
 - они должны начинаться и заканчиваться в узлах;
 - они должны быть строго **горизонтальными или вертикальными**;
 - они не должны пересекать другие связи или узлы;
 - допускается **до двух связей** между узлами;
 - число связей каждого узла должно соответствовать числу на нём;
 - связи должны соединять все узлы в одну **объединённую группу**.

## Варианты решений

- [Перебор](#brute-force)

## Перебор

Жёсткие условия задачи значительно сужают возможные варианты решения.

Дополнительно исходные варианты перебора сужают узлы с максимальным числом связей и тупиковые узлы.

Итак, потребуются дополнительные функции:
1) получить все соседние узлы;
2) проверить мост на пересечение с существующими мостами;
3) проверить целостность полученной системы мостов.

Состояние системы может быть описано как набор узлов и связей между ними.

Поиск решения можно вести через перебор всех возможных комбинаций построения мостов.
Каждый узел можно описать как { t:[0-2], b:[0-2], r:[0-2], l:[0-2] }.