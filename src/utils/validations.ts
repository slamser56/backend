export function validatePhoneNumber(phoneNumber: string): boolean {
  return !!/^(\+?\d{12})/.exec(phoneNumber);
}

export function validateId(id: string): boolean {
  return id?.length === 24;
}

export function validatePassword(password: string): boolean {
  return password?.length >= 3 && password?.length <= 16;
}
