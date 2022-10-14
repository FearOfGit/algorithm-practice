// 열쇠 배열 오른쪽으로 90도 회전
const rotationKey = (key) => {
  const len = key.length;
  const ret = Array.from(Array(len), () => Array(len).fill(null));
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      ret[i][j] = key[len - j - 1][i];
    }
  }
  return ret;
};

//답인지 검사하는 함수
const isAnswer = (newLock, len) => {
  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      if (newLock[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
};
const solution = (key, lock) => {
  const len = lock.length;
  const arr = Array.from(Array(len * 3), () => Array(len * 3).fill(null));
  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      arr[i][j] = lock[i - len][j - len];
    }
  }

  for (let rotate = 0; rotate < 4; rotate++) {
    key = rotationKey(key);

    for (let i = 0; i <= arr.length - key.length; i++) {
      for (let j = 0; j <= arr.length - key.length; j++) {
        const newLock = arr.map((v) => [...v]);

        for (let m = 0; m < key.length; m++) {
          for (let n = 0; n < key.length; n++) {
            if (newLock[i + m][j + n] === 1 && key[m][n] === 1) {
              newLock[i + m][j + n] = 2;
            } else if (newLock[i + m][j + n] === 1 && key[m][n] === 0) {
              newLock[i + m][j + n] = 1;
            } else {
              newLock[i + m][j + n] = key[m][n];
            }
          }
        }
        if (isAnswer(newLock, len)) return true;
      }
    }
  }
  return false;
};
