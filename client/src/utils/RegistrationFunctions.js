export function isPasswordNull(password) {
  return password.length === 0
}

export function isLoginCorrect(login) {
  let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  return re.test(login)
}