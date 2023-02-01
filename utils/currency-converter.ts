const CURRENCY_CONVERTER = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});

export const convert = (price: number) => CURRENCY_CONVERTER.format(price);
