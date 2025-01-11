import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5, P } from "../components/text";
import { useTranslation } from "react-i18next";

const VendorDetailScreen = ({ route }) => {
  const { site } = route.params;
  const { t } = useTranslation();
  const [Site, setSite] = useState({
    name: "",
    email: "",
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    gstNumber: "",
    pan: "",
    aadharNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    contactNo: "",
    status: "",
  });

  return (
    <ContainerComponent>
      <MyHeader title={t("vendor_details")} isBack={true} hasIcon={true} />
      <ScrollView>
        <View style={[{ width: SCREEN_WIDTH - 16 }]}>
          <View style={[styles.row]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Name</H5>
            <P style={[typography.font16, spacing.pv1, { textAlign: "right" }]}>
              {site.name}
            </P>
          </View>

          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Mail ID</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.email}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Account Name
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.accountName}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Account Number
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.accountNumber}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Ifsc</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.ifsc}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Bank Name
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.bankName}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Branch</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.branch}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Gst Number
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.gstNumber}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Pan</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.pan}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Aadhar Number
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.aadharNumber}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              First Name
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.firstName}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Last Name
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.lastName}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Address</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.address}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Contact Number
            </H5>
            ;
            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.contactNo}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Status</H5>

            <P style={[typography.font16, { textAlign: "right" }]}>
              {site.status}
            </P>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default VendorDetailScreen;
