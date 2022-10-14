// 노래의 제목을 출력한다. -> title
// 전체 멜로디 -> stream
// 실행시간 -> runtime
function solution(m, musicinfos) {
  const arr = musicinfos.map((info) => {
    const [start, end, title, code] = info.split(',');
    // 재생 시간 구하기
    const hour = end.slice(0, 2) - start.slice(0, 2);
    const minute = end.slice(3) - start.slice(3);
    const runtime = hour * 60 + minute;

    // 전체 재생 멜로디 생성
    const codeArr = code.match(/[A-Z]#?/g);
    let stream = code.repeat(Math.floor(runtime / codeArr.length));
    stream += codeArr.slice(0, runtime % codeArr.length).join('');

    return [title, runtime, stream];
  });

  const answer = arr.filter(([_, __, stream]) => {
    let i = stream.indexOf(m);
    if (i === -1) return false;
    // 한번 더 체크! (ABC# - ABC)
    while (i !== -1) {
      if (stream[i + m.length] !== '#') return true;
      i = stream.indexOf(m, i + 1);
    }
  });
  if (!answer.length) return '(None)';

  answer.sort((a, b) => b[1] - a[1]);
  return answer[0][0];
}
