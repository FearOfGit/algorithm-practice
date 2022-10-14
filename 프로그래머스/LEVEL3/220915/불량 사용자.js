function solution(user_id, banned_id) {
  const set = new Set();
  const visited = [];

  function dfs(start, count, str) {
    if (count === banned_id.length) {
      let temp = str.split(' ');
      temp.shift();
      temp.sort();
      set.add(temp.join(''));
      return;
    }

    for (let i = start; i < banned_id.length; i++) {
      for (let j = 0; j < user_id.length; j++) {
        if (visited[j]) continue;
        if (banned_id[i].length !== user_id[j].length) continue;
        if (!isValid(banned_id[i], user_id[j])) continue;
        visited[j] = true;
        dfs(i + 1, count + 1, str + ' ' + user_id[j]);
        visited[j] = false;
      }
    }
  }
  dfs(0, 0, '');
  return [...set].length;
}

function isValid(ban, user) {
  for (let i = 0; i < ban.length; i++) {
    if (ban[i] !== '*' && ban[i] !== user[i]) return false;
  }
  return true;
}
