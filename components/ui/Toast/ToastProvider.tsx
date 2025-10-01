import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const ToastProvider: React.FC = () => {
  const { palette } = useTheme();

  const toastConfig = {
    success: ({ text1, text2 }: any) => (
      <View
        style={[
          styles.toastContainer,
          { backgroundColor: palette.background.secondary },
        ]}
      >
        <View
          style={[styles.leftBorder, { backgroundColor: palette.success.main }]}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: palette.text.primary }]}>
            {text1}
          </Text>
          {text2 && (
            <Text style={[styles.message, { color: palette.text.secondary }]}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    ),
    error: ({ text1, text2 }: any) => (
      <View
        style={[
          styles.toastContainer,
          { backgroundColor: palette.background.secondary },
        ]}
      >
        <View
          style={[styles.leftBorder, { backgroundColor: palette.error.main }]}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: palette.text.primary }]}>
            {text1}
          </Text>
          {text2 && (
            <Text style={[styles.message, { color: palette.text.secondary }]}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    ),
    info: ({ text1, text2 }: any) => (
      <View
        style={[
          styles.toastContainer,
          { backgroundColor: palette.background.secondary },
        ]}
      >
        <View
          style={[styles.leftBorder, { backgroundColor: palette.info.main }]}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: palette.text.primary }]}>
            {text1}
          </Text>
          {text2 && (
            <Text style={[styles.message, { color: palette.text.secondary }]}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    ),
    warning: ({ text1, text2 }: any) => (
      <View
        style={[
          styles.toastContainer,
          { backgroundColor: palette.background.secondary },
        ]}
      >
        <View
          style={[styles.leftBorder, { backgroundColor: palette.warning.main }]}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: palette.text.primary }]}>
            {text1}
          </Text>
          {text2 && (
            <Text style={[styles.message, { color: palette.text.secondary }]}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    ),
  };

  return (
    <Toast
      config={toastConfig}
      position="top"
      topOffset={60}
      visibilityTime={4000}
      autoHide={true}
    />
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftBorder: {
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
});
