import { IcoArrow } from "../Icon";
export const TransaccionEditHeader = () => {
  return (
    <>
      <div className="operacion_header">
        <div className="operacion_header_from">
          <div className="operacion_header_from_name">Jonathan Reinink</div>
          <div className="operacion_header_from_location">Obera</div>
          <div className="operacion_header_from_address">
            Barrio Krause Escalera 41
          </div>
        </div>
        <div className="operacion_header_link">
          <div className="operacion_header_link_conteiner">
            <IcoArrow />
          </div>
        </div>
        <div className="operacion_header_to">
          <div className="operacion_header_from_name">Transportado a</div>
          <div className="operacion_header_from_location">
            CP Cpo Viera (30KM)
          </div>
          <div className="operacion_header_from_address">Av. de Té 300</div>
        </div>
        <div className="operacion_header_single">
          <input type="checkbox" checked={false} disabled={true} />
          <span>Carga individual</span>
        </div>
        <div className="operacion_header_total">
          <input type="checkbox" checked={true} disabled={true} />
          <span>Carga Total</span>
        </div>
        <div className="operacion_header_status">
          <div className="operacion_header_status_item">
            <strong>Fecha:</strong>5 de Abril 2021 09 hs
          </div>
          <div className="operacion_header_status_status">
            <strong>Estado:</strong>
            <div className="label">Sin pagar</div>
          </div>
          <div className="operacion_header_status_item">
            <strong>Order ID:</strong>
            123123123
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .operacion_header {
            @apply w-full mt-3 mb-4 px-0 flex flex-row flex-wrap text-xs;
          }
          .operacion_header_from,
          .operacion_header_link,
          .operacion_header_to,
          .operacion_header_single,
          .operacion_header_total,
          .operacion_header_status {
            @apply w-2/6 md:w-1/6;
          }

          .operacion_header_from_name {
            @apply text-sm md:text-lg;
          }
          .operacion_header_from_location,
          .operacion_header_from_address {
            @apply text-xs md:text-sm;
          }
          .operacion_header_link {
            @apply flex items-center justify-center m-auto;
          }

          .operacion_header_single,
          .operacion_header_total {
            @apply flex object-center items-end;
          }

          .operacion_header_single input,
          .operacion_header_total input {
            @apply mr-2;
          }

          .operacion_header_single span,
          .operacion_header_total span {
            @apply -mb-1;
          }

          .operacion_header_status_status,
          .operacion_header_single,
          .operacion_header_total {
            @apply flex flex-row my-2;
          }

          .operacion_header_status_item strong {
            @apply mr-2;
          }
          .label {
            @apply ml-2 rounded px-2  bg-gray-300;
          }

          input[type="checkbox"]:checked {
            -moz-box-shadow: inset 0 0 10px #7bf985;
            -webkit-box-shadow: inset 0 0 10px #7bf985;
            box-shadow: inset 0 0 10px #7bf985;
          }
        `}
      </style>
    </>
  );
};
