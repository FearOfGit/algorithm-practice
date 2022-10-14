// 1. 진출 시점을 기준으로 오름차순
// 2. 카메라 위치를 `최소 위치 -1` 로 설정
// 3. for문을 돌면서
//    - 카메라 위치가 진입 시점보다 작으먼 진출 시점에 카메라 설치
function solution(routes) {
  let answer = 0;
  routes.sort((a, b) => {
    return a[1] - b[1];
  });
  let camera = -30001;
  for (let i = 0; i < routes.length; i++) {
    if (camera < routes[i][0]) {
      answer++;
      camera = routes[i][1];
    }
  }
  return answer;
}
