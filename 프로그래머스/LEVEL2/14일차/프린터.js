function solution(priorities, location) {
  const queue = priorities.map((v, i) => [v, i]);
  let time = 0;

  while (queue.length) {
    let max = getMax(queue);
    let cur = queue.shift();

    if (cur[0] >= max) {
      time++;
      if (cur[1] === location) break;
    } else {
      queue.push(cur);
    }
  }

  return time;
}

function getMax(target) {
  const arr = target.map((v) => v[0]);

  return Math.max(...arr);
}
