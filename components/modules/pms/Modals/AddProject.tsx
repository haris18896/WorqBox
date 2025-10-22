import React, { useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

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
  MultiSelectDropdown,
  SingleSelectDropdown,
  TextInput,
} from "@/components/ui";

// ** Store
import { useGetClientProjectsQuery } from "@/store/api/modules/pms/pmsProjects";
import { useGetEmployeesQuery } from "@/store/api/modules/pms/pmsReportingApi";

// ** Types
import {
  ClientProject,
  EmployeeObject,
  Project,
} from "@/store/api/modules/pms/pmsTypes";

interface AddProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedProject?: Project | null;
}

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be less than 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  projectClient: Yup.number().required("Project client is required"),
  projectOwner: Yup.number().required("Project owner is required"),
  businessAnalyst: Yup.number().nullable(),
  leadName: Yup.number().required("Lead name is required"),
  projectMembers: Yup.array()
    .of(Yup.number())
    .min(1, "At least one project member is required"),
});

// Initial form values
const initialValues = {
  id: null,
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  projectClient: null,
  projectOwner: null,
  businessAnalyst: null,
  leadName: null,
  projectMembers: [],
  iconUrl: null,
};

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedProject,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // API calls
  const { data: clientProjectsResponse, isLoading: clientsLoading } =
    useGetClientProjectsQuery({
      pageNumber: 1,
      pageSize: 100,
    });

  const { data: employees, isLoading: employeesLoading } =
    useGetEmployeesQuery();

  // Transform API data for dropdowns
  const clientOptions =
    clientProjectsResponse?.items?.map((client: ClientProject) => ({
      id: client.id,
      label: client.name,
      value: client.id,
    })) || [];

  const employeeOptions =
    employees?.items?.map((employee: EmployeeObject) => ({
      id: employee.id,
      label: employee.fullName,
      value: employee.id,
    })) || [];

  // Determine if we're in edit mode
  const isEditMode = selectedProject !== null && selectedProject !== undefined;

  // Check if data is loading
  const isDataLoading = clientsLoading || employeesLoading;

  // Create initial values based on mode
  const getInitialValues = () => {
    if (isEditMode && selectedProject) {
      return {
        id: selectedProject.id,
        name: selectedProject.name,
        description: selectedProject.description,
        startDate: new Date(selectedProject.startDate),
        endDate: new Date(selectedProject.endDate),
        projectClient: null, // Will be set from API later
        projectOwner: selectedProject.projectOwner?.id || null,
        businessAnalyst: selectedProject.businessAnalyst?.id || null,
        leadName: null, // Will be set from API later - need to find employee by leadName string
        projectMembers: [], // Will be set from API later
        iconUrl: selectedProject.iconUrl,
      };
    }
    return initialValues;
  };

  // Refs for form inputs
  const descriptionRef = useRef<any>(null);

  // Use useFormik hook
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // Clear previous server errors
        setServerErrors({});

        // TODO: Implement API call
        console.log("Project data:", values);

        onSuccess?.();
        onClose();
      } catch (error: any) {
        console.error("Project submission error:", error);
        // Handle errors here
      }
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
    setServerErrors({});
    setSelectedImage(null);
  };

  const handleImagePicker = async () => {
    // TODO: Implement image picker when expo-image-picker is available
    Alert.alert(
      "Image Picker",
      "Image picker functionality will be implemented when expo-image-picker is available"
    );
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={isEditMode ? "Edit Project" : "Add New Project"}
      subtitle={
        isEditMode ? "Update project information" : "Create a new project"
      }
      height={isMobile() ? "85%" : "80%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      <ScrollView
        style={styles(palette).scrollView}
        contentContainerStyle={styles(palette).contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles(palette).formContainer}>
          <View style={styles(palette).iconContainer}>
            <Text style={styles(palette).iconLabel}>Project Icon</Text>
            <Button
              title={
                selectedImage || formik.values.iconUrl
                  ? "Change Icon"
                  : "Select Icon"
              }
              variant="outline"
              size="small"
              onPress={handleImagePicker}
              leftIcon={
                <Ionicons name="image" size={16} color={palette.primary.main} />
              }
              style={styles(palette).iconButton}
            />
            {(selectedImage || formik.values.iconUrl) && (
              <Text style={styles(palette).iconHint}>JPG/PNG, Max 2MB</Text>
            )}
          </View>

          {/* Project Name */}
          <View style={styles(palette).containerRow}>
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              title="Project Name *"
              placeholder="Enter project name"
              value={formik.values.name}
              onChangeText={(text) => {
                formik.handleChange("name")(text);
                if (serverErrors.name) {
                  setServerErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
              onBlur={formik.handleBlur("name")}
              formikError={formik.errors.name || serverErrors.name}
              formikTouched={formik.touched.name}
              nextInputRef={descriptionRef}
              leftIcon="folder"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
          </View>

          {/* Lead Name */}
          <SingleSelectDropdown
            maxHeight={400}
            title="Lead Name *"
            options={employeeOptions}
            selectedValue={formik.values.leadName || ""}
            onSelectionChange={(value) => {
              formik.setFieldValue("leadName", value);
              formik.setFieldTouched("leadName", true);
              if (serverErrors.leadName) {
                setServerErrors((prev) => ({ ...prev, leadName: "" }));
              }
            }}
            placeholder={
              employeesLoading ? "Loading employees..." : "Select lead name"
            }
            searchable={true}
            disabled={employeesLoading}
          />

          {/* Date Range */}
          <View style={styles(palette).containerRow}>
            <DatePicker
              title="Start Date *"
              value={formik.values.startDate.toISOString().split("T")[0]}
              onDateChange={(date) => {
                formik.setFieldValue("startDate", new Date(date));
                formik.setFieldTouched("startDate", true);
                if (serverErrors.startDate) {
                  setServerErrors((prev) => ({ ...prev, startDate: "" }));
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
              value={formik.values.endDate.toISOString().split("T")[0]}
              onDateChange={(date) => {
                formik.setFieldValue("endDate", new Date(date));
                formik.setFieldTouched("endDate", true);
                if (serverErrors.endDate) {
                  setServerErrors((prev) => ({ ...prev, endDate: "" }));
                }
              }}
              minimumDate={formik.values.startDate.toISOString().split("T")[0]}
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
            />
          </View>

          {/* Project Client */}
          <SingleSelectDropdown
            maxHeight={400}
            title="Project Client *"
            options={clientOptions}
            selectedValue={formik.values.projectClient || ""}
            onSelectionChange={(value) => {
              formik.setFieldValue("projectClient", value);
              formik.setFieldTouched("projectClient", true);
              if (serverErrors.projectClient) {
                setServerErrors((prev) => ({
                  ...prev,
                  projectClient: "",
                }));
              }
            }}
            placeholder={
              clientsLoading ? "Loading clients..." : "Select project client"
            }
            searchable={true}
            disabled={clientsLoading}
          />

          {/* Project Owner & Business Analyst */}
          <View style={styles(palette).containerRow}>
            <SingleSelectDropdown
              maxHeight={400}
              title="Project Owner *"
              options={employeeOptions}
              selectedValue={formik.values.projectOwner || ""}
              onSelectionChange={(value) => {
                formik.setFieldValue("projectOwner", value);
                formik.setFieldTouched("projectOwner", true);
                if (serverErrors.projectOwner) {
                  setServerErrors((prev) => ({
                    ...prev,
                    projectOwner: "",
                  }));
                }
              }}
              placeholder={
                employeesLoading
                  ? "Loading employees..."
                  : "Select project owner"
              }
              searchable={true}
              disabled={employeesLoading}
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
            />

            <SingleSelectDropdown
              maxHeight={400}
              title="Business Analyst"
              options={employeeOptions}
              selectedValue={formik.values.businessAnalyst || ""}
              onSelectionChange={(value) => {
                formik.setFieldValue("businessAnalyst", value);
                formik.setFieldTouched("businessAnalyst", true);
                if (serverErrors.businessAnalyst) {
                  setServerErrors((prev) => ({
                    ...prev,
                    businessAnalyst: "",
                  }));
                }
              }}
              placeholder={
                employeesLoading
                  ? "Loading employees..."
                  : "Select business analyst"
              }
              searchable={true}
              disabled={employeesLoading}
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
            />
          </View>

          {/* Project Members */}
          <MultiSelectDropdown
            title="Project Members *"
            options={employeeOptions}
            selectedValues={formik.values.projectMembers}
            onSelectionChange={(values) => {
              formik.setFieldValue("projectMembers", values);
              formik.setFieldTouched("projectMembers", true);
              if (serverErrors.projectMembers) {
                setServerErrors((prev) => ({
                  ...prev,
                  projectMembers: "",
                }));
              }
            }}
            placeholder={
              employeesLoading
                ? "Loading employees..."
                : "Select project members"
            }
            searchable={true}
            maxHeight={300}
            disabled={employeesLoading}
          />

          {/* Description */}
          <TextInput
            ref={descriptionRef}
            title="Description *"
            placeholder="Enter project description"
            value={formik.values.description}
            onChangeText={(text) => {
              formik.handleChange("description")(text);
              if (serverErrors.description) {
                setServerErrors((prev) => ({ ...prev, description: "" }));
              }
            }}
            onBlur={formik.handleBlur("description")}
            formikError={formik.errors.description || serverErrors.description}
            formikTouched={formik.touched.description}
            leftIcon="document-text"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            autoCapitalize="sentences"
            returnKeyType="done"
          />

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
              title={isEditMode ? "Update Project" : "Create Project"}
              variant="secondary"
              size={"small"}
              onPress={formik.handleSubmit}
              disabled={isDataLoading}
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
    </Modal>
  );
};

const styles = (palette: any) =>
  StyleSheet.create({
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
    iconContainer: {
      width: isMobile() ? "100%" : "48%",
      alignItems: "flex-start",
      marginBottom: spacing.md,
    },
    iconLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    iconButton: {
      width: "100%",
    },
    iconHint: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginTop: spacing.xs,
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
