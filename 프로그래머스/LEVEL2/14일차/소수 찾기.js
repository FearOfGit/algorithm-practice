function solution(numbers) {
  const answer = [];
  const arr = numbers.split('');
  const visited = new Array(numbers.length).fill(false);
  const prev = [];

  function dfs() {
    if (prev.length) {
      let target = Number([...prev].join(''));
      if (isPrime(target)) answer.push(target);
    }

    for (let i = 0; i < arr.length; i++) {
      if (visited[i]) continue;
      prev.push(arr[i]);
      visited[i] = true;
      dfs();
      visited[i] = false;
      prev.pop();
    }
  }
  dfs();
  return [...new Set(answer)].length;
}

function isPrime(target) {
  if (target === 1 || target === 0) return false;

  for (let i = 2; i < target; i++) {
    if (target % i === 0) return false;
  }

  return true;
}
