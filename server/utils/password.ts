import md5 from "md5";
const salt = "hkujhyasuiodhf";

export async function hash(plainPassword: string) {
  return md5(md5(plainPassword) + salt);
}

export async function verify(hash: string, plainPassword: string) {
  return;
}
