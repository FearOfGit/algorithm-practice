function solution(word, pages) {
  word = word.toLowerCase(); // 대, 소문자 구분 X
  const REGEX_WORD = /[\d|\W]/; // 숫자 또는 단어 문자가 아닌 문자
  const REGEX_URL = /<a href="https:\S*"/gi; // 외부 링크
  const META_URL = 'meta property'; // 자신의 주소
  const pageInfo = new Map();

  pages.forEach((page, idx) => {
    // 1. 태그 구분하기
    const pageArr = page.split('\n');
    // 2. URL 찾기
    const urlIdx = pageArr.findIndex((el) => el.includes(META_URL));
    const pageUrl = pageArr[urlIdx].match(/"https:\S*"/gi)[0];
    // 3. body 태그 찾기
    const bodyStart = pageArr.findIndex((el) => el.includes('<body>'));
    const bodyEnd = pageArr.findIndex((el) => el.includes('</body>'));
    const body = pageArr.slice(bodyStart + 1, bodyEnd);
    const point = body
      .flatMap((str) => str.toLowerCase().split(REGEX_WORD))
      .filter((el) => el === word).length;
    // 4. 외부 링크(<a> 태그) 찾기
    const outLinks = body
      .flatMap((str) => str.match(REGEX_URL))
      .filter((e) => e)
      .map((e) => e.substr(8, e.length));

    pageInfo.set(pageUrl, { point, outLinks, idx, matchPoint: 0 });
  });

  for (const [key, value] of pageInfo) {
    const linkPoint = value.point / value.outLinks.length;

    for (const link of value.outLinks) {
      if (pageInfo.has(link)) {
        const origin = pageInfo.get(link);
        const score = origin.matchPoint
          ? origin.matchPoint + linkPoint
          : origin.point + linkPoint;
        pageInfo.set(link, { ...origin, matchPoint: score });
      }
    }
  }

  // 자신을 가리키는 링크를 갖는 다른 홈페이지가 하나라도 있는 경우
  // matchPoint는 0이 아니다.
  const answer = [];
  for (const [key, value] of pageInfo) {
    const { point, idx, matchPoint } = value;
    const finalPoint = matchPoint ? matchPoint : point;
    answer.push([idx, finalPoint]);
  }

  answer.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]));
  return answer[0][0];
}
