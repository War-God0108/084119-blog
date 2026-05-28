export function getReadingTime(text: string): number {
  const cjkChars = (text.match(/[一-鿿㐀-䶿]/g) || []).length;
  const words = (text.match(/[a-zA-Z0-9]+/g) || []).length;
  const minutes = Math.ceil(cjkChars / 400 + words / 250);
  return Math.max(1, minutes);
}
