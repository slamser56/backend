function getExpiredTime(): number {
  return Math.floor(Date.now() / 1000) + (60 * 60 * 24);
}
export default getExpiredTime;
