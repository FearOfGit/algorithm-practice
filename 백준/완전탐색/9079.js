const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let T = +input[0];
let index = 1;
let board;
let visited;
let answer;
let str = "";

while (T-- > 0) {
  board = Array.from({ length: 3 }, () => Array(3));
  visited = Array(8).fill(false);
  answer = Infinity;

  // 1, 2, 3
  // 4, 5, 6
  // i - index
  for (let i = index; i < index + 3; i++) {
    const temp = input[i].trim().split(" ");
    for (let j = 0; j < 3; j++) {
      board[i - index][j] = temp[j];
    }
  }

  dfs(0);
  str += answer === Infinity ? -1 : answer;
  str += "\n";

  index += 3;
}

console.log(str);

function dfs(cnt) {
  const arr = [].concat(...board);
  const target = arr[0];
  const len = arr.filter((el) => el === target).length;

  if (len === 9) {
    answer = Math.min(answer, cnt);
    return;
  }

  for (let i = 0; i < 8; i++) {
    if (visited[i]) continue;

    if (i === 0 || i === 1 || i === 2) {
      for (let j = 0; j < 3; j++) board[i][j] = board[i][j] === "T" ? "H" : "T";
      visited[i] = true;
      dfs(cnt + 1);
      for (let j = 0; j < 3; j++) board[i][j] = board[i][j] === "T" ? "H" : "T";
      visited[i] = false;
    } else if (i === 3 || i === 4 || i === 5) {
      for (let j = 0; j < 3; j++)
        board[j][i - 3] = board[j][i - 3] === "T" ? "H" : "T";
      visited[i] = true;
      dfs(cnt + 1);
      for (let j = 0; j < 3; j++)
        board[j][i - 3] = board[j][i - 3] === "T" ? "H" : "T";
      visited[i] = false;
    } else if (i === 6) {
      let x = 0;
      let y = 0;

      for (let j = 0; j < 3; j++) {
        board[x][y] = board[x][y] === "T" ? "H" : "T";
        x += 1;
        y += 1;
      }
      visited[i] = true;
      dfs(cnt + 1);
      for (let j = 0; j < 3; j++) {
        x -= 1;
        y -= 1;
        board[x][y] = board[x][y] === "T" ? "H" : "T";
      }
      visited[i] = false;
    } else {
      board[0][2] = board[0][2] === "T" ? "H" : "T";
      board[1][1] = board[1][1] === "T" ? "H" : "T";
      board[2][0] = board[2][0] === "T" ? "H" : "T";
      visited[7] = true;
      dfs(cnt + 1);
      board[0][2] = board[0][2] === "T" ? "H" : "T";
      board[1][1] = board[1][1] === "T" ? "H" : "T";
      board[2][0] = board[2][0] === "T" ? "H" : "T";
      visited[7] = false;
    }
  }
}

/*
  - 문제를 보자마자 순열 알고리즘으로 풀어야겠다고 생각했다. 
  - 그런데 한번의 dfs에서 8가지 케이스를 각각 구현해야 하는 엄청난 노가다가 요구되는 문제였다. (최대한 중복을 제거하려 노력했다.)
  - 이 문제의 핵심은 예를 들어 1행을 첫번째 dfs에서 뒤집는 경우랑 3번째 dfs에서 뒤집는 경우랑 결과가 다르다는 것이다. (그래서 순열 알고리즘으로 구현)
  - 인터넷에 찾아보니까 비트마스킹으로 구현하는 방법도 있는듯 하다.
*/
