export const info = (...params: any[]): void => {
  console.info(...params, '\x1b[32m');
};

export const warn = (...params: any[]): void => {
  console.warn(...params, '\x1b[33m');
};

export const error = (...params: any[]): void => {
  console.error(...params, '\x1b[31m');
};
