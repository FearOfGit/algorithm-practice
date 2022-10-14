function solution(places) {
  const answer = [];
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const cx = [1, 1, -1, -1];
  const cy = [-1, 1, -1, 1];

  places.map((place) => {
    let flag = false;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (place[y][x] === 'P') {
          for (let k = 0; k < 4; k++) {
            let nx = x + dx[k];
            let ny = y + dy[k];

            if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;
            if (place[ny][nx] === 'X') continue;
            if (place[ny][nx] === 'P') {
              flag = true;
              break;
            }

            nx = nx + dx[k];
            ny = ny + dy[k];
            if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;
            if (place[ny][nx] === 'P') {
              flag = true;
              break;
            }
          }
          if (flag) break;
          for (let k = 0; k < 4; k++) {
            let nx = x + cx[k];
            let ny = y + cy[k];

            if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;
            if (place[ny][nx] === 'P') {
              if (
                y < ny &&
                (place[y + 1][x] !== 'X' || place[ny - 1][nx] !== 'X')
              ) {
                flag = true;
                break;
              }
              if (
                y > ny &&
                (place[y - 1][x] !== 'X' || place[ny + 1][nx] !== 'X')
              ) {
                flag = true;
                break;
              }
            }
          }
          if (flag) break;
        }
      }
      if (flag) break;
    }
    if (flag) answer.push(0);
    else answer.push(1);
  });

  return answer;
}
