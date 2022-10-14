function solution(str1, str2) {
  var answer = 0;
  function make(text) {
    const result = [];

    for (let i = 0; i < text.length - 1; i++) {
      const temp = text.substr(i, 2);
      if (temp.match(/[A-Za-z]{2}/)) {
        result.push(temp.toLowerCase());
      }
    }

    return result;
  }

  let arr1 = make(str1);
  let arr2 = make(str2);
  let set = new Set([...arr1, ...arr2]);
  let union = 0;
  let intersection = 0;

  set.forEach((item) => {
    let has1 = arr1.filter((el) => el === item).length;
    let has2 = arr2.filter((el) => el === item).length;

    union += Math.max(has1, has2);
    intersection += Math.min(has1, has2);
  });

  return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
}
