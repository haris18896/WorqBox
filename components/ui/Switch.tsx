import React from "react";
import { Switch as RNSwitch, StyleSheet, View, ViewStyle } from "react-native";

// ** Theme
import { useTheme } from "@/theme";
import { SwitchProps } from "@/types";

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
}) => {
  const { palette } = useTheme();

  const getSwitchProps = () => {
    const isDisabled = disabled;

    switch (variant) {
      case "secondary":
        return {
          trackColor: {
            false: isDisabled ? palette.neutral.light : palette.neutral.main,
            true: isDisabled ? palette.neutral.light : palette.secondary.main,
          },
          thumbColor: isDisabled ? palette.neutral.light : palette.text.inverse,
        };
      case "success":
        return {
          trackColor: {
            false: isDisabled ? palette.neutral.light : palette.neutral.main,
            true: isDisabled ? palette.neutral.light : palette.success.main,
          },
          thumbColor: isDisabled ? palette.neutral.light : palette.text.inverse,
        };
      case "warning":
        return {
          trackColor: {
            false: isDisabled ? palette.neutral.light : palette.neutral.main,
            true: isDisabled ? palette.neutral.light : palette.warning.main,
          },
          thumbColor: isDisabled ? palette.neutral.light : palette.text.inverse,
        };
      case "error":
        return {
          trackColor: {
            false: isDisabled ? palette.neutral.light : palette.neutral.main,
            true: isDisabled ? palette.neutral.light : palette.error.main,
          },
          thumbColor: isDisabled ? palette.neutral.light : palette.text.inverse,
        };
      default: // primary
        return {
          trackColor: {
            false: isDisabled ? palette.neutral.light : palette.neutral.main,
            true: isDisabled ? palette.neutral.light : palette.primary.main,
          },
          thumbColor: isDisabled ? palette.neutral.light : palette.text.inverse,
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        };
      case "large":
        return {
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        };
      default: // medium
        return {
          transform: [{ scaleX: 1 }, { scaleY: 1 }],
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      ...getSizeStyles(),
      ...style,
    },
  });

  const switchProps = getSwitchProps();

  return (
    <View style={styles.container}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={switchProps.trackColor}
        thumbColor={switchProps.thumbColor}
        ios_backgroundColor={switchProps.trackColor.false}
      />
    </View>
  );
};

export default Switch;
