import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// notifications
let intervalId;
let popupState = 0;

const showPopup = () => {
  switch (popupState) {
    case 0:
      toast.info("Add Profile Info !");
      break;
    case 1:
      toast.info("50 slots available !");
      break;
    case 2:
      toast.info("Purchase slots !");
      break;
    default:
      break;
  }
  popupState = (popupState + 1) % 3;
};

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    startToastManager();
  } else {
    stopToastManager();
  }
};

const clearNotifications = () => {
  toast.dismiss();
};

export const startToastManager = () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      showPopup();
    }, 600000);
  }
};

export const stopToastManager = () => {
  clearInterval(intervalId);
  intervalId = null;
};

document.addEventListener("visibilitychange", handleVisibilityChange);

startToastManager();

clearNotifications();
