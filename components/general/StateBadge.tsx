import React from "react";

export const StateBadge = (props) => {
  const { state, percent } = props;

  let text = "Terminado";
  let backgroundColor = "background-color: #4CB5AB";
  let icon = "/icons/sinpagar.png";
  let color = "white";
  let classNameBadge = "badge_progress";

  if (state == "paid") {
    icon = "/icons/pagado.png";
  }

  if (state === "rejected") {
    backgroundColor = "background-color: #FF4081";
    icon = "/icons/vermas.png";
    text = "Rechazado";
  }

  if (state === "in_progress") {
    let max = percent - 120;
    backgroundColor = `background-color: #EEEEEE; background-image: linear-gradient(to right, #4CB5AB ${percent}%, transparent ${max}%)`;
    icon = null;
    text = `${percent}%`;
    color = percent < 60 ? "#4CB5AB" : "#EEEEEE";
    classNameBadge = classNameBadge + " " + percent;
  }

  return (
    <>
      <div className="badge">
        <div className="badge_progress">
          <span className="text-center" style={{ color }}>
            {text}
          </span>
        </div>
        {icon && (
          <div className="badge_icon">
            <img style={{ width: 24, height: 24 }} src={icon} alt="Accion" />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .badge {
            @apply flex m-auto;
          }
          .badge_progress {
            @apply w-3/4 text-center py-1 text-xs rounded-full;
            ${backgroundColor}
          }

          .badge_progress .text-center {
            @apply leading-5;
          }
          .text-center {
            @apply text-xs;
          }
          .badge_icon {
            @apply w-1/4 pl-1 pt-1 hidden md:inline;
          }
        `}
      </style>
    </>
  );
};
