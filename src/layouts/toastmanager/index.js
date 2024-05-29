import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let intervalId;
let popupState = 0;

const NOTIFICATIONS_KEY = "notifications";
const MAX_NOTIFICATIONS = 5; // Maximum number of notifications

const getNotifications = () => {
  const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
  return notifications ? JSON.parse(notifications).reverse().slice(0, MAX_NOTIFICATIONS) : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

const addNotification = (message, type) => {
  let notifications = getNotifications();
  if (notifications.length >= MAX_NOTIFICATIONS) {
    // Remove the oldest notifications if the maximum limit is reached
    notifications = notifications.slice(-(MAX_NOTIFICATIONS - 1));
  }
  notifications.unshift({ message, type, timestamp: new Date().toISOString() }); // Prepend new notification
  saveNotifications(notifications);
};

const showPopup = () => {
  let message;
  let type;
  switch (popupState) {
    case 0:
      message = "Add Profile Info !";
      type = "info";
      break;
    case 1:
      message = "50 slots available !";
      type = "info";
      break;
    case 2:
      message = "Purchase slots !";
      type = "info";
      break;
    default:
      break;
  }

  if (message) {
    addNotification(message, type);
    toast[type](message);
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
  saveNotifications([]); // Clear notifications
  toast.info("No new notifications"); // Show info message
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

// Check if there are existing notifications when the page loads
if (getNotifications().length > 0) {
  startToastManager();
} else {
  clearNotifications(); // Clear any existing notifications if there are none
}

export { getNotifications, addNotification, showPopup };
