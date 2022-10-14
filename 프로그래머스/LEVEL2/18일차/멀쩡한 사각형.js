const greatest = (a, b) => {
  if (b == 0) return a;
  return greatest(b, a % b);
};

function solution(w, h) {
  return w * h - (w + h - greatest(w, h));
}
