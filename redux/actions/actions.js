import { staff } from "../utils/faker";

export const login = (userName, pass) => {
  const { email, password } = staff;
  if (userName === email && password === pass) {
    return true;
  } else {
    return false;
  }
  // TODO:Write api call for login
};

export const punchIn = (image, location, time) => {
  // TODO:Write api call for punch in
  console.log("Your selfie uploaded", image);
  console.log("Current location is", location);
  console.log("Time is", time);
};
