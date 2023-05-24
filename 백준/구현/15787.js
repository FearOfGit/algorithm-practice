const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const train = Array.from({ length: N }, () => Array(20).fill(0));
const command = [];
const set = new Set();

for (let i = 1; i <= M; i++) {
  const [a, b, c] = input[i].split(" ").map((el) => +el);

  command.push([a, b, c]);
}

for (const [type, i, x] of command) {
  if (type === 1) {
    train[i - 1][x - 1] = 1;
  } else if (type === 2) {
    train[i - 1][x - 1] = 0;
  } else if (type === 3) {
    for (let j = 19; j >= 1; j--) {
      train[i - 1][j] = train[i - 1][j - 1];
    }
    train[i - 1][0] = 0;
  } else if (type === 4) {
    for (let j = 0; j <= 18; j++) {
      train[i - 1][j] = train[i - 1][j + 1];
    }
    train[i - 1][19] = 0;
  }
}

for (const target of train) {
  const str = target.join("");

  set.add(str);
}

console.log(set.size);

/*
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
*/
