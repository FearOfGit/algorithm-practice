function solution(relation) {
  let answer = 0;
  const colNum = relation[0].length;

  // 1. 조합 구하기
  let indexes = new Array(colNum).fill(0).map((_, i) => i);
  let colCom = [];
  for (let i = 0; i < colNum; i++) {
    colCom.push(...combination(indexes, i + 1));
  }

  // 2. 유일성, 최소성 확인하기
  while (colCom.length > 0) {
    const columns = colCom.shift().split('');
    const tuple = relation.map((row) => columns.map((col) => row[col]));

    if (isUnique(tuple)) {
      answer++;

      const colComTmp = [];
      for (let i = 0; i < colCom.length; i++) {
        columns.map((col) => {
          if (!colCom[i].includes(col)) {
            colComTmp.push(colCom[i]);
          }
        });
      }
      colCom = [...colComTmp];
    }
  }
  return answer;
}

function combination(elements, k) {
  let prev = [];
  let results = [];

  function dfs(elements, k, start) {
    if (prev.length >= k) {
      const temp = [...prev].join('');
      results.push(temp);
      return;
    }

    for (let i = start; i < elements.length; i++) {
      prev.push(elements[i]);
      dfs(elements, k, i + 1);
      prev.pop();
    }
  }

  dfs(elements, k, 0);

  return results;
}

function isUnique(tuple) {
  const tmp = tuple.map((item) => item.join(''));
  const set = new Set(tmp);

  return tmp.length === set.size ? true : false;
}
