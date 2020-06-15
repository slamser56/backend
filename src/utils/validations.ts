import t from '../lang/index';

export function validatePhoneNumber(phoneNumber: string): void {
  if (!/^(\+?\d{12})/.exec(phoneNumber)) {
    Promise.reject({ status: 400, message: t('message.inputCorrectPhoneNumber') });
  }
}

export function validateId(id: string): boolean {
  return id?.length === 24;
}

export function validatePassword(password: string): void {
  if (!(password?.length >= 3 && password?.length <= 16)) {
    Promise.reject({ status: 400, message: t('message.inputCorrectPassword') });
  }
}
