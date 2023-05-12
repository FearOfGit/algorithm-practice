const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];

const tree = [];
const candidate = [];
let answer = 0;

for (let i = 1; i <= n; i++) {
  tree[i] = [];
  candidate[i] = [];
}

for (let i = 1; i < n; i++) {
  const [a, b, w] = input[i].split(" ").map(Number);

  tree[a].push([b, w]);
}

function dfs(node) {
  for (const [next, weight] of tree[node]) {
    const childWeight = weight + dfs(next);

    candidate[node].push(childWeight);
  }

  candidate[node].sort((a, b) => b - a); // 정렬

  // 자식 노드가 없는 경우
  if (candidate[node].length === 0) return 0;

  // 자식 노드가 1개인 경우
  if (candidate[node].length === 1) {
    answer = Math.max(answer, candidate[node][0]);

    return candidate[node][0];
  }

  // 자식 노드가 2개 이상인 경우
  answer = Math.max(answer, candidate[node][0] + candidate[node][1]);

  return candidate[node][0];
}

dfs(1);

console.log(answer);
