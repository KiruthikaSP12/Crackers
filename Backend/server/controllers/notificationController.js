import { store } from "../data/store.js";

export const getNotifications = (_req, res) => {
  res.json(store.notifications);
};

export const addNotification = (req, res) => {
  const notification = { id: Date.now(), read: false, ...req.body };
  store.notifications.unshift(notification);
  res.status(201).json(notification);
};

export const markNotificationRead = (req, res) => {
  const notification = store.notifications.find((entry) => entry.id === Number(req.params.id));
  if (!notification) {
    return res.status(404).json({ message: "Notification not found." });
  }

  notification.read = true;
  res.json(notification);
};
