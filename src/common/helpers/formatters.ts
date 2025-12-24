import { getCurrentLocale } from "./locales";

export function formatCurrency(value: string | number | null) {
  if (!value) return "0,00";

  let val;

  if (typeof value === "number") {
    val = value.toFixed(2);
  } else {
    val = value;
  }

  const numericValue = val.replace(/\D/g, "").substring(0, 20).padStart(3, "0");

  const length = numericValue.length;
  const numberPart = numericValue.slice(0, length - 2);
  const decimalPart = numericValue.slice(length - 2);

  const formattedNumber = `${numberPart}.${decimalPart}`;

  const locale = getCurrentLocale();

  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(formattedNumber));
}

export function getSeparator(separatorType: "decimal" | "group") {
  const locale = getCurrentLocale();

  const numberWithGroupAndDecimalSeparator = 1000.1;

  return Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find((part) => part.type === separatorType)?.value;
}

export const convertCurrencyStringToNumber = (value: string) => {
  const decimalSeparator = getSeparator("decimal");
  const pattern = `[^0-9${decimalSeparator}-]+`;

  const formattedString = value?.replace(new RegExp(pattern, "g"), "");
  const stringNumber = decimalSeparator ? formattedString?.replaceAll(decimalSeparator, ".") : formattedString;

  const numberResult = Number(stringNumber) || 0;

  return numberResult;
};
