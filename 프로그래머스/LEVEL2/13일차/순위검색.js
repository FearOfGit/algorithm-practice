function solution(info, query) {
  var answer = [];
  let map = {};
  function combination(infos, score, start) {
    let key = infos.join('');
    if (!map[key]) map[key] = [];
    map[key].push(score);

    for (let i = start; i < infos.length; i++) {
      let temp = [...infos];
      temp[i] = '-';

      combination(temp, score, i + 1);
    }
  }

  function binarySearch(arr, score) {
    if (arr) {
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] >= score) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      return arr.length - right - 1;
    }

    return 0;
  }
  for (let row of info) {
    let infos = row.split(' ');
    let score = infos.pop();

    combination(infos, score, 0);
  }

  for (let key in map) {
    map[key].sort((a, b) => a - b);
  }

  for (let i = 0; i < query.length; i++) {
    let querys = query[i].replace(/ and /g, '').split(' ');
    let score = Number(querys.pop());
    let key = querys.join('');
    answer.push(binarySearch(map[key], score));
  }
  return answer;
}
