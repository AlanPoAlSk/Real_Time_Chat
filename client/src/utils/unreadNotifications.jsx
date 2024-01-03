export const unreadNotificationsFunction = (notifications) => {
    return notifications.filter((notification) => notification.isRead === false);
};