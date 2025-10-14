import { ColorPalette, useTheme } from "@/theme";
import { getInitials, stripHtmlTags } from "@/utils/textUtils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AvatarProps, ProjectCardProps } from "./index.d";

const Avatar: React.FC<AvatarProps> = ({ imageUrl, name, size = 40 }) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: palette.primary.main,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarText: {
      color: palette.text.inverse,
      fontSize: size * 0.4,
      fontWeight: "600",
    },
  });

  if (imageUrl) {
    return (
      <View style={styles.avatar}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{getInitials(name)}</Text>
    </View>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  onLongPress,
}) => {
  const { palette } = useTheme();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={styles(palette).card}
      onPress={() => onPress?.(project)}
      onLongPress={() => onLongPress?.(project)}
      activeOpacity={0.7}
    >
      <View style={styles(palette).header}>
        <View style={styles(palette).projectAvatar}>
          <Avatar imageUrl={project.iconUrl} name={project.name} size={56} />
        </View>
        <View style={styles(palette).headerContent}>
          <Text style={styles(palette).projectName} numberOfLines={1}>
            {project.name}
          </Text>
          <Text style={styles(palette).projectLead} numberOfLines={1}>
            Lead: {project.leadName}
          </Text>
        </View>
      </View>

      {project.description ? (
        <Text style={styles(palette).description} numberOfLines={2}>
          {stripHtmlTags(project.description, 120)}
        </Text>
      ) : null}

      <View style={styles(palette).footer}>
        <View style={styles(palette).dateContainer}>
          <Text style={styles(palette).dateLabel}>Start:</Text>
          <Text style={styles(palette).dateValue}>
            {formatDate(project.startDate)}
          </Text>
          <Text style={[styles(palette).dateLabel, { marginLeft: 12 }]}>
            End:
          </Text>
          <Text style={styles(palette).dateValue}>
            {formatDate(project.endDate)}
          </Text>
        </View>

        <View style={styles(palette).teamContainer}>
          <Text style={styles(palette).teamLabel}>Team:</Text>
          <View style={styles(palette).teamAvatars}>
            {project.projectOwner && (
              <View style={styles(palette).avatarWrapper}>
                <Avatar
                  imageUrl={project.projectOwner.profilePictureUrl}
                  name={`${project.projectOwner.firstName} ${project.projectOwner.lastName}`}
                  size={32}
                />
              </View>
            )}
            {project.businessAnalyst && (
              <View style={styles(palette).avatarWrapper}>
                <Avatar
                  imageUrl={project.businessAnalyst.profilePictureUrl}
                  name={`${project.businessAnalyst.firstName} ${project.businessAnalyst.lastName}`}
                  size={32}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (palette: ColorPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: palette.border?.secondary || "rgba(0,0,0,0.05)",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    projectAvatar: {
      marginRight: 12,
    },
    headerContent: {
      flex: 1,
    },
    projectName: {
      fontSize: 18,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    projectLead: {
      fontSize: 14,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    description: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
      marginBottom: 16,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    dateLabel: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginRight: 4,
    },
    dateValue: {
      fontSize: 12,
      color: palette.text.secondary,
      fontWeight: "600",
    },
    teamContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    teamLabel: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginRight: 8,
    },
    teamAvatars: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatarWrapper: {
      marginLeft: -8,
      borderWidth: 2,
      borderColor: palette.background.secondary,
      borderRadius: 20,
    },
  });

export default ProjectCard;
