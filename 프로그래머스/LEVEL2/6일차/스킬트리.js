function solution(skill, skill_trees) {
  let answer = 0;
  const trees = skill_trees.map((v) => v.split(''));

  for (let arr of trees) {
    arr = arr.filter((v) => skill.includes(v));

    let flag = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== skill[i]) flag = false;
    }

    if (flag) answer++;
  }
  return answer;
}
