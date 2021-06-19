// import bcrypt from "bcrypt"; //TODO Can't install bcrypt for some reason. Try again later.

const saltRounds = 10;

export const encrypt = (password: string) => {
  // return bcrypt.hash(password, saltRounds);
  return password;
};

// export const compare = bcrypt.compare;
export const compare = (pass1, pass2) => pass1 === pass2;
