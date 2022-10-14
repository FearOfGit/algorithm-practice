function solution(arr1, arr2) {
  const row = arr1.length;
  const col = arr1[0].length;

  const answer = [];
  for (let i = 0; i < row; i++) {
    let temp = [];
    for (let j = 0; j < col; j++) {
      let t = arr1[i][j] + arr2[i][j];
      temp.push(t);
    }
    answer.push(temp);
  }
  return answer;
}
