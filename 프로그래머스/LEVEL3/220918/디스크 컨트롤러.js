function solution(jobs) {
  let answer = 0;
  let j = 0;
  let time = 0;
  jobs.sort((a, b) => a[0] - b[0]);

  const queue = [];
  while (j < jobs.length || queue.length) {
    if (jobs.length > j && time >= jobs[j][0]) {
      queue.push(jobs[j++]);
      queue.sort((a, b) => a[1] - b[1]);
      continue;
    }

    if (queue.length !== 0) {
      time += queue[0][1];
      answer += time - queue[0][0];
      queue.shift();
    } else {
      time = jobs[j][0];
    }
  }

  return Math.floor(answer / jobs.length);
}
