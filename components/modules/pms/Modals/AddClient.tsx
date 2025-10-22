import { useFormik } from "formik";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { isMobile, useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";

// ** Custom Components
import {
  Button,
  Modal,
  SingleSelectDropdown,
  TextInput,
} from "@/components/ui";

// ** Store
import { useCreateClientProjectMutation } from "@/store/api/modules/pms/pmsProjects";

// ** Types
import { CreateClientProjectRequest } from "@/store/api/modules/pms/pmsTypes";
import { isObjEmpty } from "@/utils/textUtils";
import moment from "moment-timezone";

interface AddClientModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const allTimezones = moment.tz.names();

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Client name is required")
    .min(2, "Client name must be at least 2 characters")
    .max(100, "Client name must be less than 100 characters"),
  companyName: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  timeZone: Yup.string()
    .required("Time zone is required")
    .oneOf([...allTimezones], "Please select a valid time zone"),
});

// Initial form values
const initialValues: CreateClientProjectRequest = {
  id: null,
  name: "",
  companyName: "",
  description: "",
  email: "",
  phone: "",
  address: "",
  timeZone: "America/Monterrey",
};

// Generate timezone options using common timezones
const generateTimeZoneOptions = () => {
  return allTimezones.map((tz: string) => ({
    id: tz,
    label: `${tz.replace(/_/g, " ")}`,
    value: tz,
  }));
};

const timeZoneOptions = generateTimeZoneOptions();

export const AddClientModal: React.FC<AddClientModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { palette } = useTheme();
  const [createClientProject, { isLoading }] = useCreateClientProjectMutation();

  // Refs for form inputs
  const companyNameRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const addressRef = useRef<any>(null);

  // Use useFormik hook
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!isObjEmpty(values)) {
        try {
          await createClientProject(values);
          onSuccess?.();
          onClose();
        } catch (error) {
          console.error("Failed to create client project:", error);
        }
      }
    },
  });

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      formik.resetForm();
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title="Add New Client"
      subtitle="Create a new client project"
      height={isMobile() ? "70%" : "60%"}
      variant="bottom"
      animationType="slide"
      closeOnBackdrop={!isLoading}
    >
      <ScrollView
        style={styles(palette).scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles(palette).formContainer}>
          <View style={styles(palette).containerRow}>
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              title="Client Name *"
              placeholder="Enter client name"
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              formikError={formik.errors.name}
              formikTouched={formik.touched.name}
              nextInputRef={companyNameRef}
              leftIcon="user"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => companyNameRef.current?.focus()}
            />

            {/* Company Name */}
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              ref={companyNameRef}
              title="Company Name *"
              placeholder="Enter company name"
              value={formik.values.companyName}
              onChangeText={formik.handleChange("companyName")}
              onBlur={formik.handleBlur("companyName")}
              formikError={formik.errors.companyName}
              formikTouched={formik.touched.companyName}
              nextInputRef={descriptionRef}
              leftIcon="business"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
          </View>

          {/* Description */}
          <View style={styles(palette).containerRow}>
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              ref={descriptionRef}
              title="Description *"
              placeholder="Enter project description"
              value={formik.values.description}
              onChangeText={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              formikError={formik.errors.description}
              formikTouched={formik.touched.description}
              nextInputRef={emailRef}
              leftIcon="document-text"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            {/* Email */}
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              ref={emailRef}
              title="Email Address *"
              placeholder="Enter email address"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              formikError={formik.errors.email}
              formikTouched={formik.touched.email}
              nextInputRef={phoneRef}
              leftIcon="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
          </View>

          <View style={styles(palette).containerRow}>
            {/* Phone */}
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              ref={phoneRef}
              title="Phone Number *"
              placeholder="Enter phone number"
              value={formik.values.phone}
              onChangeText={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              formikError={formik.errors.phone}
              formikTouched={formik.touched.phone}
              nextInputRef={addressRef}
              leftIcon="phone"
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={() => addressRef.current?.focus()}
            />

            {/* Address */}
            <TextInput
              styleData={{
                containerStyles: {
                  width: isMobile() ? "100%" : "48%",
                },
              }}
              ref={addressRef}
              title="Address *"
              placeholder="Enter full address"
              value={formik.values.address}
              onChangeText={formik.handleChange("address")}
              onBlur={formik.handleBlur("address")}
              formikError={formik.errors.address}
              formikTouched={formik.touched.address}
              leftIcon="location"
              multiline
              numberOfLines={2}
              textAlignVertical="top"
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          {/* Time Zone */}
          <SingleSelectDropdown
            title="Time Zone *"
            options={timeZoneOptions}
            selectedValue={formik.values.timeZone}
            onSelectionChange={(value) =>
              formik.setFieldValue("timeZone", value)
            }
            placeholder="Select time zone"
            searchable={true}
            maxHeight={400}
          />
          {formik.touched.timeZone && formik.errors.timeZone && (
            <Text style={styles(palette).errorText}>
              {formik.errors.timeZone}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles(palette).buttonContainer}>
            <Button
              size={"small"}
              title="Cancel"
              variant="outline"
              outlineColor="error"
              onPress={handleClose}
              disabled={isLoading}
              style={styles(palette).cancelButton}
            />
            <Button
              title="Create Client"
              variant="secondary"
              size={"small"}
              onPress={formik.handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              leftIcon={
                <Ionicons name="add" size={20} color={palette.text.inverse} />
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
    formContainer: {
      paddingBottom: spacing.md,
    },
    containerRow: {
      flexDirection: isMobile() ? "column" : "row",
      gap: isMobile() ? 0 : spacing.md,
      justifyContent: isMobile() ? "flex-start" : "space-between",
      alignItems: isMobile() ? "flex-start" : "center",
    },
    errorText: {
      fontSize: 12,
      color: palette.error.main,
      marginTop: spacing.xs,
      paddingHorizontal: spacing.xs,
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
