import React, { useRef, useState } from "react";
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
import { Button, Modal, TextInput } from "@/components/ui";

// ** Store
import {
  useCreateUpdateAssetCategoryMutation,
  useGetAssetCategoryByIdQuery,
} from "@/store/api/modules/ams/amsMangament";

// ** Types
import {
  AssetCategoryRequest,
  AssetTypesCategory,
} from "@/store/api/modules/ams/amsTypes";

interface AddAssetTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedAssetType?: AssetTypesCategory | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Asset type name is required")
    .min(2, "Asset type name must be at least 2 characters")
    .max(100, "Asset type name must be less than 100 characters"),
});

const initialValues = {
  id: undefined,
  name: "",
};

const AddAssetTypeModal: React.FC<AddAssetTypeModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedAssetType,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [createUpdateAssetCategory, { isLoading }] =
    useCreateUpdateAssetCategoryMutation();

  const { data: assetCategoryDetails, isLoading: assetCategoryDetailsLoading } =
    useGetAssetCategoryByIdQuery(selectedAssetType?.id!, {
      skip: !selectedAssetType?.id,
    });

  const isEditMode =
    selectedAssetType !== null && selectedAssetType !== undefined;

  const isDataLoading = assetCategoryDetailsLoading;

  const getInitialValues = () => {
    if (isEditMode && assetCategoryDetails) {
      return {
        id: assetCategoryDetails.id,
        name: assetCategoryDetails.name,
      };
    }

    return initialValues;
  };

  const nameRef = useRef<any>(null);

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setServerErrors({});

        const assetCategoryData: AssetCategoryRequest = {
          name: values.name,
        };

        if (values.id) {
          assetCategoryData.id = values.id;
        }

        await createUpdateAssetCategory(assetCategoryData).unwrap();

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
        } else {
          setServerErrors({
            general:
              error?.data?.message || error?.message || "An error occurred",
          });
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
      title={isEditMode ? "Edit Asset Type" : "Add New Asset Type"}
      subtitle={
        isEditMode ? "Update asset type information" : "Create a new asset type"
      }
      height={isMobile() ? "60%" : "50%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      {isEditMode && assetCategoryDetailsLoading ? (
        <View style={styles(palette).loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles(palette).loadingText}>
            Loading asset type details...
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
            {serverErrors.general && (
              <View style={styles(palette).errorContainer}>
                <Text style={styles(palette).errorText}>
                  {serverErrors.general}
                </Text>
              </View>
            )}

            <TextInput
              ref={nameRef}
              title="Asset Type Name *"
              placeholder="Enter asset type name"
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
              leftIcon="folder"
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={() => formik.handleSubmit()}
            />

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
                title={isEditMode ? "Update Asset Type" : "Create Asset Type"}
                variant="secondary"
                size={"small"}
                onPress={() => {
                  formik.handleSubmit();
                }}
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

export default AddAssetTypeModal;
