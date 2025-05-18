interface SignupErrors {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

class SignupValidation {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  validateSignup(values: SignupValues) {
    const errors: SignupErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    };
    if (values.email && !this.emailRegex.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (values.password && values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (
      values.password.length >= 8 &&
      !this.passwordRegex.test(values.password)
    ) {
      errors.password =
        "password must be at least 8 characters long and contain a special character, uppercase, and lowercase letter";
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (values.username && values.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    return errors;
  }
}

export default new SignupValidation();
