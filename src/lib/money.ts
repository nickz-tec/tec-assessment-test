const DEFAULT_LOCALE = "en";

const currencyLocaleMap: Record<string, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  HKD: "en-HK",
  CNY: "zh-CN",
  JPY: "ja-JP",
  KRW: "ko-KR",
  SGD: "en-SG",
  AUD: "en-AU",
  CAD: "en-CA",
  NZD: "en-NZ",
  TWD: "zh-TW",
  MOP: "pt-MO",
  THB: "th-TH",
  PHP: "en-PH",
  MYR: "ms-MY",
  IDR: "id-ID",
  INR: "en-IN",
};

type FormatPriceOptions = Omit<
  Intl.NumberFormatOptions,
  "style" | "currency"
> & { locale?: string };

export const formatPrice = (
  amount: number,
  currencyCode: string,
  options: FormatPriceOptions = {}
): string => {
  if (!Number.isFinite(amount)) {
    return "";
  }

  const normalizedCode = currencyCode.toUpperCase();
  const locale =
    options.locale ?? currencyLocaleMap[normalizedCode] ?? DEFAULT_LOCALE;

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: normalizedCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: "code",
    ...options,
  }).format(amount);

  return formattedPrice.replace(currencyCode.toUpperCase(), "");
};
