import type {User} from "@/interfaces";

export default defineNuxtRouteMiddleware(
  (to, from) => {
    console.log("you are free");
    const loginTokenCookie = useCookie<string | null>("loginToken");
    const loginUserCookie = useCookie<User | null>("loginUser");
    if (loginTokenCookie.value == null || loginUserCookie.value == null) {
      console.log("you are not login");
      return navigateTo("/login");
    } else {
      return;
    }
  }
)