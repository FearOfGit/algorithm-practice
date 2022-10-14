function checkFloor(answer, x, y) {
  if (
    answer.find(([a, b, c]) => a === x && b === y - 1 && c === 0) !== undefined
  ) {
    return true;
  }
  if (
    answer.find(([a, b, c]) => a === x + 1 && b === y - 1 && c === 0) !==
    undefined
  ) {
    return true;
  }
  if (
    answer.find(([a, b, c]) => a === x - 1 && b === y && c === 1) &&
    answer.find(([a, b, c]) => a === x + 1 && b === y && c === 1)
  ) {
    return true;
  }

  return false;
}

function checkCol(answer, x, y) {
  if (y === 0) {
    return true;
  }
  if (
    answer.find(([a, b, c]) => a === x && b === y - 1 && c === 0) !== undefined
  ) {
    return true;
  }
  if (
    answer.find(([a, b, c]) => a === x - 1 && b === y && c === 1) !== undefined
  ) {
    return true;
  }
  if (answer.find(([a, b, c]) => a === x && b === y && c === 1) !== undefined) {
    return true;
  }

  return false;
}

function makeFloor(answer, x, y) {
  if (checkFloor(answer, x, y)) {
    answer.push([x, y, 1]);
  }
}

function destroyFloor(answer, x, y) {
  let copyArr = [...answer];
  const index = copyArr.findIndex(([a, b, c]) => a === x && b === y && c === 1);
  copyArr.splice(index, 1);

  for (let i = 0; i < copyArr.length; i++) {
    let [a, b, isPaper] = copyArr[i];
    if (!isPaper) {
      if (!checkCol(copyArr, a, b)) {
        return false;
      }
    } else {
      if (!checkFloor(copyArr, a, b)) {
        return false;
      }
    }
  }

  return answer.splice(index, 1);
}

function makeCol(answer, x, y) {
  if (checkCol(answer, x, y)) {
    answer.push([x, y, 0]);
  }
}

function destroyCol(answer, x, y) {
  let copyArr = [...answer];
  const index = copyArr.findIndex(([a, b, c]) => a === x && b === y && c === 0);
  copyArr.splice(index, 1);

  for (let i = 0; i < copyArr.length; i++) {
    let [a, b, isPaper] = copyArr[i];
    if (!isPaper) {
      if (!checkCol(copyArr, a, b)) {
        return false;
      }
    } else {
      if (!checkFloor(copyArr, a, b)) {
        return false;
      }
    }
  }

  return answer.splice(index, 1);
}

function solution(n, build_frame) {
  let answer = [];

  for (let i = 0; i < build_frame.length; i++) {
    let [x, y, isPaper, isAdding] = build_frame[i];

    if (isPaper && isAdding) {
      makeFloor(answer, x, y);
    } else if (isPaper && !isAdding) {
      destroyFloor(answer, x, y);
    } else if (!isPaper && isAdding) {
      makeCol(answer, x, y);
    } else if (!isPaper && !isAdding) {
      destroyCol(answer, x, y);
    }
  }

  return answer.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
}
