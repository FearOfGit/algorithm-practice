function solution(arr) {
  let answer = 1;
  for (let i = 0; i < arr.length; i++) {
    answer = lcm(answer, arr[i]);
  }

  return answer;
}

// 최대공약수 - 유클리드 호제법
function gcd(a, b) {
  while (b > 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

// 최소공배수 - 두수의 곱 / 최대공약수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
