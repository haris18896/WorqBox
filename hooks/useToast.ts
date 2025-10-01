import Toast from "react-native-toast-message";

export const useToast = () => {
  const showSuccess = (message: string, description?: string) => {
    Toast.show({
      type: "success",
      text1: message,
      text2: description,
    });
  };

  const showError = (message: string, description?: string) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: description,
    });
  };

  const showInfo = (message: string, description?: string) => {
    Toast.show({
      type: "info",
      text1: message,
      text2: description,
    });
  };

  const showWarning = (message: string, description?: string) => {
    Toast.show({
      type: "warning",
      text1: message,
      text2: description,
    });
  };

  const hide = () => {
    Toast.hide();
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hide,
  };
};
