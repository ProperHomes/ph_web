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
  return text.charAt(0).toUpperCase() + text.slice(1);
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
