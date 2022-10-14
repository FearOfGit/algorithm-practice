function solution(progresses, speeds) {
  const answer = [];

  while (progresses.length > 0) {
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }

    let cnt = 0;
    while (progresses[0] >= 100) {
      cnt++;
      progresses.shift();
      speeds.shift();
    }

    if (cnt !== 0) answer.push(cnt);
  }

  return answer;
}
