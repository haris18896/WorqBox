import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";

// ** Redux
import { useAppSelector } from "@/store";
import { selectUser } from "@/store/slices/authSlice";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { BarHeaderProps } from "@/types";

const BarHeader: React.FC<BarHeaderProps> = ({
  onBack,
  onChatPress,
  onNotificationPress,
  onProfilePress,
  style,
  titleStyle,
  subtitleStyle,
  variant = "default",
}) => {
  const { palette, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const user = useAppSelector(selectUser);

  const getVariantStyles = () => {
    switch (variant) {
      case "large":
        return {
          paddingVertical: spacing.md,
          titleFontSize: 24,
          subtitleFontSize: 16,
        };
      case "minimal":
        return {
          paddingVertical: spacing.xs,
          titleFontSize: 16,
          subtitleFontSize: 14,
        };
      case "search":
        return {
          paddingVertical: spacing.md,
          titleFontSize: 18,
          subtitleFontSize: 14,
        };
      default:
        return {
          paddingVertical: spacing.md,
          titleFontSize: 20,
          subtitleFontSize: 14,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: palette.surface.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: variantStyles.paddingVertical,
      ...style,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 40,
    },
    centerSection: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: spacing.md,
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 120,
      justifyContent: "flex-end",
    },
    iconButton: {
      marginRight: 10,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: iconSize.lg,
      color: palette.text.primary,
    },
    profileIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: palette.primary.main,
      alignItems: "center",
      justifyContent: "center",
    },
    profileText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#FFFFFF",
    },
    profileImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    title: {
      fontSize: variantStyles.titleFontSize,
      fontWeight: "600",
      color: palette.text.primary,
      textAlign: "center",
      ...titleStyle,
    },
    subtitle: {
      fontSize: variantStyles.subtitleFontSize,
      color: palette.text.secondary,
      textAlign: "center",
      marginTop: spacing.xs,
      ...subtitleStyle,
    },
  });

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleDrawerPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleChatPress = () => {
    if (onChatPress) {
      onChatPress();
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push("/profile");
    }
  };

  const getUserInitial = () => {
    if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {onBack ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDrawerPress}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={24}
            color={palette.text.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleChatPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileIcon}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.profileText}>{getUserInitial()}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BarHeader;
