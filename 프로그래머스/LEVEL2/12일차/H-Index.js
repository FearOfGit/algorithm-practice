/*
    0 1 2 3 4    
    6 5 3 1 0 
*/
function solution(citations) {
  var answer = 0;

  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    if (i < citations[i]) answer++;
  }
  return answer;
}
