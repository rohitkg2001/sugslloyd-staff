import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";

const VendorDetailScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const { t } = useTranslation();

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("vendor_details")} isBack={true} hasIcon={true} />
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <ScrollView>
          {renderDetailRow("Name", site.name)}
          {renderDetailRow("Mail ID", site.email)}
          {renderDetailRow("Account Name", site.accountName)}
          {renderDetailRow("Account Number", site.accountNumber)}
          {renderDetailRow("Ifsc", site.ifsc)}
          {renderDetailRow("Bank Name", site.bankName)}
          {renderDetailRow("Branch", site.branch)}
          {renderDetailRow("Gst Number", site.gstNumber)}
          {renderDetailRow("Pan Number", site.pan)}
          {renderDetailRow("Aadhar Number", site.aadharNumber)}
          {renderDetailRow("First Name", site.firstName)}
          {renderDetailRow("Last Name", site.lastName)}
          {renderDetailRow("Address", site.address)}
          {renderDetailRow("Contact Number", site.contactNo)}
          {renderDetailRow("Status", site.status)}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default VendorDetailScreen;
