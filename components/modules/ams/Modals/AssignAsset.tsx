import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

// ** Theme
import { isMobile, useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";

// ** Custom Components
import { Button, Modal, SingleSelectDropdown } from "@/components/ui";

// ** Store
import {
  useAssignAssetMutation,
  useUnassignAssetMutation,
} from "@/store/api/modules/ams/amsMangament";

// ** Types
import { Asset } from "@/store/api/modules/ams/amsTypes";
import { useGetEmployeesQuery } from "@/store/api/modules/pms/pmsReportingApi";

interface AssignAssetModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedAsset: Asset | null;
}

const validationSchema = Yup.object().shape({
  employeeId: Yup.number()
    .required("Please select an employee")
    .typeError("Please select an employee"),
});

const initialValues = {
  employeeId: null as number | null,
};

const AssignAssetModal: React.FC<AssignAssetModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedAsset,
}) => {
  const { palette } = useTheme();
  const [assignAsset, { isLoading: isAssigning }] = useAssignAssetMutation();
  const [unassignAsset, { isLoading: isUnassigning }] =
    useUnassignAssetMutation();
  const [error, setError] = useState<string>("");

  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetEmployeesQuery();

  const isAlreadyAssigned = selectedAsset?.assignedEmployee !== null;

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: false,
    onSubmit: async (values) => {
      try {
        setError("");

        await assignAsset({
          assetId: selectedAsset!.id,
          data: { employeeId: values.employeeId as number },
        }).unwrap();

        onSuccess?.();
        onClose();
      } catch (error: any) {
        setError(error?.data?.message || "Failed to assign/unassign asset");
      }
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
    setError("");
  };

  const formatEmployeesForDropdown = () => {
    if (!employeesData?.items) return [];
    return employeesData.items.map((employee) => ({
      id: employee.id,
      label: employee.fullName,
      value: employee.id,
    }));
  };

  const employeeOptions = formatEmployeesForDropdown();

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={isAlreadyAssigned ? "Unassign Asset" : "Assign Asset"}
      subtitle={
        isAlreadyAssigned
          ? "Remove assignment from this asset"
          : "Assign this asset to an employee"
      }
      height={isAlreadyAssigned ? "40%" : isMobile() ? "45%" : "40%"}
      variant="centered"
      animationType="fade"
      closeOnBackdrop={true}
    >
      <View style={styles(palette).container}>
        {isLoadingEmployees ? (
          <View style={styles(palette).loadingContainer}>
            <ActivityIndicator size="large" color={palette.primary.main} />
            <Text style={styles(palette).loadingText}>
              Loading employees...
            </Text>
          </View>
        ) : (
          <>
            {/* Asset Information */}
            <View style={styles(palette).assetInfoContainer}>
              <View style={styles(palette).assetInfoRow}>
                <Ionicons
                  name="cube-outline"
                  size={20}
                  color={palette.primary.main}
                />
                <Text style={styles(palette).assetInfoLabel}>Name:</Text>
                <Text style={styles(palette).assetInfoValue}>
                  {selectedAsset?.name}
                </Text>
              </View>
              <View style={styles(palette).assetInfoRow}>
                <Ionicons
                  name="barcode-outline"
                  size={20}
                  color={palette.primary.main}
                />
                <Text style={styles(palette).assetInfoLabel}>
                  Serial Number:
                </Text>
                <Text style={styles(palette).assetInfoValue}>
                  {selectedAsset?.serialNumber}
                </Text>
              </View>
              <View style={styles(palette).assetInfoRow}>
                <Ionicons
                  name="folder-outline"
                  size={20}
                  color={palette.primary.main}
                />
                <Text style={styles(palette).assetInfoLabel}>Category:</Text>
                <Text style={styles(palette).assetInfoValue}>
                  {selectedAsset?.assetCategory.name}
                </Text>
              </View>
              {isAlreadyAssigned && (
                <View style={styles(palette).assetInfoRow}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={palette.primary.main}
                  />
                  <Text style={styles(palette).assetInfoLabel}>
                    Currently Assigned To:
                  </Text>
                  <Text style={styles(palette).assetInfoValue}>
                    {selectedAsset?.assignedEmployee?.fullName}
                  </Text>
                </View>
              )}
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles(palette).errorContainer}>
                <Text style={styles(palette).errorText}>{error}</Text>
              </View>
            )}

            {/* Employee Selection (only show if not already assigned) */}
            {!isAlreadyAssigned && (
              <SingleSelectDropdown
                title="Select Employee *"
                options={employeeOptions}
                selectedValue={formik.values.employeeId || ""}
                onSelectionChange={(id) => {
                  formik.setFieldValue("employeeId", id);

                  if (error) setError("");
                }}
                placeholder="Select employee"
                formikError={formik.errors.employeeId?.toString() || error}
                formikTouched={formik.touched.employeeId}
                searchable={true}
                maxHeight={300}
                disabled={isAssigning || isUnassigning}
              />
            )}

            {/* Action Buttons */}
            <View style={styles(palette).buttonContainer}>
              <Button
                size={"small"}
                title="Cancel"
                variant="outline"
                outlineColor="error"
                onPress={handleClose}
                style={styles(palette).cancelButton}
                disabled={isAssigning || isUnassigning}
              />
              <Button
                title={isAlreadyAssigned ? "Unassign" : "Assign"}
                variant={isAlreadyAssigned ? "error" : "secondary"}
                size={"small"}
                onPress={async () => {
                  if (isAlreadyAssigned) {
                    await unassignAsset(selectedAsset!.id).unwrap();
                    onSuccess?.();
                    onClose();
                  } else {
                    formik.handleSubmit();
                  }
                }}
                loading={isAssigning || isUnassigning}
                disabled={isAssigning || isUnassigning}
                leftIcon={
                  <Ionicons
                    name={isAlreadyAssigned ? "person-remove" : "person-add"}
                    size={20}
                    color={palette.text.inverse}
                  />
                }
                style={styles(palette).actionButton}
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = (palette: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: spacing.xl,
    },
    loadingText: {
      fontSize: 16,
      color: palette.text.secondary,
      marginTop: spacing.md,
    },
    assetInfoContainer: {
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    assetInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    assetInfoLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.secondary,
      marginLeft: spacing.sm,
      marginRight: spacing.xs,
    },
    assetInfoValue: {
      fontSize: 14,
      color: palette.text.primary,
      flex: 1,
    },
    errorContainer: {
      backgroundColor: `${palette.error.light}20`,
      padding: spacing.md,
      borderRadius: 8,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: palette.error.main,
    },
    errorText: {
      color: palette.error.main,
      fontSize: 14,
      fontWeight: "500",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: spacing.lg,
      paddingTop: spacing.md,
    },
    cancelButton: {
      flex: 0.45,
    },
    actionButton: {
      flex: 0.5,
    },
  });

export default AssignAssetModal;
