import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ** Utils
import { useTheme } from "@/theme";
import { borderRadius, shadow, spacing } from "@/theme/stylingConstants";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// ** UI Components
import ApprovedRequestCard from "@/components/modules/efs/approvedRequestCard";
import { BarHeader, Loading, ResponsiveFlatList } from "@/components/ui";

// ** Store
import {
  useGetLeaveRequestsByAdminQuery,
  useGetLeaveStatusCountAdminQuery,
} from "@/store/api/modules/efs/efsLeaves";

export default function ApprovalRequest() {
  const { palette } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: statusCounts, isLoading: statusLoading } =
    useGetLeaveStatusCountAdminQuery();

  const { data: leaveRequests, isLoading: requestsLoading } =
    useGetLeaveRequestsByAdminQuery({
      pageNumber: 1,
      pageSize: 50,
      keyword: searchKeyword,
    });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredRequests =
    leaveRequests?.items.filter((request) => {
      switch (selectedStatus) {
        case "pending":
          return !request.isApproved && !request.isRejected;
        case "approved":
          return request.isApproved;
        case "rejected":
          return request.isRejected;
        default:
          return true;
      }
    }) || [];

  const handleApprove = (id: number) => {
    console.log("Approve request:", id);
    // TODO: Implement approve functionality
  };

  const handleReject = (id: number) => {
    console.log("Reject request:", id);
    // TODO: Implement reject functionality
  };

  const handleViewDetails = (id: number) => {
    console.log("View details for request:", id);
    // TODO: Implement view details functionality
  };

  const renderStatusToggler = () => {
    const statusOptions = [
      {
        key: "all",
        label: "All",
        count: statusCounts
          ? statusCounts.pendingRequestCount +
            statusCounts.approveRequestCount +
            statusCounts.rejectedRequestCount
          : 0,
      },
      {
        key: "pending",
        label: "Pending",
        count: statusCounts?.pendingRequestCount || 0,
      },
      {
        key: "approved",
        label: "Approved",
        count: statusCounts?.approveRequestCount || 0,
      },
      {
        key: "rejected",
        label: "Rejected",
        count: statusCounts?.rejectedRequestCount || 0,
      },
    ];

    return (
      <View style={styles.statusToggler}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.statusButton,
              selectedStatus === option.key && styles.statusButtonActive,
            ]}
            onPress={() => setSelectedStatus(option.key as any)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.statusButtonText,
                selectedStatus === option.key && styles.statusButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
            <View
              style={[
                styles.statusCount,
                selectedStatus === option.key && styles.statusCountActive,
              ]}
            >
              <Text
                style={[
                  styles.statusCountText,
                  selectedStatus === option.key && styles.statusCountTextActive,
                ]}
              >
                {option.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderLeaveRequest = ({ item }: { item: any }) => (
    <ApprovedRequestCard
      leaveRequest={item}
      onApprove={handleApprove}
      onReject={handleReject}
      onViewDetails={handleViewDetails}
      showActions={selectedStatus === "all" || selectedStatus === "pending"}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    headerCard: {
      backgroundColor: palette.surface.primary,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      ...shadow.sm,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.sm,
    },
    cardDescription: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    statusToggler: {
      flexDirection: "row",
      backgroundColor: palette.surface.secondary,
      borderRadius: borderRadius.md,
      padding: spacing.xs,
    },
    statusButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.sm,
    },
    statusButtonActive: {
      backgroundColor: palette.secondary.main,
    },
    statusButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.secondary,
    },
    statusButtonTextActive: {
      color: "white",
    },
    statusCount: {
      backgroundColor: palette.surface.primary,
      borderRadius: borderRadius.full,
      minWidth: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: spacing.xs,
    },
    statusCountActive: {
      backgroundColor: palette.text.inverse,
    },
    statusCountText: {
      fontSize: 10,
      fontWeight: "600",
      color: palette.text.primary,
    },
    statusCountTextActive: {
      color: palette.text.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.xl,
    },
    loadingText: {
      marginTop: spacing.md,
      fontSize: 16,
      color: palette.text.secondary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.xl,
    },
    emptyText: {
      fontSize: 16,
      color: palette.text.tertiary,
      textAlign: "center",
    },
    listContainer: {
      flex: 1,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.surface.secondary,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
    },
    searchIcon: {
      fontSize: 16,
      color: palette.text.tertiary,
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: palette.text.primary,
      paddingVertical: spacing.xs,
    },
    clearButton: {
      padding: spacing.xs,
    },
    clearIcon: {
      fontSize: 16,
      color: palette.text.tertiary,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Leave Approval Requests" variant="large" />
      <Loading
        visible={statusLoading || requestsLoading}
        text="Loading requests..."
      />
      <View style={styles.headerCard}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by employee name or email..."
            placeholderTextColor={palette.text.tertiary}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchText("")}
            >
              <Ionicons name="close-circle" style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
        {renderStatusToggler()}
      </View>

      <View style={styles.listContainer}>
        {filteredRequests.length > 0 ? (
          <ResponsiveFlatList
            data={filteredRequests}
            renderItem={renderLeaveRequest}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: spacing.md }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-outline"
              size={48}
              color={palette.text.tertiary}
            />
            <Text style={styles.emptyText}>
              No {selectedStatus === "all" ? "" : selectedStatus} requests found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
