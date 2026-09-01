import Cookies from "js-cookie";

export const cookieStorage = {
  get: (key: string) => Cookies.get(key),
  set: (key: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, value, { path: "/", ...options });
  },
  remove: (key: string) => {
    Cookies.remove(key, { path: "/" });
  },
};
