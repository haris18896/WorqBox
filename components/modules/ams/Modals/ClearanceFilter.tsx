import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Utils
import { spacing, useTheme } from "@/theme";

// ** UI
import { SingleSelectDropdown } from "@/components/ui";

// ** Types
import { EmployeeObject } from "@/store/api/modules/pms/pmsTypes";

interface ClearanceFilterProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    employeeId?: number;
    hasCurrentAssets?: boolean;
  }) => void;
  employees: EmployeeObject[];
  currentFilters: {
    employeeId?: number;
    hasCurrentAssets?: boolean;
  };
}

const ClearanceFilter: React.FC<ClearanceFilterProps> = ({
  visible,
  onClose,
  onApplyFilters,
  employees,
  currentFilters,
}) => {
  const { palette } = useTheme();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<
    number | undefined
  >(currentFilters.employeeId);
  const [selectedHasCurrentAssets, setSelectedHasCurrentAssets] = useState<
    boolean | undefined
  >(currentFilters.hasCurrentAssets);

  // Convert employees to dropdown options
  const employeeOptions = [
    { id: "all", label: "All Employees", value: undefined },
    ...employees.map((employee) => ({
      id: employee.id.toString(),
      label: `${employee.fullName} (${employee.employeeNumber})`,
      value: employee.id,
    })),
  ];

  // Has current assets options
  const hasCurrentAssetsOptions = [
    { id: "all", label: "All", value: undefined },
    { id: "yes", label: "Yes", value: true },
    { id: "no", label: "No", value: false },
  ];

  const handleApplyFilters = () => {
    const filters: {
      employeeId?: number;
      hasCurrentAssets?: boolean;
    } = {};

    // Only add employeeId if not "all"
    if (selectedEmployeeId !== undefined) {
      filters.employeeId = selectedEmployeeId;
    }

    // Only add hasCurrentAssets if not "all"
    if (selectedHasCurrentAssets !== undefined) {
      filters.hasCurrentAssets = selectedHasCurrentAssets;
    }

    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedEmployeeId(undefined);
    setSelectedHasCurrentAssets(undefined);
    onApplyFilters({});
    onClose();
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: palette.background.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      maxHeight: "80%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: palette.text.primary,
    },
    closeButton: {
      padding: spacing.sm,
    },
    filterSection: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: palette.text.primary,
      marginBottom: spacing.sm,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: spacing.md,
      marginTop: spacing.lg,
    },
    applyButton: {
      flex: 1,
      backgroundColor: palette.primary.main,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: "center",
    },
    clearButton: {
      flex: 1,
      backgroundColor: palette.background.secondary,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: palette.border.primary,
    },
    applyButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
    },
    clearButtonText: {
      color: palette.text.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter Clearance</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={palette.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Employee</Text>
            <SingleSelectDropdown
              options={employeeOptions}
              selectedValue={
                selectedEmployeeId ? selectedEmployeeId.toString() : "all"
              }
              onSelectionChange={(value) => {
                if (value === "all") {
                  setSelectedEmployeeId(undefined);
                } else {
                  setSelectedEmployeeId(parseInt(value as string));
                }
              }}
              placeholder="Select employee..."
              searchable={true}
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Has Current Assets</Text>
            <SingleSelectDropdown
              options={hasCurrentAssetsOptions}
              selectedValue={
                selectedHasCurrentAssets === undefined
                  ? "all"
                  : selectedHasCurrentAssets
                  ? "yes"
                  : "no"
              }
              onSelectionChange={(value) => {
                if (value === "all") {
                  setSelectedHasCurrentAssets(undefined);
                } else {
                  setSelectedHasCurrentAssets(value === "yes");
                }
              }}
              placeholder="Select option..."
              searchable={false}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClearanceFilter;
