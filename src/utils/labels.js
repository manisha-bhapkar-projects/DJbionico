export default {

  REGEX_PATTERN: {
    NUMBER: /^[0-9][0-9]*([.][0-9]{2}|)$/,
  },


  LOGIN: {
    REGEX_OF_PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,32}$/,
    REGEX_OF_PASSWORD_NUMBER: /^(?=.*[0-9])/,
    REGEX_OF_PASSWORD_UPPERCASE: /^(?=.*[A-Z])/,
    REGEX_OF_PASSWORD_LOVERCASE: /^(?=.*[a-z])/,
    REGEX_OF_PASSWORD_SPECIAL: /^(?=.*[@$!%*#?&])/,
  },
 

}