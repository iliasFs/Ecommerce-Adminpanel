//function to correctly format our price in USD and the right decimals,comas etc

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export default function priceFormat(price: number) {
  return CURRENCY_FORMATTER.format(price);
}


1100 --> 1,100$



