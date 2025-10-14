import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// Utils
import { ColorPalette, spacing, useTheme } from "@/theme";

// ** Custom Components
import { ProjectCard } from "@/components/pms/ProjectCard";
import {
  BarHeader,
  Button,
  Empty,
  Loading,
  ResponsiveFlatList,
} from "@/components/ui";

// ** Store
import { useGetMainProjectsQuery } from "@/store/api/modules/pms/pmsProjects";

// ** Types
import { Project } from "@/store/api/modules/pms/pmsTypes";

export default function ProjectsMain() {
  const { palette } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: projectsResponse,
    isLoading,
    error,
    refetch,
  } = useGetMainProjectsQuery();

  const projects = projectsResponse?.items || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleAddProject = () => {
    // TODO: Open modal for adding project
    console.log("Add Project clicked");
  };

  const handleProjectPress = (project: Project) => {
    console.log("Project pressed:", project.name);
    // TODO: Navigate to project details
  };

  const renderHeader = () => (
    <View style={styles(palette).header}>
      <Text style={styles(palette).headerTitle}>Main Projects</Text>
      <Button
        title="Add Project"
        onPress={handleAddProject}
        variant="secondary"
        size="small"
        leftIcon={
          <Ionicons name="add" size={20} color={palette.text.inverse} />
        }
      />
    </View>
  );

  const renderItem = ({ item, index }: { item: Project; index: number }) => (
    <ProjectCard project={item} onPress={handleProjectPress} />
  );

  const renderEmpty = () => (
    <View style={styles(palette).emptyContainer}>
      <Empty
        title="No Projects Yet"
        subtitle="Start by creating your first project"
      />
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles(palette).container}>
        <BarHeader title="Projects" variant="default" />
        <Loading visible={true} text="Fetching projects" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(palette).container}>
        <BarHeader title="Projects" variant="default" />
        <View style={styles(palette).errorContainer}>
          <Text style={styles(palette).errorText}>
            Failed to load projects. Please try again.
          </Text>
          <Text
            style={[styles(palette).errorText, { fontSize: 12, marginTop: 8 }]}
          >
            Error: {JSON.stringify(error)}
          </Text>
          <Button title="Retry" onPress={handleRefresh} variant="outline" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles(palette).container}>
      <BarHeader title="Projects" variant="default" />
      <ResponsiveFlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          projects.length === 0 ? { flex: 1 } : styles(palette).listContainer
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={palette.primary.main}
            colors={[palette.primary.main]}
          />
        }
        showsVerticalScrollIndicator={false}
        itemSpacing={12}
        columnSpacing={16}
      />
    </View>
  );
}

const styles = (palette: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
    },
    header: {
      padding: 16,
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing["sm"],
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 14,
      color: palette.text.secondary,
      marginBottom: 16,
    },
    listContainer: {
      padding: 16,
      paddingTop: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: palette.error?.main || "#ef4444",
      textAlign: "center",
      marginBottom: 16,
    },
  });
