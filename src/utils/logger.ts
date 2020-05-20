const logInConsole = (log: string, color: string): void => {
  console.log(color, log, '\x1b[37m');
};

export const info = (log: string): void => {
  logInConsole(log, '\x1b[32m');
};

export const warn = (log: string): void => {
  logInConsole(log, '\x1b[33m');
};

export const error = (log: string): void => {
  logInConsole(log, '\x1b[31m');
};
