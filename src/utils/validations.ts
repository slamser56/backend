function checkPhoneNumber(phoneNumber: string): boolean {
  return !!/^(\+?\d{12})/.exec(phoneNumber);
}

export default checkPhoneNumber;
