function solution(enroll, referral, seller, amount) {
  const map = {};
  const graph = {};
  for (let i = 0; i < enroll.length; i++) {
    graph[enroll[i]] = referral[i];
    map[enroll[i]] = 0;
  }

  function dfs(name, money) {
    if (name === '-') return;

    let one = Math.floor(money * 0.1);
    let nine = money - one;

    if (one < 1) {
      map[name] += money;
      return;
    }

    map[name] += nine;
    dfs(graph[name], one);
  }

  for (let i = 0; i < seller.length; i++) {
    let name = seller[i];
    let money = amount[i] * 100;

    dfs(name, money);
  }

  let answer = [];
  for (let i = 0; i < enroll.length; i++) {
    answer.push(map[enroll[i]]);
  }
  return answer;
}
