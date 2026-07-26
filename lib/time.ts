import "server-only";
import { cacheLife } from "next/cache";

// Cache Components requires cached functions to be async.
// oxlint-disable-next-line require-await
export async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
