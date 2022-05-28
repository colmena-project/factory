import { ApiCore } from "../api/core";
import Parse from "parse";
import { Material } from "../../type";

const model = "Retribution";

class ApiCoreTransaction extends ApiCore {
  async estimateRetribution(
    type: string,
    elements: Material[]
  ): Promise<Parse.Object> {
    const resource = { type, elements };
    try {
      return await Parse.Cloud.run("estimateRetribution", resource);
    } catch (err) {
      const error = new Error(
        `Error al Rechazar la transacciones. Motivo: ${err.message}`
      );
      throw error;
    }
  }
}
export const retributionApi = new ApiCoreTransaction({
  model,
});
