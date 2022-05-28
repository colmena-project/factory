import { ApiCore } from "../api/core";
import Parse from "parse";

import { TRANSACTIONS_TYPES } from "../../lib/constants";

const model = "Transaction";

class ApiCoreTransaction extends ApiCore {
  async getAlltransaction(recyclingCenterId: string) {
    const RecyclingCenters: string = Parse.Object.extend("RecyclingCenter");
    const queryRecyclingCenters: Parse.Query = new Parse.Query(
      RecyclingCenters
    );
    const recyclingCenters: Parse.Object | undefined =
      await queryRecyclingCenters.get(recyclingCenterId);

    if (!recyclingCenters) {
      throw new Error("The Recycling Centers is not found");
    }

    const Transaction: string = Parse.Object.extend("Transaction");
    const query: Parse.Query = new Parse.Query(Transaction);
    query.equalTo("recyclingCenter", recyclingCenters);
    query.equalTo("type", TRANSACTIONS_TYPES.TRANSPORT);
    query.doesNotExist("relatedTo");
    query.doesNotExist("expiredAt");
    const result = await query.find();
    const subscription = await query.subscribe();
    return { result, subscription };
  }

  async getAlltransactionAccept(recyclingCenterId: string) {
    const RecyclingCenters: string = Parse.Object.extend("RecyclingCenter");
    const queryRecyclingCenters: Parse.Query = new Parse.Query(
      RecyclingCenters
    );
    const recyclingCenters: Parse.Object | undefined =
      await queryRecyclingCenters.get(recyclingCenterId);

    if (!recyclingCenters) {
      throw new Error("The Recycling Centers is not found");
    }

    const Transaction: string = Parse.Object.extend("Transaction");
    const query: Parse.Query = new Parse.Query(Transaction);
    query.equalTo("recyclingCenter", recyclingCenters);
    query.equalTo("type", TRANSACTIONS_TYPES.TRANSPORT_ACCEPT);
    const result = await query.find();
    const subscription = await query.subscribe();
    return { result, subscription };
  }

  async getTransactionDetail(transactionId: string) {
    const resource = { objectId: transactionId };
    try {
      const transaction = await Parse.Cloud.run(
        "findTransactionById",
        resource
      );
      return transaction;
    } catch (err) {
      const error = new Error(
        `Error al recuperar el detalle de la transacciones. Motivo: ${err.message}`
      );
      throw error;
    }
  }
  async registerTransportAccept(transactionId: string): Promise<Parse.Object> {
    const resource = { transactionId };
    try {
      return await Parse.Cloud.run("registerTransportAccept", resource);
    } catch (err) {
      const error = new Error(
        `Error al Aceptar la transacciones. Motivo: ${err.message}`
      );
      throw error;
    }
  }

  async registerTransportReject(
    transactionId: string,
    reason: string
  ): Promise<Parse.Object> {
    const resource = { transactionId, reason };
    try {
      return await Parse.Cloud.run("registerTransportReject", resource);
    } catch (err) {
      const error = new Error(
        `Error al Rechazar la transacciones. Motivo: ${err.message}`
      );
      throw error;
    }
  }

  async getContainerByTransaction(transactionId: string) {
    const resource = { transactionId };
    try {
      return await Parse.Cloud.run(
        "findTransactionHistoryContainerById",
        resource
      );
    } catch (err) {
      const error = new Error(
        `Error al buscar la transaction. Motivo: ${err.message}`
      );
      throw error;
    }
  }

  async registerPayment(
    transactionId,
    containers: { container: string; total: number; payment: number }[]
  ) {
    const resource = { transactionId, containers };
    try {
      return await Parse.Cloud.run("registerPayment", resource);
    } catch (err) {
      const mensajeError =
        err.message ==
        "Transaction could not be Accept. Detail: The Recycling Center has not enough money"
          ? "El centro de Reciclaje no tiene dinero suficiente"
          : err.message;
      const error = new Error(
        `Error al registrar el Pago. Motivo: ${mensajeError}`
      );
      throw error;
    }
  }
}

export const transactionApi = new ApiCoreTransaction({
  model,
});
