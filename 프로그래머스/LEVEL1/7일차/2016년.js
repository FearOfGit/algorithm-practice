// new Date()
// getDay()
function solution(a, b) {
  const array = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return array[new Date(`2016-${a}-${b}`).getDay()];
}
