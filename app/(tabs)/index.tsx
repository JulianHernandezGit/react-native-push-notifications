import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    }).then((status) => {
      console.log('PERMS: ', status);
    })

    // // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener(async(notification) => {
    //   console.log('NOTIF: ', notification);
    //   const count = await Notifications.getBadgeCountAsync();
    //   console.log('COUNT: ', count);
    //   await Notifications.setBadgeCountAsync(count + 1);
    // });

    // //Tap on notification to open app
    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log('RESPONSE: ', response);
    //   Notifications.dismissAllNotificationsAsync();
    //   Notifications.setBadgeCountAsync(0);
    // });

    // Clean up the listener on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    }
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail!",
        body: 'My notification body',
        data: { data: 'Secret message' },
      },
      trigger: {
        seconds: 4,
      },
    })
  }

  return (
    <View style={styles.container}>
      <Button onPress={scheduleNotification} title="Schedule Notification" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
