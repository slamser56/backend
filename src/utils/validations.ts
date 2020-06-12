export function checkPhoneNumber(phoneNumber: string): boolean {
  return !!/^(\+?\d{12})/.exec(phoneNumber);
}

export function checkId(id: string): boolean {
  return id?.length === 24;
}
