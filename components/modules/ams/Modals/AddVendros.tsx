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
  useCreateUpdateVendorMutation,
  useGetVendorByIdQuery,
} from "@/store/api/modules/ams/amsPurchaseOrder";

// ** Types
import { Vendor, VendorRequest } from "@/store/api/modules/ams/amsTypes";

interface AddVendorsModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedVendor?: Vendor | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Vendor name is required")
    .min(2, "Vendor name must be at least 2 characters")
    .max(100, "Vendor name must be less than 100 characters"),
  contactPerson: Yup.string().max(
    100,
    "Contact person name must be less than 100 characters"
  ),
  contactEmail: Yup.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  contactphone1: Yup.string().max(
    20,
    "Phone number must be less than 20 characters"
  ),
  contactphone2: Yup.string().max(
    20,
    "Phone number must be less than 20 characters"
  ),
  vendorAddress: Yup.string().max(
    500,
    "Address must be less than 500 characters"
  ),
});

const initialValues = {
  id: null,
  name: "",
  contactPerson: "",
  contactEmail: "",
  contactphone1: "",
  contactphone2: "",
  vendorAddress: "",
};

const AddVendorsModal: React.FC<AddVendorsModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedVendor,
}) => {
  const { palette } = useTheme();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [createUpdateVendor, { isLoading }] = useCreateUpdateVendorMutation();

  // Get vendor details when editing
  const { data: vendorDetails, isLoading: vendorDetailsLoading } =
    useGetVendorByIdQuery(selectedVendor?.id!, {
      skip: !selectedVendor?.id,
    });

  // Determine if we're in edit mode
  const isEditMode = selectedVendor !== null && selectedVendor !== undefined;

  // Check if data is loading
  const isDataLoading = vendorDetailsLoading;

  // Create initial values based on mode
  const getInitialValues = () => {
    if (isEditMode && vendorDetails) {
      return {
        id: vendorDetails.id,
        name: vendorDetails.name,
        contactPerson: vendorDetails.contactPerson || "",
        contactEmail: vendorDetails.contactEmail || "",
        contactphone1: vendorDetails.contactphone1 || "",
        contactphone2: vendorDetails.contactphone2 || "",
        vendorAddress: vendorDetails.vendorAddress || "",
      };
    }

    return initialValues;
  };

  // Refs for form inputs
  const contactPersonRef = useRef<any>(null);
  const contactEmailRef = useRef<any>(null);
  const contactPhone1Ref = useRef<any>(null);
  const contactPhone2Ref = useRef<any>(null);
  const vendorAddressRef = useRef<any>(null);

  // Use useFormik hook
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setServerErrors({});

        // Prepare API payload
        const vendorData: VendorRequest = {
          id: values.id || undefined,
          name: values.name,
          contactPerson: values.contactPerson || undefined,
          contactEmail: values.contactEmail || undefined,
          contactphone1: values.contactphone1 || undefined,
          contactphone2: values.contactphone2 || undefined,
          vendorAddress: values.vendorAddress || undefined,
        };

        await createUpdateVendor(vendorData).unwrap();

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
      title={isEditMode ? "Edit Vendor" : "Add New Vendor"}
      subtitle={
        isEditMode ? "Update vendor information" : "Create a new vendor"
      }
      height={isMobile() ? "85%" : "80%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={true}
    >
      {isEditMode && vendorDetailsLoading ? (
        <View style={styles(palette).loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary.main} />
          <Text style={styles(palette).loadingText}>
            Loading vendor details...
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
            <View style={styles(palette).containerRow}>
              <TextInput
                title="Vendor Name *"
                placeholder="Enter vendor name"
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
                nextInputRef={contactPersonRef}
                leftIcon="business"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => contactPersonRef.current?.focus()}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <TextInput
                ref={contactPersonRef}
                title="Contact Person"
                placeholder="Enter contact person name"
                value={formik.values.contactPerson}
                onChangeText={(text) => {
                  formik.handleChange("contactPerson")(text);
                  if (serverErrors.contactPerson) {
                    setServerErrors((prev) => ({ ...prev, contactPerson: "" }));
                  }
                }}
                onBlur={formik.handleBlur("contactPerson")}
                formikError={
                  formik.errors.contactPerson || serverErrors.contactPerson
                }
                formikTouched={formik.touched.contactPerson}
                nextInputRef={contactEmailRef}
                leftIcon="person"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => contactEmailRef.current?.focus()}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />
            </View>

            <TextInput
              ref={contactEmailRef}
              title="Contact Email"
              placeholder="Enter contact email"
              value={formik.values.contactEmail}
              onChangeText={(text) => {
                formik.handleChange("contactEmail")(text);
                if (serverErrors.contactEmail) {
                  setServerErrors((prev) => ({ ...prev, contactEmail: "" }));
                }
              }}
              onBlur={formik.handleBlur("contactEmail")}
              formikError={
                formik.errors.contactEmail || serverErrors.contactEmail
              }
              formikTouched={formik.touched.contactEmail}
              nextInputRef={contactPhone1Ref}
              leftIcon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => contactPhone1Ref.current?.focus()}
            />

            <View style={styles(palette).containerRow}>
              <TextInput
                ref={contactPhone1Ref}
                title="Phone 1"
                placeholder="Enter phone number"
                value={formik.values.contactphone1}
                onChangeText={(text) => {
                  formik.handleChange("contactphone1")(text);
                  if (serverErrors.contactphone1) {
                    setServerErrors((prev) => ({ ...prev, contactphone1: "" }));
                  }
                }}
                onBlur={formik.handleBlur("contactphone1")}
                formikError={
                  formik.errors.contactphone1 || serverErrors.contactphone1
                }
                formikTouched={formik.touched.contactphone1}
                nextInputRef={contactPhone2Ref}
                leftIcon="call"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => contactPhone2Ref.current?.focus()}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />

              <TextInput
                ref={contactPhone2Ref}
                title="Phone 2"
                placeholder="Enter phone number"
                value={formik.values.contactphone2}
                onChangeText={(text) => {
                  formik.handleChange("contactphone2")(text);
                  if (serverErrors.contactphone2) {
                    setServerErrors((prev) => ({ ...prev, contactphone2: "" }));
                  }
                }}
                onBlur={formik.handleBlur("contactphone2")}
                formikError={
                  formik.errors.contactphone2 || serverErrors.contactphone2
                }
                formikTouched={formik.touched.contactphone2}
                nextInputRef={vendorAddressRef}
                leftIcon="call"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => vendorAddressRef.current?.focus()}
                styleData={{
                  containerStyles: {
                    width: isMobile() ? "100%" : "48%",
                  },
                }}
              />
            </View>

            <TextInput
              ref={vendorAddressRef}
              title="Vendor Address"
              placeholder="Enter vendor address"
              value={formik.values.vendorAddress}
              onChangeText={(text) => {
                formik.handleChange("vendorAddress")(text);
                if (serverErrors.vendorAddress) {
                  setServerErrors((prev) => ({ ...prev, vendorAddress: "" }));
                }
              }}
              onBlur={formik.handleBlur("vendorAddress")}
              formikError={
                formik.errors.vendorAddress || serverErrors.vendorAddress
              }
              formikTouched={formik.touched.vendorAddress}
              leftIcon="location"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoCapitalize="sentences"
              returnKeyType="done"
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
                title={isEditMode ? "Update Vendor" : "Create Vendor"}
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

export default AddVendorsModal;
