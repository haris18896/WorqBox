import { useTheme } from "@/theme";
import { getInitials } from "@/utils/textUtils";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AvatarProps } from "./index.d";

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 40,
  backgroundColor,
  textColor,
  style,
}) => {
  const { palette } = useTheme();

  const avatarBackgroundColor = backgroundColor || palette.primary.main;
  const avatarTextColor = textColor || palette.text.inverse;

  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: avatarBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarText: {
      color: avatarTextColor,
      fontSize: size * 0.4,
      fontWeight: "600",
    },
  });

  if (imageUrl) {
    return (
      <View style={[styles.avatar, style]}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={[styles.avatar, style]}>
      <Text style={styles.avatarText}>{getInitials(name)}</Text>
    </View>
  );
};

export default Avatar;
