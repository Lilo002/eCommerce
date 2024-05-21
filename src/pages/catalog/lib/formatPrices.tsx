export const formatPrices = (prices: number | undefined, fractionDigits: number | undefined) => {
  if (prices && fractionDigits) {
    return (prices / 10 ** fractionDigits).toFixed(fractionDigits).replace('.', ',');
  }

  return 0;
};
