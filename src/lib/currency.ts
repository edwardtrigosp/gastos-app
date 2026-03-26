export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", name: "Dólar estadounidense", locale: "en-US" },
  MXN: { code: "MXN", symbol: "$", name: "Peso mexicano", locale: "es-MX" },
  ARS: { code: "ARS", symbol: "$", name: "Peso argentino", locale: "es-AR" },
  COP: { code: "COP", symbol: "$", name: "Peso colombiano", locale: "es-CO" },
  CLP: { code: "CLP", symbol: "$", name: "Peso chileno", locale: "es-CL" },
  PEN: { code: "PEN", symbol: "S/", name: "Sol peruano", locale: "es-PE" },
  BRL: { code: "BRL", symbol: "R$", name: "Real brasileño", locale: "pt-BR" },
  UYU: { code: "UYU", symbol: "$U", name: "Peso uruguayo", locale: "es-UY" },
  BOB: { code: "BOB", symbol: "Bs", name: "Boliviano", locale: "es-BO" },
  PYG: { code: "PYG", symbol: "₲", name: "Guaraní", locale: "es-PY" },
  GTQ: { code: "GTQ", symbol: "Q", name: "Quetzal", locale: "es-GT" },
  HNL: { code: "HNL", symbol: "L", name: "Lempira", locale: "es-HN" },
  NIO: { code: "NIO", symbol: "C$", name: "Córdoba", locale: "es-NI" },
  CRC: { code: "CRC", symbol: "₡", name: "Colón costarricense", locale: "es-CR" },
  PAB: { code: "PAB", symbol: "B/.", name: "Balboa", locale: "es-PA" },
  DOP: { code: "DOP", symbol: "RD$", name: "Peso dominicano", locale: "es-DO" },
  VES: { code: "VES", symbol: "Bs.S", name: "Bolívar soberano", locale: "es-VE" },
};

export const CURRENCY_LIST = Object.values(CURRENCIES);

export function formatCurrency(amount: number, currencyCode: string): string {
  const info = CURRENCIES[currencyCode];
  return new Intl.NumberFormat(info?.locale ?? "en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
