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
import AssetTypeCard from "@/components/modules/ams/assetTypeCard";
import AddAssetTypeModal from "@/components/modules/ams/Modals/AddAssetType";
import {
  BarHeader,
  Loading,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";

// ** Store
import { DeleteModal } from "@/components/ui/Modal";
import {
  useDeleteAssetCategoryMutation,
  useGetAssetCategoriesQuery,
} from "@/store/api/modules/ams/amsMangament";
import { AssetTypesCategory as AssetCategoryType } from "@/store/api/modules/ams/amsTypes";

export default function AssetTypes() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddAssetTypeModal, setShowAddAssetTypeModal] = useState(false);
  const [selectedAssetType, setSelectedAssetType] =
    useState<AssetCategoryType | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [assetTypeToDelete, setAssetTypeToDelete] =
    useState<AssetCategoryType | null>(null);

  const {
    data: assetCategoriesData,
    isLoading: isLoadingAssetCategories,
    refetch: refetchAssetCategories,
  } = useGetAssetCategoriesQuery({
    pageNumber,
    pageSize: 10,
    keyword: searchQuery,
  });

  const [deleteAssetCategory, { isLoading: isDeleting }] =
    useDeleteAssetCategoryMutation();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAssetCategories();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleEditAssetCategory = (assetCategory: AssetCategoryType) => {
    setSelectedAssetType(assetCategory);
    setShowAddAssetTypeModal(true);
  };

  const handleDeleteAssetCategory = (assetCategory: AssetCategoryType) => {
    setAssetTypeToDelete(assetCategory);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setAssetTypeToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (assetTypeToDelete) {
      try {
        await deleteAssetCategory(assetTypeToDelete.id).unwrap();
        refetchAssetCategories();
        handleDeleteModalClose();
      } catch (error) {
        console.error("Failed to delete asset category:", error);
      }
    }
  };

  const handleAddAssetCategory = () => {
    setSelectedAssetType(null);
    setShowAddAssetTypeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddAssetTypeModal(false);
    setSelectedAssetType(null);
  };

  const renderAssetTypeCard = ({ item }: { item: AssetCategoryType }) => (
    <AssetTypeCard
      assetCategory={item}
      onPress={handleEditAssetCategory}
      onEdit={handleEditAssetCategory}
      onDelete={handleDeleteAssetCategory}
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
    addButton: {
      backgroundColor: palette.primary.main,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    addButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
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
      <BarHeader title="Asset Types" variant="default" />
      <Loading
        visible={isLoadingAssetCategories}
        text={"Loading Asset Types"}
      />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search asset types..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAssetCategory}
          >
            <Ionicons name="add" size={20} color={palette.text.inverse} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <ResponsiveFlatList
          data={assetCategoriesData?.items || []}
          renderItem={renderAssetTypeCard}
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
                name="folder-outline"
                size={64}
                color={palette.text.secondary}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No asset types found matching your search"
                  : "No asset types available"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <AddAssetTypeModal
        visible={showAddAssetTypeModal}
        onClose={handleCloseModal}
        onSuccess={() => refetchAssetCategories()}
        selectedAssetType={selectedAssetType}
      />

      <DeleteModal
        height="40%"
        visible={isDeleteModalVisible}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirm}
        title="Delete Asset Type"
        subtitle="This action cannot be undone."
        description={`This will permanently delete the asset type "${
          assetTypeToDelete?.name || "Unknown"
        }". Are you sure you want to delete this asset type?`}
        isLoading={isDeleting}
      />
    </View>
  );
}
