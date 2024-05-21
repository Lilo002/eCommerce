export const getShortText = (text: string | undefined, maxLength: number) => {
  if (!text) {
    return '...';
  }

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
