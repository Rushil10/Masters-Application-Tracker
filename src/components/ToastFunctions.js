import Toast from 'react-native-toast-message';

export const showToast = (
  message,
  type,
  position = 'top',
  visibilityTime = 3000,
) => {
  Toast.show({
    type: type,
    text1: message,
    position: position,
    autoHide: true,
    visibilityTime: visibilityTime,
  });
};
