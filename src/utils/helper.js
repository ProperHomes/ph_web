import axios from "axios";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const passwordRules = yup
  .string()
  .required("Password is required")
  .min(
    10,
    "password must contain 10 or more characters with at least one of each: uppercase, lowercase, number and special character"
  )
  .minLowercase(1, "password must contain at least 1 lower case letter")
  .minUppercase(1, "password must contain at least 1 upper case letter")
  .minNumbers(1, "password must contain at least 1 number")
  .minSymbols(1, "password must contain at least 1 special character");

export const sendVerificationEmail = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
      data,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export function removeDuplicateObjectsFromArray(list = []) {
  const obj = {};
  list.map((l) => {
    obj[l.id] = l;
  });
  return Object.values(obj);
}

export function capitalizeFirstLetter(text) {
  if (!text) return null;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function camelCase(text) {
  return text
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join(" ");
}

export function convertStringToSlug(str) {
  let updatedStr = str;
  updatedStr = updatedStr.replace(/^\s+|\s+$/g, ""); // trim
  updatedStr = updatedStr.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    updatedStr = updatedStr.replace(
      new RegExp(from.charAt(i), "g"),
      to.charAt(i)
    );
  }

  updatedStr = updatedStr
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return updatedStr;
}

export function getPropertyUrl({ type, listedFor, city }) {
  if (!city || !listedFor || !type) {
    return "/";
  }
  const path = convertStringToSlug(
    `${type.toLowerCase()}-for-${listedFor.toLowerCase()}-in-${city.toLowerCase()}`
  );
  return `/property/${path}`;
}

// Below two functions are needed mainly because we're converting/resizing the images added to the s3 buckets
// as per our needs. Avatar images are resized and heic extension are converted to jpegs.

export function getAvatarThumbUrl(url) {
  let avatarThumbUrl;
  if (url) {
    const extension = url.split(".").pop();
    avatarThumbUrl = `${url
      .split(".")
      .slice(0, -1)
      .join(".")}_thumb.${extension}`;
  }
  return avatarThumbUrl ?? url;
}

export function formatHeicImageUrl(url) {
  let formattedUrl;
  if (url) {
    const extension = url.split(".").pop();
    if (extension === "heic" || extension === "heif") {
      formattedUrl = `${url.split(".").slice(0, -1).join(".")}.jpeg`;
    }
  }
  return formattedUrl ?? url;
}

export function findKeyByValue(obj, value) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
}

// tenure in months
export function calculateEmi({ principal, tenure, interest }) {
  const numberOfMonths = tenure * 12;
  const rate = interest / 100 / 12;
  const top = Math.pow(1 + rate, numberOfMonths);
  const bottom = top - 1;
  return Math.trunc(principal * rate * (top / bottom));
}

// credit: https://github.com/salmanm/num-words/blob/main/index.js
export function numWords(input) {
  const a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;
  const getLT20 = (n) => a[Number(n)];
  const getGT20 = (n) => b[n[0]] + " " + a[n[1]];
  const num = Number(input);
  if (isNaN(num)) return "";
  if (num === 0) return "zero";

  const numStr = num.toString();
  if (numStr.length > 9) {
    throw new Error("overflow"); // Does not support converting more than 9 digits yet
  }

  const [, n1, n2, n3, n4, n5] = ("000000000" + numStr).substr(-9).match(regex); // left pad zeros

  let str = "";
  str += n1 != 0 ? (getLT20(n1) || getGT20(n1)) + "crore " : "";
  str += n2 != 0 ? (getLT20(n2) || getGT20(n2)) + "lakh " : "";
  str += n3 != 0 ? (getLT20(n3) || getGT20(n3)) + "thousand " : "";
  str += n4 != 0 ? getLT20(n4) + "hundred " : "";
  str += n5 != 0 && str != "" ? "and " : "";
  str += n5 != 0 ? getLT20(n5) || getGT20(n5) : "";

  return str.trim();
}

export function getRupees(price) {
  if (price) {
    return Number(price).toLocaleString("en-in", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  }
}
