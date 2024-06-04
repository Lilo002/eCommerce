import { LineItem, TypedMoney } from '@commercetools/platform-sdk';

export const getPrice = (price: TypedMoney | undefined): string => {
  if (!price) {
    return '';
  }
  const { centAmount, currencyCode, fractionDigits } = price;
  return `${(centAmount / 100).toFixed(fractionDigits)} ${currencyCode}`;
};

export const getPlayers = (minPlayers: number, maxPlayers: number): string => {
  if (minPlayers === maxPlayers) {
    return `${minPlayers}`;
  }
  return `${minPlayers} - ${maxPlayers}`;
};

export const getRoundedNumber = (intNumber: number): number => Math.round(intNumber * 10) / 10;

export const findLineItemId = (lineItems: LineItem[], productId: string): string | undefined => {
  const lineItem = lineItems.find((item) => item.productId === productId)?.id;
  return lineItem;
};
