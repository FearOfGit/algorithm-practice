const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0]; // 카드의 개수
const answer = input[1].split(" ").map(Number); // 비교할 최종 결과
let card;

// 완전 탐색으로 2개의 k를 구한다.
for (let i = 1; Math.pow(2, i) < N; i++) {
  for (let j = 1; Math.pow(2, j) < N; j++) {
    card = Array.from({ length: N }, (_, i) => i + 1);

    shuffle(i);
    shuffle(j);
    let cnt = 0;

    for (let k = 0; k < N; k++) {
      if (card[k] !== answer[k]) break;
      cnt += 1;
    }

    if (cnt === N) {
      console.log(i, j);
      return;
    }
  }
}

function shuffle(k) {
  let range = N;
  for (let i = 1; i <= k + 1; i++) {
    const count = Math.pow(2, k - i + 1);
    const newCard = Array(N + 1);
    let idx = 0;

    /*
      큐를 사용하지 않고 구현하기
      range = 5, count = 4 -> 1 ~ 4
      newCard : [2, 3, 4, 5]
      card : [1, 0, 0, 0, 0]
    */
    for (let j = range - count; j < range; j++) {
      newCard[idx++] = card[j];
      card[j] = 0;
    }
    for (let j = 0; j < N; j++) {
      if (card[j] !== 0) {
        newCard[idx++] = card[j];
      }
      card[j] = newCard[j];
    }

    range = count; // 변경이 일어난 카드의 개수로 변경
  }
}

/*
  - 완전 탐색으로 2개의 k값을 찾는 컨셉 자체는 쉬웠는데 카드를 섞을 때 큐를 사용하지 않고 구현하는 방식이 까다로웠다.
  - range(카드를 뺄 수 있는 범위), count(빼야되는 개수)를 통해 섞을 범위를 정해준다.
  - 해당 범위에 속하는 모든 카드를 새로운 카드 배열에 옮겨주고 해당 위치는 0으로 설정한다.
  - 다시 새로운 카드 배열에 있는 값을 기존 카드 배열로 옮겨준다.
*/
