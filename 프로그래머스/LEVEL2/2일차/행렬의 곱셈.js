function solution(arr1, arr2) {
  const answer = [];

  for (let i = 0; i < arr1.length; i++) {
    let a = arr1[i];
    answer.push([]);

    for (let j = 0; j < arr2[0].length; j++) {
      let sum = 0;

      for (let k = 0; k < a.length; k++) {
        sum += a[k] * arr2[k][j];
      }

      answer[i].push(sum);
    }
  }
  return answer;
}
