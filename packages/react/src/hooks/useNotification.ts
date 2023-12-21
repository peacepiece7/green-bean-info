import { useCallback } from 'react'

export function useNotification(title: string, options: NotificationOptions) {
  const fireNotif = useCallback(async () => {
    await Notification.requestPermission()
    if (Notification.permission !== 'granted') {
      return
    }
    new Notification(title, options)
  }, [title, options])

  return { fireNotif }
}
