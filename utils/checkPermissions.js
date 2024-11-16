import { PermissionsAndroid, Platform } from "react-native";
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import NetInfo from '@react-native-community/netinfo';

export const checkPermissions = async () => {
  // Helper function to handle permission checks for different types
  const checkAndRequestPermission = async (permission) => {
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      console.log(`${permission} is already granted.`);
    } else if (result === RESULTS.DENIED) {
      console.log(`${permission} is denied, requesting permission...`);
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        console.log(`${permission} granted.`);
      } else {
        console.log(`${permission} denied by user.`);
      }
    }
  };


  if (Platform.OS === "ios") {
    await checkAndRequestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else if (Platform.OS === "android") {
    await checkAndRequestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }

  // 2. Check and request contacts permission
  if (Platform.OS === "ios") {
    await checkAndRequestPermission(PERMISSIONS.IOS.CONTACTS);
  } else if (Platform.OS === "android") {
    await checkAndRequestPermission(PERMISSIONS.ANDROID.READ_CONTACTS);
  }

  // 3. Check and request camera permission
  if (Platform.OS === "ios") {
    await checkAndRequestPermission(PERMISSIONS.IOS.CAMERA);
  } else if (Platform.OS === "android") {
    await checkAndRequestPermission(PERMISSIONS.ANDROID.CAMERA);
  }

  // 4. Check and request SMS permission (Android only)
  if (Platform.OS === "android") {
    await checkAndRequestPermission(PERMISSIONS.ANDROID.READ_SMS);
    await checkAndRequestPermission(PERMISSIONS.ANDROID.RECEIVE_SMS);
  }

  // 5. Check and request notifications permission
  if (Platform.OS === "ios") {
    await checkAndRequestPermission(PERMISSIONS.IOS.NOTIFICATIONS);
  } else if (Platform.OS === "android") {
    await checkAndRequestPermission(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }

  // 6. Check network state (NetInfo)
  // const netInfo = await NetInfo.fetch();
  // if (netInfo.isConnected) {
  //     console.log('Network is connected');
  // } else {
  //     console.log('No network connection');
  // }
};
