import { ApiCore } from "../api/core";
import Parse from "parse";
const model = "Account";

class ApiCoreProfile extends ApiCore {
  async getMyAccount() {
    try {
      const user = await Parse.Cloud.run("getMyAccount");
      return user;
    } catch (err) {
      const error = new Error(`Error al recuperar la cuenta. ${err.message}`);
      throw error;
    }
  }
}

export const profileApi = new ApiCoreProfile({
  model,
});
