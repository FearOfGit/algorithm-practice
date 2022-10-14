function solution(participant, completion) {
  const map = {};

  participant.map((name) => {
    map[name] === undefined ? (map[name] = 1) : map[name]++;
  });
  completion.map((name) => {
    map[name]--;
  });

  for (const key in map) {
    if (map[key] !== 0) return key;
  }
}
