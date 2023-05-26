const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export default function priceFormat(price: number) {
  return CURRENCY_FORMATTER.format(price).replace(/^(\D+)/, "$1 ");
}
