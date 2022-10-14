function solution(line) {
  const getIntersectionPoint = () => {
    let points = [];

    for (let i = 0, len = line.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const [a, b, e] = line[i];
        const [c, d, f] = line[j];

        const slope = a * d - b * c;

        if (slope) {
          const pointX = (b * f - e * d) / slope;
          const pointY = (e * c - a * f) / slope;

          if (Number.isInteger(pointX) && Number.isInteger(pointY)) {
            points.push([pointX, pointY]);
          }
        }
      }
    }

    return points;
  };

  const drawingStar = (points) => {
    const [maxX, maxY, minX, minY] = points.reduce(
      ([maxX, maxY, minX, minY], [x, y]) => [
        Math.max(maxX, x),
        Math.max(maxY, y),
        Math.min(minX, x),
        Math.min(minY, y),
      ],
      [
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      ]
    );

    let board = Array.from(Array(maxY - minY + 1), () =>
      Array(maxX - minX + 1).fill('.')
    );

    points.forEach(([x, y]) => {
      board[maxY - y][x - minX] = '*';
    });

    return board.map((x) => x.join(''));
  };

  return drawingStar(getIntersectionPoint());
}
