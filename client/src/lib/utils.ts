import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatFunction = (dateValue: Date | string) => {
  let tempDate: Date | string = new Date(dateValue);
  tempDate = tempDate.toLocaleDateString();
  let [date, month, year] = tempDate.split("/");
  date = date.padStart(2, "0");
  month = month.padStart(2, "0");

  return `${year}-${month}-${date}`;
};

export const timePassedFunction = (dateValue: Date | string) => {
  const createdDate = new Date(dateValue).getTime();
  const dateNow = Date.now();
  const passedTime = dateNow - createdDate;
  const sec = Math.floor(passedTime / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec === 0) {
    return `1 second ago`;
  } else if (sec < 60) {
    return `${sec} sec ago`;
  } else if (min < 60) {
    return `${min} min ago`;
  } else if (hr < 24) {
    return `${hr} hr ago`;
  } else {
    return `${day} day${day === 1 ? "" : "s"} ago`;
  }
};
