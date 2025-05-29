export function truncateText(text: string, maxLength: number = 25) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength - 1).trimEnd();
  return truncated + '…';
}
