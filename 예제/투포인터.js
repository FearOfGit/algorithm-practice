// function solution(n, arr) {
//   let answer = 0;

//   for (let i = 0; i < arr.length; i++) {
//     let sum = 0;
//     for (let j = i; j < arr.length; j++) {
//       sum += arr[j];
//       if (sum > n) break;
//       else if (sum === 5) {
//         answer++;
//         sum = 0;
//         break;
//       }
//     }
//   }

//   return answer;
// }

function solution(n, arr) {
  let answer = 0;
  let sum = 0;
  let end = 0;

  for (let start = 0; start < arr.length; start++) {
    while (sum < n && end < arr.length) {
      sum += arr[end];
      end++;
    }
    if (sum === n) answer++;
    sum -= arr[start];
  }

  return answer;
}
console.log(solution(5, [1, 2, 3, 2, 5]));
