/** Must match next.config.mjs basePath (GitHub Pages project site). */
export const BASE_PATH = "/quintanaweb";

export function withBase(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Secret uplink route — keep obscure on purpose */
export const UPLINK_PATH = "/mcs-x7";
