function solution(cacheSize, cities) {
  let answer = 0;
  let cache = [];

  if (cacheSize === 0) return cities.length * 5;

  cities = cities.map((city) => city.toLowerCase());

  cities.forEach((city) => {
    if (cache.length && cache.includes(city)) {
      answer += 1;
      cache = cache.filter((v) => v !== city);
      cache.push(city);
    } else if (cache.length >= cacheSize) {
      answer += 5;
      cache.shift();
      cache.push(city);
    } else {
      answer += 5;
      cache.push(city);
    }
  });
  return answer;
}
