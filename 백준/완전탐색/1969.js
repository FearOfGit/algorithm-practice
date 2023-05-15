const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const DNAs = [];
const nucles = ["A", "C", "G", "T"];
let str = "";
let distance = 0;

for (let i = 1; i <= N; i++) DNAs.push([...input[i].trim()]);

for (let i = 0; i < M; i++) {
  const cnt = [0, 0, 0, 0]; // 사전순 A, C, G, T

  for (const DNA of DNAs) {
    if (DNA[i] === "A") cnt[0] += 1;
    else if (DNA[i] === "C") cnt[1] += 1;
    else if (DNA[i] === "G") cnt[2] += 1;
    else if (DNA[i] === "T") cnt[3] += 1;
  }

  // 이렇게 간단한 방법이ㅠ
  const maxCnt = Math.max(...cnt);
  const index = cnt.indexOf(maxCnt);

  str += nucles[index];
  distance += N - maxCnt;
}

console.log(str);
console.log(distance);

/*
  Hamming Distance의 합이 가장 작은 DNA와 Hamming Distance의 합을 구한다. 만약 Hamming Distance 값이 동일하면
  사전순으로 앞서는 것을 출력한다.

  - Hamming Distance는 DNA간 같은 위치의 뉴클오티드 문자가 다른 것의 개수이다.

  - 모든 DNA의 M번 째 위치에서 가장 많이 사용된 뉴클오티드 문자를 구한다. 이렇게 하면 각 자리마다 Hamming Distance를 최소로 하는
    문자를 구할 수 있다.
*/
