function solution(n, costs) {
  let answer = 0;
  const parent = [];
  for (let i = 0; i < n; i++) {
    parent[i] = i;
  }

  costs.sort((a, b) => a[2] - b[2]);

  costs.forEach((cost) => {
    if (!findParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      unionParent(parent, cost[0], cost[1]);
    }
  });

  return answer;
}

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

function findParent(parent, a, b) {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);
  if (n1 === n2) return true;
  else return false;
}

function unionParent(parent, a, b) {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);
  if (n1 < n2) parent[n2] = n1;
  else parent[n1] = n2;
}
