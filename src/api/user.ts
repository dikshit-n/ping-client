import { AUTH_DATA, SIGNUP_USER_DETAILS } from "src/model";
import { axiosInstance, createApiFunction } from "src/utils";

class UserApi {
  signup(details: SIGNUP_USER_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(() => axiosInstance.post("/user/signup", details));
  }
  profile(): Promise<AUTH_DATA> {
    return createApiFunction(() => axiosInstance.get("/user/profile"));
  }
}

export const userApi = new UserApi();
