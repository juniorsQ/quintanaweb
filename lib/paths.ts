/** Production custom domain is served at the origin root. */
export const BASE_PATH = "";

export function withBase(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Secret uplink route — keep obscure on purpose */
export const UPLINK_PATH = "/mcs-x7";
