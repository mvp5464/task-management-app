import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatFunction = (dateValue: Date | string) => {
  let tempDate: Date | string | string[] = new Date(dateValue);
  tempDate = tempDate.toLocaleDateString();
  let [date, month, year] = tempDate.split("/");
  date = date.padStart(2, "0");
  month = month.padStart(2, "0");

  return `${year}-${month}-${date}`;
};
