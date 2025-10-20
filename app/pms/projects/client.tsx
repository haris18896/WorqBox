import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// Utils
import { ColorPalette, spacing, useTheme } from "@/theme";

// ** Custom Components
import { ClientsCard } from "@/components/modules/pms/ClientsCard";
import {
  BarHeader,
  Button,
  Empty,
  Loading,
  ResponsiveFlatList,
} from "@/components/ui";

// ** Store
import { useGetClientProjectsQuery } from "@/store/api/modules/pms/pmsProjects";

// ** Types
import { ClientProject } from "@/store/api/modules/pms/pmsTypes";

export default function ClientManagement() {
  const { palette } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: clientProjectsResponse,
    isLoading,
    error,
    refetch,
  } = useGetClientProjectsQuery({
    pageNumber: 1,
    pageSize: 50,
  });

  const clientProjects = clientProjectsResponse?.items || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleAddClient = () => {
    // TODO: Open modal for adding client
    console.log("Add Client clicked");
  };

  const handleClientPress = (client: ClientProject) => {
    console.log("Client pressed:", client.companyName);
    // TODO: Navigate to client details
  };

  const renderHeader = () => (
    <View style={styles(palette).header}>
      <Text style={styles(palette).headerTitle}>Client Projects</Text>
      <Button
        title="Add Client"
        onPress={handleAddClient}
        variant="secondary"
        size="small"
        leftIcon={
          <Ionicons name="add" size={20} color={palette.text.inverse} />
        }
      />
    </View>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: ClientProject;
    index: number;
  }) => <ClientsCard key={index} project={item} onPress={handleClientPress} />;

  const renderEmpty = () => (
    <View style={styles(palette).emptyContainer}>
      <Empty
        title="No Client Projects Yet"
        subtitle="Start by adding your first client project"
      />
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles(palette).container}>
        <BarHeader title="Client Projects" variant="default" />
        <Loading visible={true} text="Fetching Client" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(palette).container}>
        <BarHeader title="Client Projects" variant="default" />
        <View style={styles(palette).errorContainer}>
          <Text style={styles(palette).errorText}>
            Failed to load client projects. Please try again.
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
      <BarHeader title="Manage Clients" variant="default" />
      <ResponsiveFlatList
        data={clientProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          clientProjects.length === 0
            ? { flex: 1 }
            : styles(palette).listContainer
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
