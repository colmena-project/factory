import { ApiCore } from "../api/core";
import Parse from "parse";
const model = "Account";

class ApiCoreProfile extends ApiCore {
  async getMyAccount(userId: string, force = false) {
    // try {
    //search Account
    const account = Parse.Object.extend("Account");
    const query = new Parse.Query(account);

    const acountId = JSON.parse(localStorage.getItem("acount"));
    if (acountId !== null && force === false) {
      query.fromLocalDatastore();
      const accountData = await query.get(acountId);
      this.getMyAccount(userId, true);
      return accountData;
    }

    const user = Parse.Object.extend("User");

    const innerQuery = new Parse.Query(user);
    innerQuery.equalTo("objectId", userId);

    query.matchesQuery("user", innerQuery);
    const accountData = await query.first();

    await accountData.pin();
    localStorage.setItem("acount", JSON.stringify(accountData.id));

    return accountData;
    // } catch (err) {
    //   const error = new Error(`Error al recuperar la cuenta. ${err.message}`);
    //   throw error;
    // }
  }

  async uploadPhotoProfile(
    userId: string,
    image: object,
    fileName: string,
    fileType: string
  ) {
    try {
      const accountData = await this.getMyAccount(userId);
      const parseFile = new Parse.File(fileName, image, fileType);
      await parseFile.save();
      accountData.set("avatar", parseFile);
      await accountData.save().then(
        (parseData) => {
          console.info(`Update object created with objectId: ${parseData.id}`);
        },
        (error) => {
          new Error(
            `Error al guardar la imagen de del usuario . ${error.message}`
          );
        }
      );

      await accountData.pin();

      return accountData;
    } catch (err) {
      const error = new Error(
        `Error al guardar la imagen de del usuario. ${err.message}`
      );
      throw error;
    }
  }

  async updateData(account: Parse.Object, data: object[]) {
    const accountData = this.patch(account, data);
    await accountData.pin();
    return accountData;
  }
}

export const profileApi = new ApiCoreProfile({
  model,
});
