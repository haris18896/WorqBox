import PurchaseOrderCard from "@/components/modules/ams/purchaseOrderCard";
import {
  BarHeader,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";
import {
  useGetPurchaseOrdersQuery,
  useGetVendorsQuery,
} from "@/store/api/modules/ams/amsPurchaseOrder";
import { PurchaseOrder as PurchaseOrderType } from "@/store/api/modules/ams/amsTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PurchaseOrder() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: purchaseOrdersData,
    isLoading: isLoadingPurchaseOrders,
    refetch: refetchPurchaseOrders,
  } = useGetPurchaseOrdersQuery({
    pageNumber,
    pageSize: 10,
    keyword: searchQuery,
  });

  const { data: vendorsData } = useGetVendorsQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchPurchaseOrders();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handlePurchaseOrderPress = (purchaseOrder: PurchaseOrderType) => {
    console.log("Purchase Order pressed:", purchaseOrder);
    // TODO: Navigate to purchase order details
  };

  const handleAddPurchaseOrder = () => {
    console.log("Add Purchase Order pressed");
    // TODO: Navigate to add purchase order form
  };

  const renderPurchaseOrderCard = ({ item }: { item: PurchaseOrderType }) => (
    <PurchaseOrderCard
      purchaseOrder={item}
      onPress={handlePurchaseOrderPress}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
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
    statsContainer: {
      backgroundColor: palette.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statsText: {
      fontSize: 14,
      color: palette.text.secondary,
      textAlign: "center",
    },
  });

  if (isLoadingPurchaseOrders && !purchaseOrdersData) {
    return (
      <View style={styles.container}>
        <BarHeader title="Purchase Orders" variant="default" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles.loadingText}>Loading purchase orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarHeader title="Purchase Orders" variant="default" />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search purchase orders..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPurchaseOrder}
          >
            <Ionicons name="add" size={20} color={palette.text.inverse} />
            <Text style={styles.addButtonText}>Add </Text>
          </TouchableOpacity>
        </View>

        <ResponsiveFlatList
          data={purchaseOrdersData?.items || []}
          renderItem={renderPurchaseOrderCard}
          keyExtractor={(item) => item.id.toString()}
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
                name="receipt-outline"
                size={64}
                color={palette.text.secondary}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No purchase orders found matching your search"
                  : "No purchase orders available"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
