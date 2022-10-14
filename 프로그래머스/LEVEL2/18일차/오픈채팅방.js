function solution(record) {
  const answer = [];
  const len = record.length - 1;
  const map = {};

  for (let i = len; i >= 0; i--) {
    const [action, id, nick] = record[i].split(' ');

    if (!map[id]) {
      map[id] = nick;
    }
  }

  for (let i = 0; i <= len; i++) {
    const [action, id, nick] = record[i].split(' ');
    let temp = '';

    if (action === 'Enter') {
      temp = `${map[id]}님이 들어왔습니다.`;
    } else if (action === 'Leave') {
      temp = `${map[id]}님이 나갔습니다.`;
    } else {
      continue;
    }

    answer.push(temp);
  }
  return answer;
}
