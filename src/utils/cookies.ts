export const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === "undefined") {
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

export const clearAllCookies = (): void => {
  if (typeof document === "undefined") {
    return;
  }

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    deleteCookie(name);
  }
};