// 노드 생성자 함수
function Node(idx) {
  this.idx = idx;
  this.prev = null;
  this.next = null;
}

function solution(n, k, cmd) {
  const answer = Array(n).fill('O');

  // 1. 노드 생성
  let root = new Node(0);
  let current = root;
  let prev = root;
  for (let i = 1; i < n; i++) {
    const newNode = new Node(i);
    newNode.prev = prev;
    prev.next = newNode;
    prev = newNode;

    if (i === k) {
      current = newNode;
    }
  }

  // 2. cmd 연산 수행
  const stack = [];
  cmd.forEach((str) => {
    const [op, num] = str.split(' ');
    let i = 0;
    if (op === 'U') {
      while (i < num && current.prev) {
        current = current.prev;
        i++;
      }
    } else if (op === 'D') {
      while (i < num && current.next) {
        current = current.next;
        i++;
      }
    } else if (op === 'C') {
      stack.push(current);
      const prev = current.prev;
      const next = current.next;
      if (prev && next) {
        prev.next = next;
        next.prev = prev;
        current = next;
      } else if (prev) {
        prev.next = null;
        current = prev;
      } else if (next) {
        next.prev = null;
        current = next;
      }
    } else {
      const temp = stack.pop();
      const prev = temp.prev;
      const next = temp.next;
      if (prev) {
        prev.next = temp;
      }
      if (next) {
        next.prev = temp;
      }
    }
  });

  // 3. 정답 계산
  stack.forEach((node) => {
    answer[node.idx] = 'X';
  });
  return answer.join('');
}
