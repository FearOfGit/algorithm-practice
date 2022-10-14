// 톱니 바퀴

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const status = [];
input = input.map((el) => el.trim());
for (let i = 0; i < 4; i++) {
  const temp = input
    .shift()
    .split('')
    .map((el) => +el);
  status.push(temp);
}
input.shift();
const command = input.map((el) => el.split(' ').map((el) => +el));
status.unshift([0]);

solution();

function solution() {
  command.forEach(([no, dir]) => {
    let left = status[no][6];
    let right = status[no][2];
    rotate(no, dir);

    let r = dir * -1;
    for (let i = no - 1; i > 0; i--) {
      if (status[i][2] === left) break;
      left = status[i][6];
      rotate(i, r);
      r *= -1;
    }

    r = dir * -1;
    for (let i = no + 1; i <= 4; i++) {
      if (status[i][6] === right) break;
      right = status[i][2];
      rotate(i, r);
      r *= -1;
    }
  });

  let answer = 0;
  for (let i = 1; i <= 4; i++) {
    if (status[i][0] === 1) {
      answer += Math.pow(2, i - 1);
    }
  }

  console.log(answer);
}

function rotate(no, dir) {
  const temp = Array.from({ length: 4 }, () => new Array(8).fill(-1));
  if (dir === 1) {
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        temp[i] = status[no][7];
      } else {
        temp[i] = status[no][i - 1];
      }
    }
  } else {
    for (let i = 0; i < 8; i++) {
      if (i === 7) {
        temp[i] = status[no][0];
      } else {
        temp[i] = status[no][i + 1];
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    status[no][i] = temp[i];
  }
}
