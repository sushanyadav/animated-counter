function intlFormat(num: number) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

export function makeFriendly(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
}
