import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// Utils
import { ColorPalette, isMobile, spacing, useTheme } from "@/theme";

// ** Custom Components
import { AddProjectModal } from "@/components/modules/pms/Modals/AddProject";
import { ProjectCard } from "@/components/modules/pms/ProjectCard";
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
import { DeleteModal } from "@/components/ui/Modal";
import { Project } from "@/store/api/modules/pms/pmsTypes";

export default function ProjectsMain() {
  const { palette } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modal, setModal] = useState<string | null>(null);

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
    setModal("addProject");
    setSelectedProject(null);
  };

  const handleProjectPress = (project: Project) => {
    console.log("Project pressed:", project.name);
    // TODO: Navigate to project details
  };

  const handleEditProject = (project: Project) => {
    setModal("addProject");
    setSelectedProject(project);
  };

  const handleDeleteProject = (project: Project) => {
    setModal("deleteProject");
    setSelectedProject(project);
  };

  const handleViewProject = (project: Project) => {
    console.log("View project:", project.name);
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
    <ProjectCard
      key={index}
      project={item}
      onPress={handleProjectPress}
      onEdit={handleEditProject}
      onDelete={handleDeleteProject}
      onView={handleViewProject}
    />
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
        itemSpacing={2}
        columnSpacing={12}
      />

      {/* Add Project Modal */}
      <AddProjectModal
        visible={modal === "addProject"}
        onClose={() => {
          setModal(null);
          setSelectedProject(null);
        }}
        onSuccess={() => refetch()}
        selectedProject={selectedProject}
      />

      {/* Delete Project Modal */}
      <DeleteModal
        isLoading={false}
        height={isMobile() ? "35%" : "27%"}
        visible={modal === "deleteProject"}
        onClose={() => {
          setModal(null);
          setSelectedProject(null);
        }}
        onDelete={() => {
          // TODO: Implement delete API
          console.log("Delete project:", selectedProject?.name);
          setModal(null);
          setSelectedProject(null);
        }}
        title="Delete Project"
        description={`Are you sure you want to delete ${selectedProject?.name}?`}
        subtitle="This action cannot be undone."
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
      padding: spacing.sm,
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
