function solution(genres, plays) {
  const dic = {};
  const map = {};

  // 정렬 기준에 필요한 장르별 총 재생 횟수를 구한다.
  genres.forEach((gen, i) => {
    if (!dic[gen]) dic[gen] = 0;
    dic[gen] += plays[i];
  });

  // 1. 장르, 재생 횟수, 고유번호를 가진 객체를 생성한다.
  // 2. 객체를 정렬 기준에 맞춰 정렬한다.
  // 3. 장르별로 2개씩 노래를 선택한다.
  return genres
    .map((gen, i) => ({ genre: gen, count: plays[i], index: i }))
    .sort((a, b) => {
      if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
      if (a.count !== b.count) return b.count - a.count;
      return a.index - b.index;
    })
    .filter((v) => {
      if (map[v.genre] && map[v.genre] >= 2) return false;
      if (!map[v.genre]) map[v.genre] = 0;
      map[v.genre] += 1;
      return true;
    })
    .map((v) => v.index);
}
