function solution(orders, course) {
  let answer = [];
  let prev_elements = [];

  function combination(arr, len, map, start) {
    if (prev_elements.length >= len) {
      let temp = [...prev_elements].sort().join('');

      if (map[temp]) {
        map[temp] += 1;
      } else {
        map[temp] = 1;
      }
      return;
    }

    for (let i = start; i < arr.length; i++) {
      prev_elements.push(arr[i]);
      combination(arr, len, map, i + 1);
      prev_elements.pop();
    }
  }

  let result = [];
  for (let i = 0; i < course.length; i++) {
    result.push({});
    for (let order of orders) {
      combination(order.split(''), course[i], result[i], 0);
    }

    let max = 0;
    let temp = result[i];
    for (let key in temp) {
      if (temp[key] > max) {
        max = temp[key];
      }
    }

    for (let key in temp) {
      if (temp[key] === max && max > 1) answer.push(key);
    }
  }

  return answer.sort();
}
