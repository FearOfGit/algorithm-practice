// 1. 트리를 생성한다.
// 2. DFS 수행
// 3. possible 배열을 통해 이동 가능한 노드를 파악한다.
// 4. 양과 늑대의 개수가 같을 때 return 한다.

function solution(info, edges) {
  let answer = 0;
  let connectedNode = Array.from({ length: info.length }, () => []);
  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i];
    connectedNode[a].push(b);
  }

  function dfs(currentNode, sheep, wolf, possible) {
    let newPossibles = [...possible];
    let currentIndex = newPossibles.indexOf(currentNode);

    if (info[currentNode]) {
      wolf++;
    } else {
      sheep++;
    }

    answer = Math.max(answer, sheep);

    if (sheep === wolf) return;

    newPossibles.push(...connectedNode[currentNode]);
    newPossibles.splice(currentIndex, 1);

    for (const nextNode of newPossibles) {
      dfs(nextNode, sheep, wolf, newPossibles);
    }
  }

  dfs(0, 0, 0, [0]);
  return answer;
}
