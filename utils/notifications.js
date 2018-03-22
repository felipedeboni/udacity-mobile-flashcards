import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'FLASHCARDS:notifications'

export const clearLocalNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export const createLocalNotification = () => {
  return {
    title: 'We miss you!',
    body: 'What about taking a Quiz today?',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if ( data === null ) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if ( status === 'granted' ) {
              clearLocalNotifications()
                .then(() => {
                  let tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(21)
                  tomorrow.setMinutes(0);

                  Notifications.scheduleLocalNotificationAsync(
                    createLocalNotification(),
                    {
                      time: tomorrow,
                      repeat: 'day'
                    }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                })
            }
          })
      }
    })
}
