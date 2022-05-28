import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { AlertTypeClass, AlertMessageType } from ".";

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};

const alertSubject = new Subject<AlertMessageType>();
const defaultId = "default-alert";

// enable subscribing to alerts observable
function onAlert(id: string = defaultId) {
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
  alert({ ...options, type: AlertTypeClass.Success, message });
}

function error(message, options) {
  alert({ ...options, type: AlertTypeClass.Error, message });
}

function info(message, options) {
  alert({ ...options, type: AlertTypeClass.Info, message });
}

function warn(message, options) {
  alert({ ...options, type: AlertTypeClass.Warning, message });
}

// core alert method
function alert(alert: AlertMessageType) {
  alert.id = alert.id || defaultId;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  alertSubject.next(alert);
}

// clear alerts
function clear(alert: AlertMessageType) {
  alertSubject.next(alert);
}
