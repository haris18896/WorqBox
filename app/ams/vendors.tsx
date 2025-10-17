import VendorCard from "@/components/modules/ams/vendorCard";
import {
  BarHeader,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";
import { useGetVendorsQuery } from "@/store/api/modules/ams/amsPurchaseOrder";
import { Vendor as VendorType } from "@/store/api/modules/ams/amsTypes";
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

export default function Vendors() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: vendorsData,
    isLoading: isLoadingVendors,
    refetch: refetchVendors,
  } = useGetVendorsQuery({
    pageNumber,
    pageSize: 1000,
    keyword: searchQuery,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchVendors();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleVendorPress = (vendor: VendorType) => {
    console.log("Vendor pressed:", vendor);
    // TODO: Navigate to vendor details
  };

  const handleAddVendor = () => {
    console.log("Add Vendor pressed");
    // TODO: Navigate to add vendor form
  };

  const renderVendorCard = ({ item }: { item: VendorType }) => (
    <VendorCard vendor={item} onPress={handleVendorPress} />
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
  });

  if (isLoadingVendors && !vendorsData) {
    return (
      <View style={styles.container}>
        <BarHeader title="Vendors" variant="default" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles.loadingText}>Loading vendors...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarHeader title="Vendors" variant="default" />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search vendors..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddVendor}>
            <Ionicons name="add" size={20} color={palette.text.inverse} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <ResponsiveFlatList
          data={vendorsData?.items || []}
          renderItem={renderVendorCard}
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
                name="business-outline"
                size={64}
                color={palette.text.secondary}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No vendors found matching your search"
                  : "No vendors available"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
