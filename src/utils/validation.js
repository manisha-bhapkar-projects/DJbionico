export function validationNameWithRegex(name, nameRegex) {
  if (name && nameRegex.test(name)) {
    return true;
  }
  return false;
}


export function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,5}$/;

  if (email && emailRegex.test(email.trim())) {
    return true;
  }
  return false;
}

export function validateName(name) {
  const nameRegex = /^[A-Za-z]+$/;
  if (name && nameRegex.test(name.trim())) {
      return true;
  }
  return false;
}
export function validateNo(otp) {
  const otpRegex = /^[0-9]+$/;
  if (otp && otpRegex.test(otp.trim())) {
      return true;
  }
  return false;
}
