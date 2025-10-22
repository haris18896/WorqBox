import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

// ** Theme
import { isMobile, useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";

// ** Custom Components
import {
  Button,
  DatePicker,
  Modal,
  SingleSelectDropdown,
  Switch,
  TextInput,
} from "@/components/ui";

// ** Store
import {
  useCreateUpdateLeaveRequestMutation,
  useGetLeaveRequestDetailsQuery,
  useGetLeaveTypesQuery,
} from "@/store/api/modules/efs/efsLeaves";

// ** Types
import { LeaveRequest, LeaveType } from "@/store/api/modules/efs/efsTypes";

interface AddLeaveRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedLeaveRequest?: LeaveRequest | null;
}

// Validation schema
const validationSchema = Yup.object().shape({
  leaveTypeId: Yup.number().required("Leave type is required"),
  fromDate: Yup.date().required("Start date is required"),
  toDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("fromDate"), "End date must be after start date"),
  isHalfDay: Yup.boolean(),
  longDescription: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must be less than 500 characters"),
});

// Initial form values
const initialValues = {
  id: null,
  leaveTypeId: null,
  fromDate: new Date(),
  toDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  isHalfDay: false,
  longDescription: "",
};

const AddLeaveRequestModal: React.FC<AddLeaveRequestModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedLeaveRequest,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [createUpdateLeaveRequest, { isLoading }] =
    useCreateUpdateLeaveRequestMutation();

  // API calls
  const { data: leaveTypesData, isLoading: leaveTypesLoading } =
    useGetLeaveTypesQuery();

  // Get leave request details when editing
  const {
    data: leaveRequestDetails,
    isLoading: leaveRequestDetailsLoading,
    refetch: refetchLeaveRequestDetails,
  } = useGetLeaveRequestDetailsQuery(selectedLeaveRequest?.id!, {
    skip: !selectedLeaveRequest?.id,
  });

  // Transform API data for dropdowns
  const leaveTypeOptions =
    leaveTypesData?.items?.map((leaveType: LeaveType) => ({
      id: leaveType.id,
      label: leaveType.name,
      value: leaveType.id,
    })) || [];

  // Determine if we're in edit mode
  const isEditMode =
    selectedLeaveRequest !== null && selectedLeaveRequest !== undefined;

  // Check if data is loading
  const isDataLoading = leaveTypesLoading || leaveRequestDetailsLoading;

  // Create initial values based on mode
  const getInitialValues = () => {
    if (isEditMode && leaveRequestDetails) {
      return {
        id: selectedLeaveRequest.id,
        leaveTypeId: leaveRequestDetails.leaveTypeId,
        fromDate: new Date(leaveRequestDetails.fromDate),
        toDate: new Date(leaveRequestDetails.toDate),
        isHalfDay: leaveRequestDetails.daysCount === 0.5,
        longDescription: leaveRequestDetails.longDescription,
      };
    }
    return initialValues;
  };

  // Refs for form inputs
  const reasonRef = useRef<any>(null);

  // Refetch leave request details when modal opens in edit mode
  useEffect(() => {
    if (visible && isEditMode && selectedLeaveRequest?.id) {
      console.log(
        "Refetching leave request details for ID:",
        selectedLeaveRequest.id
      );
      refetchLeaveRequestDetails();
    }
  }, [
    visible,
    isEditMode,
    selectedLeaveRequest?.id,
    refetchLeaveRequestDetails,
  ]);

  // Use useFormik hook
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setServerErrors({});

        // Validate required fields
        if (!values.leaveTypeId) {
          setServerErrors({
            general: "Please select a leave type",
          });
          return;
        }

        // Prepare API payload
        const leaveData = {
          id: values.id,
          leaveTypeId: values.leaveTypeId,
          fromDate: values.fromDate.toISOString().split("T")[0],
          toDate: values.toDate.toISOString().split("T")[0],
          isHalfDay: values.isHalfDay,
          longDescription: values.longDescription,
        };

        await createUpdateLeaveRequest(leaveData).unwrap();

        onSuccess?.();
        onClose();
      } catch (error: any) {
        if (error?.data?.errors && Array.isArray(error.data.errors)) {
          const fieldErrors: Record<string, string> = {};
          error.data.errors.forEach((err: string) => {
            if (err.includes(":")) {
              const [field, message] = err.split(":");
              fieldErrors[field.trim()] = message.trim();
            }
          });
          setServerErrors(fieldErrors);
        }
      }
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
    setServerErrors({});
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={isEditMode ? "Edit Leave Request" : "Add New Leave Request"}
      subtitle={
        isEditMode
          ? "Update leave request information"
          : "Create a new leave request"
      }
      height={isMobile() ? "70%" : "60%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      {isEditMode && leaveRequestDetailsLoading ? (
        <View style={styles(palette).loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles(palette).loadingText}>
            Loading leave request details...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles(palette).scrollView}
          contentContainerStyle={styles(palette).contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles(palette).formContainer}>
            {/* Reason */}
            <TextInput
              ref={reasonRef}
              title="Reason *"
              placeholder="Enter reason for leave"
              value={formik.values.longDescription}
              onChangeText={(text) => {
                formik.handleChange("longDescription")(text);
                if (serverErrors.longDescription) {
                  setServerErrors((prev) => ({ ...prev, longDescription: "" }));
                }
              }}
              onBlur={formik.handleBlur("longDescription")}
              formikError={
                formik.errors.longDescription || serverErrors.longDescription
              }
              formikTouched={formik.touched.longDescription}
              leftIcon="document-text"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoCapitalize="sentences"
              returnKeyType="done"
            />

            {/* Leave Type */}
            <SingleSelectDropdown
              maxHeight={400}
              title="Leave Type *"
              options={leaveTypeOptions}
              selectedValue={formik.values.leaveTypeId || ""}
              onSelectionChange={(value) => {
                formik.setFieldValue("leaveTypeId", value);
                formik.setFieldTouched("leaveTypeId", true);
                if (serverErrors.leaveTypeId) {
                  setServerErrors((prev) => ({ ...prev, leaveTypeId: "" }));
                }
              }}
              placeholder={
                leaveTypesLoading
                  ? "Loading leave types..."
                  : "Select leave type"
              }
              searchable={true}
              disabled={leaveTypesLoading}
            />

            {/* Date Range */}
            <View style={styles(palette).containerRow}>
              <DatePicker
                title="Start Date *"
                value={formik.values.fromDate.toISOString().split("T")[0]}
                onDateChange={(date) => {
                  formik.setFieldValue("fromDate", new Date(date));
                  formik.setFieldTouched("fromDate", true);
                  if (serverErrors.fromDate) {
                    setServerErrors((prev) => ({ ...prev, fromDate: "" }));
                  }
                }}
                minimumDate={new Date().toISOString().split("T")[0]}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <DatePicker
                title="End Date *"
                value={formik.values.toDate.toISOString().split("T")[0]}
                onDateChange={(date) => {
                  formik.setFieldValue("toDate", new Date(date));
                  formik.setFieldTouched("toDate", true);
                  if (serverErrors.toDate) {
                    setServerErrors((prev) => ({ ...prev, toDate: "" }));
                  }
                }}
                minimumDate={formik.values.fromDate.toISOString().split("T")[0]}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />
            </View>

            {/* Half Day Switch */}
            <View style={styles(palette).switchContainer}>
              <View style={styles(palette).switchLabelContainer}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={palette.text.secondary}
                />
                <Text style={styles(palette).switchLabel}>Half Day</Text>
              </View>
              <Switch
                value={formik.values.isHalfDay}
                onValueChange={(value) => {
                  formik.setFieldValue("isHalfDay", value);
                  formik.setFieldTouched("isHalfDay", true);
                }}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles(palette).buttonContainer}>
              <Button
                size={"small"}
                title="Cancel"
                variant="outline"
                outlineColor="error"
                onPress={handleClose}
                style={styles(palette).cancelButton}
              />
              <Button
                title={isEditMode ? "Update Request" : "Create Request"}
                variant="secondary"
                size={"small"}
                onPress={formik.handleSubmit}
                loading={isLoading}
                disabled={isDataLoading || isLoading}
                leftIcon={
                  <Ionicons
                    name={isEditMode ? "checkmark" : "add"}
                    size={20}
                    color={palette.text.inverse}
                  />
                }
                style={styles(palette).createButton}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

const styles = (palette: any) =>
  StyleSheet.create({
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
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: spacing["lg"],
    },
    formContainer: {
      paddingBottom: spacing.md,
    },
    containerRow: {
      flexDirection: isMobile() ? "column" : "row",
      gap: isMobile() ? 0 : spacing.md,
      justifyContent: isMobile() ? "flex-start" : "space-between",
      alignItems: isMobile() ? "flex-start" : "flex-start",
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
    },
    switchLabelContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: spacing.lg,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
    },
    cancelButton: {
      flex: 0.45,
    },
    createButton: {
      flex: 0.5,
    },
  });

export { AddLeaveRequestModal };
