export declare function useNotification(
  title: string,
  options: NotificationOptions,
): {
  fireNotif: () => Promise<void>;
};
