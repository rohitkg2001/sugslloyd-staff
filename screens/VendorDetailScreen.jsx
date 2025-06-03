import { useState } from "react";
import { View, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  SCREEN_WIDTH,
  spacing,
  typography,
  styles,
  ICON_LARGE,
} from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import Button from "../components/buttons/Button";
import { H5, P } from "../components/text";
import { useTranslation } from "react-i18next";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";

const steps = ["Basic Info", "Bank Info", "Personal Info"];

const VendorDetailScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const goToNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <DataRow label="Name" value={site.name} />
            <DataRow label="Mail ID" value={site.email} />
            <DataRow label="GST Number" value={site.gstNumber} />
            <DataRow label="Status" value={site.status} />
          </>
        );
      case 1:
        return (
          <>
            <DataRow label="Account Name" value={site.accountName} />
            <DataRow label="Account Number" value={site.accountNumber} />
            <DataRow label="IFSC" value={site.ifsc} />
            <DataRow label="Bank Name" value={site.bankName} />
            <DataRow label="Branch" value={site.branch} />
            <DataRow label="PAN" value={site.pan} />
          </>
        );
      case 2:
        return (
          <>
            <DataRow label="Aadhar Number" value={site.aadharNumber} />
            <DataRow label="First Name" value={site.firstName} />
            <DataRow label="Last Name" value={site.lastName} />
            <DataRow label="Address" value={site.address} />
            <DataRow label="Contact Number" value={site.contactNo} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("vendor_details")} isBack={true} hasIcon={true} />
      <ProgressStep
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <ScrollView>
        <View style={{ width: SCREEN_WIDTH - 16 }}>{renderStepContent()}</View>
      </ScrollView>
      <NavigationButtons
        activeStep={activeStep}
        steps={steps}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("VendorFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
};

const DataRow = ({ label, value }) => (
  <View style={[styles.row, spacing.pv2]}>
    <H5
      style={[
        typography.font14,
        typography.textBold,
        typography.fontLato,
        { textAlign: "left" },
      ]}
    >
      {label}
    </H5>
    <P style={[typography.font14, typography.fontLato, { textAlign: "right" }]}>
      {value}
    </P>
  </View>
);

export default VendorDetailScreen;
