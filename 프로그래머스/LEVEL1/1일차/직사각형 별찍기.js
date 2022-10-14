process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const n = data.split(' ');
  const a = Number(n[0]),
    b = Number(n[1]);
  process.stdout.write(('*'.repeat(a) + '\n').repeat(b));
});
// repeat 함수
