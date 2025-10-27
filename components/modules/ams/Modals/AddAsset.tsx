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
import {
  Button,
  DatePicker,
  Modal,
  SingleSelectDropdown,
  TextInput,
} from "@/components/ui";

// ** Store
import {
  useCreateUpdateAssetMutation,
  useGetAssetByIdQuery,
  useGetAssetsQuery,
  useLazyValidateSerialNumberQuery,
} from "@/store/api/modules/ams/amsMangament";
import { useGetPurchaseOrdersQuery } from "@/store/api/modules/ams/amsPurchaseOrder";

// ** Types
import {
  Asset,
  AssetRequest,
  AssetTypesCategory,
  PurchaseOrder,
} from "@/store/api/modules/ams/amsTypes";

interface AddAssetModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedAsset?: Asset | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Asset name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  serialNumber: Yup.string()
    .required("Serial number is required")
    .min(2, "Serial number must be at least 2 characters")
    .max(100, "Serial number must be less than 100 characters"),
  shortDescription: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
  purchaseData: Yup.string().required("Purchase date is required"),
  purchaseCost: Yup.number()
    .required("Purchase cost is required")
    .positive("Purchase cost must be greater than 0")
    .typeError("Purchase cost must be a valid number"),
  assetCategoryId: Yup.number()
    .required("Asset category is required")
    .typeError("Please select an asset category"),
  purchaseOrderId: Yup.number()
    .required("Purchase order is required")
    .typeError("Please select a purchase order"),
});

const initialValues = {
  id: null,
  name: "",
  serialNumber: "",
  shortDescription: "",
  purchaseData: "",
  purchaseCost: "",
  assetCategoryId: null,
  purchaseOrderId: null,
};

