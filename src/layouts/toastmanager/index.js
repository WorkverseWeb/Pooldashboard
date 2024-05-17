import { toast } from "react-toastify";

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
    clearInterval(intervalId);
    startToastManager();
  } else {
    stopToastManager();
  }
};

const clearNotifications = () => {
  toast.dismiss(); // Dismiss all notifications
};

export const startToastManager = () => {
  intervalId = setInterval(() => {
    showPopup();
  }, 6000);
};

export const stopToastManager = () => {
  clearInterval(intervalId);
};

document.addEventListener("visibilitychange", handleVisibilityChange);

startToastManager();

clearNotifications();
