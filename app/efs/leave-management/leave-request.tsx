import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Utils
import { spacing, useTheme } from "@/theme";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// ** UI
import LeaveRequestCard from "@/components/modules/efs/leaveRequestCard";
import {
  BarHeader,
  Empty,
  Loading,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";

// ** Store
import { RootState } from "@/store";
import {
  useGetLeaveStatusCountQuery,
  useGetLeaveTypesQuery,
  useGetMyLeaveRequestsQuery,
} from "@/store/api/modules/efs/efsLeaves";
import { LeaveStatusCountParams } from "@/store/api/modules/efs/efsTypes";
import { useSelector } from "react-redux";

export default function LeaveRequest() {
  const { palette } = useTheme();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pageSize = 10;

  const { user } = useSelector((state: RootState) => state.auth);

  // Debounce search keyword
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
      setCurrentPage(1); // Reset to first page when searching
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // API calls
  const {
    data: leaveRequestsData,
    isLoading: isLoadingRequests,
    error: requestsError,
    refetch: refetchRequests,
  } = useGetMyLeaveRequestsQuery({
    pageNumber: currentPage,
    pageSize,
    keyword: debouncedSearchKeyword || undefined,
  });

  const {
    data: statusCountData,
    isLoading: isLoadingStatusCount,
    refetch: refetchStatusCount,
  } = useGetLeaveStatusCountQuery({
    employeeId: user?.employeeId,
  } as LeaveStatusCountParams);

  const {
    data: leaveTypesData,
    isLoading: isLoadingLeaveTypes,
    refetch: refetchLeaveTypes,
  } = useGetLeaveTypesQuery();

  const handleSearch = useCallback((text: string) => {
    setSearchKeyword(text);
  }, []);

  const handleRefresh = async () => {
    try {
      await Promise.all([
        refetchRequests(),
        refetchStatusCount(),
        refetchLeaveTypes(),
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleCardPress = (leaveRequest: any) => {
    // TODO: Implement navigation to leave request details
    console.log("View leave request details:", leaveRequest.id);
  };

  const renderLeaveRequestCard = ({ item }: { item: any }) => (
    <LeaveRequestCard
      leaveRequest={item}
      onPress={() => handleCardPress(item)}
    />
  );

  const renderStatusCards = () => {
    if (isLoadingStatusCount) return null;

    const statusCards = [
      {
        title: "Pending",
        count: statusCountData?.pendingRequestCount || 0,
        color: palette.warning.main,
        icon: "time-outline",
      },
      {
        title: "Approved",
        count: statusCountData?.approveRequestCount || 0,
        color: palette.success.main,
        icon: "checkmark-circle-outline",
      },
      {
        title: "Rejected",
        count: statusCountData?.rejectedRequestCount || 0,
        color: palette.error.main,
        icon: "close-circle-outline",
      },
    ];

    return (
      <View style={styles.statusCardsContainer}>
        {statusCards.map((card, index) => (
          <View key={index} style={styles.statusCard}>
            <View style={styles.statusCardHeader}>
              <Ionicons name={card.icon as any} size={24} color={card.color} />
              <Text style={[styles.statusCardCount, { color: card.color }]}>
                {card.count}
              </Text>
            </View>
            <Text style={styles.statusCardTitle}>{card.title}</Text>
          </View>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing["md"],
      gap: 12,
    },
    searchContainer: {
      flex: 1,
    },
    addButton: {
      backgroundColor: palette.primary.main,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    addButtonText: {
      color: palette.background.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    statusCardsContainer: {
      flexDirection: "row",
      marginBottom: 20,
      gap: 12,
    },
    statusCard: {
      flex: 1,
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statusCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      gap: 8,
    },
    statusCardCount: {
      fontSize: 20,
      fontWeight: "700",
    },
    statusCardTitle: {
      fontSize: 12,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 16,
    },
    listContainer: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: palette.text.secondary,
      textAlign: "center",
      marginTop: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Leave Requests" variant="large" />
      <Loading visible={isLoadingRequests} text={"Fetching leave requests"} />
      <ResponsiveFlatList
        data={leaveRequestsData?.items || []}
        renderItem={renderLeaveRequestCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingRequests}
            onRefresh={handleRefresh}
            colors={[palette.primary.main]}
            tintColor={palette.primary.main}
          />
        }
        ListHeaderComponent={() => (
          <>
            {/* Search and Add Button Row */}
            <View style={styles.headerRow}>
              <View style={styles.searchContainer}>
                <SearchComponent
                  placeholder="Search by employee name or email..."
                  value={searchKeyword}
                  onChangeText={handleSearch}
                />
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={palette.background.primary}
                />
                <Text style={styles.addButtonText}>Request</Text>
              </TouchableOpacity>
            </View>

            {/* Status Cards */}
            {renderStatusCards()}

            {/* Leave Requests List */}
            <Text style={styles.sectionTitle}>My Leave Requests</Text>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Empty
              subtitle={
                searchKeyword
                  ? "No leave requests found matching your search."
                  : "No leave requests found."
              }
            />
          </View>
        )}
        ListFooterComponent={() =>
          isLoadingRequests ? (
            <View style={styles.loadingContainer}>
              <Loading visible={true} />
            </View>
          ) : requestsError ? (
            <View style={styles.emptyContainer}>
              <Empty />
              <Text style={styles.emptyText}>
                Failed to load leave requests. Please try again.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
