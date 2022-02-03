//참고 : https://brocante.dev/ko/questions/105034
export function uuidv4() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // time_hi_and_version 필드의 비트 12-15를 0010으로
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1); // clock_seq_hi_and_reserved의 비트 6-7은 01로 예약 됨
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid;
}
