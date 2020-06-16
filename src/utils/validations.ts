import t from '../lang/index';

export function validatePhoneNumber(phoneNumber: string): void {
  if (!/^(\+?\d{12})/.exec(phoneNumber)) {
    throw { status: 400, message: t('message.inputCorrectPhoneNumber') };
  }
}

export function validateId(id: string): void {
  if (!(id?.length === 24)) {
    throw { status: 400, message: t('message.badId') };
  }
}

export function validatePassword(password: string): void {
  if (!(password?.length >= 3 && password?.length <= 16)) {
    throw { status: 400, message: t('message.inputCorrectPassword') };
  }
}
