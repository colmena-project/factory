import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  alertService,
  AlertTypeClass,
  AlertMessageType,
} from "../../services/alert";

export { Alert };

function Alert({
  id = "default-alert",
  fade = true,
}: {
  id?: string;
  fade?: boolean;
}) {
  const router = useRouter();
  const [alerts, setAlerts] = useState<AlertMessageType[]>([]);

  const currentValue: AlertMessageType = {
    id,
    autoClose: true,
    fade,
    keepAfterRouteChange: true,
    message: "",
    modal: true,
    type: "success",
  };

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService
      .onAlert(id)
      .subscribe((alert: AlertMessageType) => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          setAlerts((alerts) => {
            // filter out alerts without 'keepAfterRouteChange' flag
            const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

            // remove 'keepAfterRouteChange' flag on the rest
            filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
            return filteredAlerts;
          });
        } else {
          // add alert to array
          setAlerts((alerts) => [...alerts, alert]);

          // auto close alert if required
          if (alert.autoClose) {
            setTimeout(() => removeAlert(alert), 7000);
          }
        }
      });

    // clear alerts on location change
    const onRouteChange = () => alertService.clear(currentValue);
    router.events.on("routeChangeStart", onRouteChange);

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off("routeChangeStart", onRouteChange);
    };
  }, []);

  function removeAlert(alert) {
    if (fade) {
      // fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertTypeClass.Success]: "success",
      [AlertTypeClass.Error]: "alert-danger",
      [AlertTypeClass.Info]: "alert-info",
      [AlertTypeClass.Warning]: "alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <>
      {alerts.map((alert, index) => {
        const modal = alert.modal === true ? "modal_alert" : "";
        return (
          <div
            key={index}
            className={"conteiner " + alert.type + "_container " + modal}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-5 pt-1"
                viewBox="0 0 24 24"
              >
                {alert.type === "Success" ? (
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
                ) : alert.type === "Error" ? (
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
                ) : (
                  <path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                )}
              </svg>
            </div>
            <h3 className={alert.type + "_text "}>{alert.message}</h3>
            <button
              onClick={() => removeAlert(alert)}
              className={alert.type + "_button  "}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-4 h-4 pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </button>
          </div>
        );
      })}
      <style jsx>
        {`
          .conteiner {
            @apply space-x-2 p-4 rounded flex shadow-lg mx-auto max-w-2xl;
          }

          .modal_alert {
            @apply fixed z-10 inset-0 overflow-y-auto h-20 items-center;
          }

          h3 {
            @apply tracking-wider flex-1;
          }

          button {
            @apply inline-flex items-center border focus:outline-none rounded-full p-2 cursor-pointer;
          }

          .Success_container {
            @apply bg-green-50  text-green-600;
          }

          .Success_text {
            @apply text-green-800;
          }

          .Success_button {
            @apply hover:bg-green-100 border-green-50 hover:border-green-300 hover:text-green-900;
          }

          .Warning_container {
            @apply bg-yellow-50  text-yellow-600;
          }

          .Warning_text {
            @apply text-yellow-800;
          }

          .Warning_button {
            @apply hover:bg-yellow-100 border-yellow-50 hover:border-yellow-300 hover:text-yellow-900;
          }

          .Error_container {
            @apply bg-red-50  text-red-600;
          }

          .Error_text {
            @apply text-red-800;
          }

          .Error_button {
            @apply hover:bg-red-100 border-red-50 hover:border-red-300 hover:text-red-900;
          }
        `}
      </style>
    </>
  );
}
