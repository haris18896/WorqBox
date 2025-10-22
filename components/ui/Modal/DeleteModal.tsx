import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";

// ** Components
import Button from "../Button/Button";
import CustomModal from "./Modal";

// ** Types
import { DeleteModalProps } from "./Modal.d";

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onDelete,
  title,
  subtitle,
  description,
  height = "50%",
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
    },
    Content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: palette.error.light + "20",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
    warningIcon: {
      fontSize: iconSize["2xl"],
      color: palette.error.main,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "600",
      color: palette.text.primary,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    subtitleText: {
      fontSize: 16,
      fontWeight: "500",
      color: palette.text.secondary,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    descriptionText: {
      fontSize: 16,
      fontWeight: "400",
      color: palette.text.primary,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.sm,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: spacing.md,
      width: "100%",
    },
    button: {
      flex: 1,
    },
  });

  return (
    <CustomModal
      height={height}
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      variant="centered"
      width="85%"
      closeOnBackdrop={true}
      showCloseButton={true}
    >
      <View style={styles.container}>
        <View style={styles.Content}>
          <View style={styles.iconContainer}>
            <Ionicons name="warning" style={styles.warningIcon} />
          </View>

          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            outlineColor="error"
            onPress={onClose}
            style={styles.button}
          />
          <Button
            title="Delete"
            variant="error"
            onPress={onDelete}
            style={styles.button}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default DeleteModal;
