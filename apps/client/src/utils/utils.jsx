import { router } from "../main";

export function redirectTo(path) {
  router.navigate(path);
}
