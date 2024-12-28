import * as Yup from "yup";

class Validator {
  registerSchema() {
    return Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
      roles: Yup.array().of(Yup.string()).optional(),
    });
  }

  loginSchema() {
    return Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
  }
}

export default new Validator();
