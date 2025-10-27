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
  useCreateUpdatePurchaseOrderMutation,
  useGetPurchaseOrderByIdQuery,
  useGetVendorsQuery,
} from "@/store/api/modules/ams/amsPurchaseOrder";

// ** Types
import {
  PurchaseOrder,
  PurchaseOrderRequest,
  Vendor,
} from "@/store/api/modules/ams/amsTypes";

interface AddPurchaseOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedPurchaseOrder?: PurchaseOrder | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Purchase order name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  orderDate: Yup.string().required("Order date is required"),
  totalAmount: Yup.number()
    .required("Total amount is required")
    .positive("Total amount must be greater than 0")
    .typeError("Total amount must be a valid number"),
  attachmentURL: Yup.string()
    .url("Please enter a valid URL")
    .max(500, "URL must be less than 500 characters"),
  vendorId: Yup.number()
    .required("Vendor is required")
    .typeError("Please select a vendor"),
});

const initialValues = {
  id: null,
  name: "",
  orderDate: "",
  totalAmount: "",
  attachmentURL: "",
  vendorId: null,
};

const AddPurchaseOrderModal: React.FC<AddPurchaseOrderModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedPurchaseOrder,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [createUpdatePurchaseOrder, { isLoading }] =
    useCreateUpdatePurchaseOrderMutation();

  const { data: purchaseOrderDetails, isLoading: purchaseOrderDetailsLoading } =
    useGetPurchaseOrderByIdQuery(selectedPurchaseOrder?.id!, {
      skip: !selectedPurchaseOrder?.id,
    });

  const { data: vendorsData } = useGetVendorsQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  const isEditMode =
    selectedPurchaseOrder !== null && selectedPurchaseOrder !== undefined;

  const isDataLoading = purchaseOrderDetailsLoading;

  const getInitialValues = () => {
    if (isEditMode && purchaseOrderDetails) {
      return {
        id: purchaseOrderDetails.id,
        name: purchaseOrderDetails.name,
        orderDate: purchaseOrderDetails.orderDate,
        totalAmount: purchaseOrderDetails.totalAmount.toString(),
        attachmentURL: purchaseOrderDetails.attachmentURL || "",
        vendorId: purchaseOrderDetails.vendorId,
      };
    }

    return initialValues;
  };

  const totalAmountRef = useRef<any>(null);
  const attachmentURLRef = useRef<any>(null);

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setServerErrors({});

        const purchaseOrderData: PurchaseOrderRequest = {
          id: values.id || undefined,
          name: values.name,
          orderDate: values.orderDate,
          totalAmount: Number(values.totalAmount),
          attachmentURL: values.attachmentURL || "",
          vendorId: values.vendorId as number,
        };

        await createUpdatePurchaseOrder(purchaseOrderData).unwrap();

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

  const vendorOptions =
    vendorsData?.items.map((vendor: Vendor) => ({
      id: vendor.id,
      label: vendor.name,
      value: vendor.id,
    })) || [];

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={isEditMode ? "Edit Purchase Order" : "Add New Purchase Order"}
      subtitle={
        isEditMode
          ? "Update purchase order information"
          : "Create a new purchase order"
      }
      height={isMobile() ? "60%" : "50%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      {isEditMode && purchaseOrderDetailsLoading ? (
        <View style={styles(palette).loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles(palette).loadingText}>
            Loading purchase order details...
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
              title="Purchase Order Name *"
              placeholder="Enter purchase order name"
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
              nextInputRef={totalAmountRef}
              leftIcon="receipt"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => totalAmountRef.current?.focus()}
            />

            <View style={styles(palette).containerRow}>
              <TextInput
                ref={totalAmountRef}
                title="Total Amount *"
                placeholder="Enter total amount"
                value={formik.values.totalAmount}
                onChangeText={(text) => {
                  formik.handleChange("totalAmount")(text);
                  if (serverErrors.totalAmount) {
                    setServerErrors((prev) => ({ ...prev, totalAmount: "" }));
                  }
                }}
                onBlur={formik.handleBlur("totalAmount")}
                formikError={
                  formik.errors.totalAmount || serverErrors.totalAmount
                }
                formikTouched={formik.touched.totalAmount}
                nextInputRef={attachmentURLRef}
                leftIcon="cash"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => attachmentURLRef.current?.focus()}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <DatePicker
                title="Order Date *"
                value={formik.values.orderDate}
                onDateChange={(date) => {
                  formik.setFieldValue("orderDate", date);
                  formik.setFieldTouched("orderDate", true);
                  if (serverErrors.orderDate) {
                    setServerErrors((prev) => ({ ...prev, orderDate: "" }));
                  }
                }}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />
            </View>

            <TextInput
              ref={attachmentURLRef}
              title="Attachment URL"
              placeholder="Enter attachment URL"
              value={formik.values.attachmentURL}
              onChangeText={(text) => {
                formik.handleChange("attachmentURL")(text);
                if (serverErrors.attachmentURL) {
                  setServerErrors((prev) => ({ ...prev, attachmentURL: "" }));
                }
              }}
              onBlur={formik.handleBlur("attachmentURL")}
              formikError={
                formik.errors.attachmentURL || serverErrors.attachmentURL
              }
              formikTouched={formik.touched.attachmentURL}
              leftIcon="link"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <SingleSelectDropdown
              title="Vendor *"
              options={vendorOptions}
              selectedValue={formik.values.vendorId || ""}
              onSelectionChange={(id) => {
                formik.setFieldValue("vendorId", id);
                formik.setFieldTouched("vendorId", true);
                if (serverErrors.vendorId) {
                  setServerErrors((prev) => ({ ...prev, vendorId: "" }));
                }
              }}
              placeholder="Select vendor"
              formikError={
                formik.errors.vendorId?.toString() || serverErrors.vendorId
              }
              formikTouched={formik.touched.vendorId}
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
                title={isEditMode ? "Update Order" : "Create Order"}
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

export default AddPurchaseOrderModal;
