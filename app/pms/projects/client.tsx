import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// Utils
import { ColorPalette, isMobile, spacing, useTheme } from "@/theme";

// ** Custom Components
import { ClientsCard } from "@/components/modules/pms/ClientsCard";
import { AddClientModal } from "@/components/modules/pms/Modals/AddClient";
import {
  BarHeader,
  Button,
  Empty,
  Loading,
  ResponsiveFlatList,
} from "@/components/ui";

// ** Store
import {
  useDeleteProjectClientMutation,
  useGetClientProjectsQuery,
} from "@/store/api/modules/pms/pmsProjects";

// ** Types
import { DeleteModal } from "@/components/ui/Modal";
import { ClientProject } from "@/store/api/modules/pms/pmsTypes";

export default function ClientManagement() {
  const { palette } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const [selectedClient, setSelectedClient] = useState<ClientProject | null>(
    null
  );
  const [modal, setModal] = useState<string | null>(null);

  const {
    data: clientProjectsResponse,
    isLoading,
    error,
    refetch,
  } = useGetClientProjectsQuery({
    pageNumber: 1,
    pageSize: 50,
  });

  const [deleteProjectClient, { isLoading: isDeleting }] =
    useDeleteProjectClientMutation();

  const clientProjects = clientProjectsResponse?.items || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    try {
      await deleteProjectClient(selectedClient.id).unwrap();
      setModal(null);
      setSelectedClient(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const renderHeader = () => (
    <View style={styles(palette).header}>
      <Text style={styles(palette).headerTitle}>Client Projects</Text>
      <Button
        title="Add Client"
        onPress={() => setModal("addClient")}
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
  }) => (
    <ClientsCard
      key={index}
      project={item}
      // isUpdating={selectedClient?.id === item.id}
      isUpdating={false}
      isDeleting={isDeleting && selectedClient?.id === item.id}
      onDelete={(client) => {
        setModal("deleteClient");
        setSelectedClient(client);
      }}
      onUpdate={(client) => {
        setModal("addClient");
        setSelectedClient(client);
      }}
    />
  );

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

      <AddClientModal
        visible={modal === "addClient"}
        onClose={() => {
          setModal(null);
          setSelectedClient(null);
        }}
        onSuccess={() => refetch()}
        selectedClient={selectedClient}
      />

      <DeleteModal
        isLoading={isDeleting}
        height={isMobile() ? "35%" : "27%"}
        visible={modal === "deleteClient"}
        onClose={() => {
          setModal(null);
          setSelectedClient(null);
        }}
        onDelete={handleDeleteClient}
        title="Delete Client"
        description={`Are you sure you want to delete ${selectedClient?.name}?`}
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
