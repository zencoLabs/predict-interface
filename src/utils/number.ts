import { Unit } from "@cfxjs/use-wallet-react/ethereum";

export const numberFormat = (
  num: ValidNumber | null | undefined,
  decimals = 6
) => {
  if (num === null || num === undefined || num === "") return "";
  return numberWithCommas(trimDecimalZeros(truncate(num, decimals)));
};
export const trimDecimalZeros = (numStr: string | number) => {
  if (typeof numStr !== "string" && typeof numStr !== "number") {
    return numStr;
  }
  const _str = String(numStr);
  return _str.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0*$/, "");
};

export const numberWithCommas = (x: number | string) => {
  const idx = String(x ?? "").indexOf(".");
  return idx !== -1
    ? String(x ?? "")
        .slice(0, idx)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + x.toString().slice(idx)
    : String(x ?? "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const truncate = (number: ValidNumber, decimals = 6) => {
  const unit = new Unit(number);
  if (
    (unit.lessThan(new Unit(`1e-${decimals}`)) &&
      unit.greaterThanOrEqualTo(0)) ||
    (unit.greaterThan(new Unit(`-1e-${decimals}`)) && unit.lessThanOrEqualTo(0))
  )
    return "0";
  const numberString = String(number);
  const dotIndex = numberString.indexOf(".");

  if (dotIndex === -1) {
    return numberString;
  }

  const endIndex = dotIndex + decimals + 1;
  const truncatedString = numberString.substring(0, endIndex);

  if (endIndex === numberString.length) {
    return truncatedString;
  }

  if (truncatedString.endsWith("0")) {
    return truncatedString.slice(0, -1);
  }

  if (truncatedString.endsWith(".")) {
    return truncatedString.slice(0, -1);
  }

  return truncatedString;
};

export const fromDripToCfx = (num: ValidNumber) => {
  return Unit.fromMinUnit(num).toDecimalStandardUnit();
};
