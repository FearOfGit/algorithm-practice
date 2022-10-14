function solution(numbers, hand) {
  let answer = '';
  const map = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    '*': [3, 0],
    0: [3, 1],
    '#': [3, 2],
  };

  let left = '*';
  let right = '#';

  numbers.map((num) => {
    if (num === 1 || num === 4 || num === 7) {
      answer += 'L';
      left = num;
    } else if (num === 3 || num === 6 || num === 9) {
      answer += 'R';
      right = num;
    } else {
      const left_Distance =
        Math.abs(map[left][0] - map[num][0]) +
        Math.abs(map[left][1] - map[num][1]);
      const right_Distance =
        Math.abs(map[right][0] - map[num][0]) +
        Math.abs(map[right][1] - map[num][1]);

      if (left_Distance === right_Distance) {
        if (hand === 'right') {
          answer += 'R';
          right = num;
        } else {
          answer += 'L';
          left = num;
        }
      } else if (left_Distance > right_Distance) {
        answer += 'R';
        right = num;
      } else {
        answer += 'L';
        left = num;
      }
    }
  });
  return answer;
}
