import md5 from "md5";
const salt = "hkujhyasuiodhf";

export function hash(plainPassword: string) {
  return md5(md5(plainPassword) + salt);
}

export function verify(hashstr: string, plainPassword: string) {
  return hashstr === hash(plainPassword);
}
