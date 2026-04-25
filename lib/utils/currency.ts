const numberFormatter = new Intl.NumberFormat("en-MY", {
  maximumFractionDigits: 0,
});

export function formatMYR(amount: number) {
  return `MYR ${numberFormatter.format(amount)}`;
}
