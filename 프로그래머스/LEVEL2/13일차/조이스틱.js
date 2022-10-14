function solution(name) {
  let answer = 0;
  let moves = name.length - 1;

  for (let i = 0; i < name.length; i++) {
    let target = name.charCodeAt(i);
    answer += Math.min(
      target - 'A'.charCodeAt(),
      'Z'.charCodeAt() - target + 1
    );

    let index = i + 1;
    while (index < name.length && name[index] === 'A') index++;

    // *2 는 갔다 돌아오는 것을 고려
    moves = Math.min(moves, i * 2 + name.length - index);
    moves = Math.min(moves, (name.length - index) * 2 + i);
  }
  return answer + moves;
}
