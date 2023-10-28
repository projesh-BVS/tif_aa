const dimensionUnits = [
  { id: 1, display: "Millimeters", apiVal: "mm" },
  { id: 2, display: "Centimeters", apiVal: "cm" },
  { id: 3, display: "Meters", apiVal: "m" },
  { id: 4, display: "Inches", apiVal: "in" },
  { id: 5, display: "Feet", apiVal: "ft" },
];

const weightUnits = [
  { id: 1, display: "Milligrams", apiVal: "mg" },
  { id: 2, display: "Grams", apiVal: "g" },
  { id: 3, display: "Kilograms", apiVal: "kg" },
  { id: 4, display: "Metric Tons", apiVal: "mt" },
];

const currCodes = [
  { id: 1, display: "United States Dollar (USD)", apiVal: "usd" },
  { id: 2, display: "Euro (EUR)", apiVal: "eur" },
  { id: 3, display: "Japanese Yen (JPY)", apiVal: "jpy" },
  { id: 4, display: "British Pound Sterling (GBP)", apiVal: "gbp" },
  { id: 5, display: "Australian Dollar (AUD)", apiVal: "aud" },
  { id: 6, display: "Canadian Dollar (CAD)", apiVal: "cad" },
  { id: 7, display: "Swiss Franc (CHF)", apiVal: "chf" },
  { id: 8, display: "Chinese Yuan (CNY)", apiVal: "cny" },
  { id: 9, display: "Indian Rupee (INR)", apiVal: "inr" },
  { id: 10, display: "Brazilian Real (BRL)", apiVal: "brl" },
  { id: 11, display: "South Korean Won (KRW)", apiVal: "krw" },
  { id: 12, display: "Russian Ruble (RUB)", apiVal: "rub" },
  { id: 13, display: "Mexican Peso (MXN)", apiVal: "mxn" },
  { id: 14, display: "Singapore Dollar (SGD)", apiVal: "sgd" },
  { id: 15, display: "Hong Kong Dollar (HKD)", apiVal: "hkd" },
  { id: 16, display: "South African Rand (ZAR)", apiVal: "zar" },
  { id: 17, display: "New Zealand Dollar (NZD)", apiVal: "nzd" },
  { id: 18, display: "Swedish Krona (SEK)", apiVal: "sek" },
  { id: 19, display: "Norwegian Krone (NOK)", apiVal: "nok" },
  { id: 20, display: "Danish Krone (DKK)", apiVal: "dkk" },
];

export function getDimensionUnits() {
  return dimensionUnits;
}

export function getWeightUnits() {
  return weightUnits;
}

export function getCurrencyUnits() {
  return currCodes;
}
