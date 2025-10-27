import React, { useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Utils
import { spacing, useTheme } from "@/theme";

// ** Third Party Package
import { Ionicons } from "@expo/vector-icons";

// ** UI
import AssetCard from "@/components/modules/ams/assetCard";
import AddAssetModal from "@/components/modules/ams/Modals/AddAsset";
import AssignAssetModal from "@/components/modules/ams/Modals/AssignAsset";
import {
  BarHeader,
  Loading,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";

// ** Store
import {
  useGetAssetCategoriesQuery,
  useGetAssetsQuery,
} from "@/store/api/modules/ams/amsMangament";
import { Asset } from "@/store/api/modules/ams/amsTypes";
import { useGetEmployeesQuery } from "../../../store/api/modules/pms/pmsReportingApi";

export default function Assets() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const {
    data: assetsData,
    isLoading: isLoadingAssets,
    refetch: refetchAssets,
  } = useGetAssetsQuery({
    pageNumber,
    pageSize: 10,
    keyword: searchQuery,
  });

  const { refetch: refetchAssetCategories } = useGetAssetCategoriesQuery({
    pageNumber: 1,
    pageSize: 1000,
    keyword: "",
  });

  const { data: employees } = useGetEmployeesQuery();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchAssets(), refetchAssetCategories()]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleAssetPress = (asset: Asset) => {
    console.log("Asset pressed:", asset);
    // TODO: Navigate to asset details
  };

  const handleAssignAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setAssignModalVisible(true);
  };

  const handleUnassignAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setAssignModalVisible(true);
  };

  const handleCloseAssignModal = () => {
    setAssignModalVisible(false);
    setSelectedAsset(null);
  };

  const handleAssignModalSuccess = () => {
    refetchAssets();
  };

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setModalVisible(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAsset(null);
  };

  const handleModalSuccess = () => {
    refetchAssets();
  };

  const renderAssetCard = ({ item }: { item: Asset }) => (
    <AssetCard
      asset={item}
      employees={employees?.items || []}
      onPress={handleAssetPress}
      onAssign={handleAssignAsset}
      onUnassign={handleUnassignAsset}
      onEdit={handleEditAsset}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      paddingTop: spacing.md,
    },
    headerSection: {
      marginBottom: 20,
      flexDirection: "row",
      gap: spacing["md"],
      paddingHorizontal: spacing["md"],
    },
    searchContainer: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: spacing["sm"],
    },
    actionButton: {
      backgroundColor: palette.primary.main,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    filterButton: {
      backgroundColor: palette.secondary.main,
    },
    buttonText: {
      color: palette.text.inverse,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 6,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    loadingText: {
      color: palette.text.secondary,
      marginTop: 10,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      color: palette.text.secondary,
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Assets" variant="default" />
      <Loading visible={isLoadingAssets} text={"Loading Assets"} />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search assets..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={[styles.actionButton, styles.filterButton]}
              onPress={handleFilterAssets}
            >
              <Ionicons
                name="filter-outline"
                size={18}
                color={palette.text.inverse}
              />
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAddAsset}
            >
              <Ionicons name="add" size={18} color={palette.text.inverse} />
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ResponsiveFlatList
          data={assetsData?.items || []}
          renderItem={renderAssetCard}
          keyExtractor={(item) => item.id.toString()}
          itemSpacing={12}
          columnSpacing={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[palette.primary.main]}
              tintColor={palette.primary.main}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="cube-outline"
                size={64}
                color={palette.text.secondary}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No assets found matching your search"
                  : "No assets available"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <AddAssetModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        selectedAsset={selectedAsset}
      />

      <AssignAssetModal
        visible={assignModalVisible}
        onClose={handleCloseAssignModal}
        onSuccess={handleAssignModalSuccess}
        selectedAsset={selectedAsset}
      />
    </View>
  );
}