const AddAssetModal: React.FC<AddAssetModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedAsset,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [isValidatingSerial, setIsValidatingSerial] = useState(false);
  const [createUpdateAsset, { isLoading }] = useCreateUpdateAssetMutation();
  const [serialNumberValidationError, setSerialNumberValidationError] =
    useState<string>("");

  const { data: assetDetails, isLoading: assetDetailsLoading } =
    useGetAssetByIdQuery(selectedAsset?.id!, {
      skip: !selectedAsset?.id,
    });

  const { data: purchaseOrdersData } = useGetPurchaseOrdersQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  const { data: assetsData } = useGetAssetsQuery({
    pageNumber: 1,
    pageSize: 1000,
    keyword: "",
  });

  const [triggerValidateSerial] = useLazyValidateSerialNumberQuery();

  const isEditMode = selectedAsset !== null && selectedAsset !== undefined;

  const isDataLoading = assetDetailsLoading;

  const getInitialValues = () => {
    if (isEditMode && assetDetails) {
      return {
        id: assetDetails.id,
        name: assetDetails.name,
        serialNumber: assetDetails.serialNumber,
        shortDescription: assetDetails.shortDescription,
        purchaseData: assetDetails.purchaseData,
        purchaseCost: assetDetails.purchaseCost.toString(),
        assetCategoryId: assetDetails.assetCategoryId,
        purchaseOrderId: assetDetails.purchaseOrderId || null,
      };
    }

    return initialValues;
  };

  const shortDescriptionRef = useRef<any>(null);
  const purchaseCostRef = useRef<any>(null);

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setServerErrors({});

        const assetData: AssetRequest = {
          id: values.id || undefined,
          name: values.name,
          serialNumber: values.serialNumber,
          shortDescription: values.shortDescription,
          purchaseData: values.purchaseData,
          purchaseCost: Number(values.purchaseCost),
          assetCategoryId: values.assetCategoryId as number,
          purchaseOrderId: values.purchaseOrderId as number,
        };

        await createUpdateAsset({
          data: assetData,
          isUpdate: !!values.id,
        }).unwrap();

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
    setSerialNumberValidationError("");
  };

  const handleSerialNumberBlur = async () => {
    if (!formik.values.serialNumber) return;

    if (
      isEditMode &&
      formik.values.serialNumber === selectedAsset?.serialNumber
    ) {
      return;
    }

    try {
      setIsValidatingSerial(true);
      const result = await triggerValidateSerial(
        formik.values.serialNumber
      ).unwrap();

      setIsValidatingSerial(false);
      if (!result) {
        setSerialNumberValidationError("Serial number already exists");
      } else {
        setSerialNumberValidationError("");
      }
    } catch (error: any) {
      setSerialNumberValidationError(
        error?.data?.message || "Serial number validation failed"
      );
    } finally {
      setIsValidatingSerial(false);
    }
  };

  const formatAssetCategoriesForDropdown = () => {
    if (!assetsData?.items) return [];

    const categoriesMap = new Map<number, AssetTypesCategory>();
    assetsData.items.forEach((asset) => {
      if (!categoriesMap.has(asset.assetCategoryId)) {
        categoriesMap.set(asset.assetCategoryId, asset.assetCategory);
      }
    });

    return Array.from(categoriesMap.values()).map((category) => ({
      id: category.id,
      label: category.name,
      value: category.id,
    }));
  };

  const assetCategoryOptions = formatAssetCategoriesForDropdown();

  const purchaseOrderOptions =
    purchaseOrdersData?.items.map((purchaseOrder: PurchaseOrder) => ({
      id: purchaseOrder.id,
      label: `${purchaseOrder.name} - ${purchaseOrder.vendor.name}`,
      value: purchaseOrder.id,
    })) || [];

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={isEditMode ? "Edit Asset" : "Add New Asset"}
      subtitle={isEditMode ? "Update asset information" : "Create a new asset"}
      height={isMobile() ? "90%" : "70%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      {isEditMode && assetDetailsLoading ? (
        <View style={styles(palette).loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles(palette).loadingText}>
            Loading asset details...
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
            <TextInput
              title="Asset Name *"
              placeholder="Enter asset name"
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
              nextInputRef={shortDescriptionRef}
              leftIcon="cube"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => shortDescriptionRef.current?.focus()}
            />

            <View style={styles(palette).containerRow}>
              <TextInput
                title="Serial Number *"
                placeholder="Enter serial number"
                value={formik.values.serialNumber}
                onChangeText={(text) => {
                  formik.handleChange("serialNumber")(text);
                  if (serverErrors.serialNumber) {
                    setServerErrors((prev) => ({ ...prev, serialNumber: "" }));
                  }
                  setSerialNumberValidationError("");
                }}
                onBlur={async () => {
                  formik.handleBlur("serialNumber");
                  await handleSerialNumberBlur();
                }}
                formikError={
                  formik.errors.serialNumber || serverErrors.serialNumber
                }
                formikTouched={formik.touched.serialNumber}
                leftIcon="barcode"
                autoCapitalize="none"
                returnKeyType="next"
                loading={isValidatingSerial}
                validationState={
                  serialNumberValidationError
                    ? "error"
                    : isValidatingSerial
                    ? null
                    : formik.values.serialNumber && !serialNumberValidationError
                    ? "success"
                    : null
                }
                validationError={serialNumberValidationError}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <TextInput
                ref={purchaseCostRef}
                title="Purchase Cost *"
                placeholder="Enter purchase cost"
                value={formik.values.purchaseCost}
                onChangeText={(text) => {
                  formik.handleChange("purchaseCost")(text);
                  if (serverErrors.purchaseCost) {
                    setServerErrors((prev) => ({ ...prev, purchaseCost: "" }));
                  }
                }}
                onBlur={formik.handleBlur("purchaseCost")}
                formikError={
                  formik.errors.purchaseCost || serverErrors.purchaseCost
                }
                formikTouched={formik.touched.purchaseCost}
                leftIcon="cash"
                keyboardType="numeric"
                returnKeyType="next"
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />
            </View>

            <TextInput
              ref={shortDescriptionRef}
              title="Short Description"
              placeholder="Enter short description"
              value={formik.values.shortDescription}
              onChangeText={(text) => {
                formik.handleChange("shortDescription")(text);
                if (serverErrors.shortDescription) {
                  setServerErrors((prev) => ({
                    ...prev,
                    shortDescription: "",
                  }));
                }
              }}
              onBlur={formik.handleBlur("shortDescription")}
              formikError={
                formik.errors.shortDescription || serverErrors.shortDescription
              }
              formikTouched={formik.touched.shortDescription}
              leftIcon="document-text"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => purchaseCostRef.current?.focus()}
            />

            <View style={styles(palette).containerRow}>
              <DatePicker
                title="Purchase Date *"
                value={formik.values.purchaseData}
                onDateChange={(date) => {
                  formik.setFieldValue("purchaseData", date);
                  formik.setFieldTouched("purchaseData", true);
                  if (serverErrors.purchaseData) {
                    setServerErrors((prev) => ({ ...prev, purchaseData: "" }));
                  }
                }}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <SingleSelectDropdown
                title="Asset Category *"
                options={assetCategoryOptions}
                selectedValue={formik.values.assetCategoryId || ""}
                onSelectionChange={(id) => {
                  formik.setFieldValue("assetCategoryId", id);
                  formik.setFieldTouched("assetCategoryId", true);
                  if (serverErrors.assetCategoryId) {
                    setServerErrors((prev) => ({
                      ...prev,
                      assetCategoryId: "",
                    }));
                  }
                }}
                placeholder="Select asset category"
                formikError={
                  formik.errors.assetCategoryId?.toString() ||
                  serverErrors.assetCategoryId
                }
                formikTouched={formik.touched.assetCategoryId}
                searchable={true}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
                maxHeight={250}
              />
            </View>

            <SingleSelectDropdown
              title="Purchase Order *"
              options={purchaseOrderOptions}
              selectedValue={formik.values.purchaseOrderId || ""}
              onSelectionChange={(id) => {
                formik.setFieldValue("purchaseOrderId", id);
                formik.setFieldTouched("purchaseOrderId", true);
                if (serverErrors.purchaseOrderId) {
                  setServerErrors((prev) => ({ ...prev, purchaseOrderId: "" }));
                }
              }}
              placeholder="Select purchase order"
              formikError={
                formik.errors.purchaseOrderId?.toString() ||
                serverErrors.purchaseOrderId
              }
              formikTouched={formik.touched.purchaseOrderId}
              searchable={true}
              maxHeight={300}
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
                title={isEditMode ? "Update Asset" : "Create Asset"}
                variant="secondary"
                size={"small"}
                onPress={() => {
                  formik.handleSubmit();
                }}
                loading={isLoading}
                disabled={
                  isDataLoading || isLoading || !!serialNumberValidationError
                }
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
    errorText: {
      fontSize: 12,
      color: palette.error.main,
      marginTop: spacing.xs,
      paddingHorizontal: spacing.xs,
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

export default AddAssetModal;
