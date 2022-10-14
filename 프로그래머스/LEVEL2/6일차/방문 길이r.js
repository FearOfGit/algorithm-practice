// 집합으로 중복을 제거한 경로를 기억하자!
function solution(dirs) {
  const map = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1],
  };
  let now = [0, 0];
  let answer = new Set();

  for (let dir of dirs) {
    let nx = now[0] + map[dir][0];
    let ny = now[1] + map[dir][1];

    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) continue;

    answer.add('' + now[0] + now[1] + nx + ny);
    answer.add('' + nx + ny + now[0] + now[1]);

    now = [nx, ny];
  }

  return [...answer].length / 2;
}
