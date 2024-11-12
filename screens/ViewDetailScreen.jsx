import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH, spacing } from "../styles";

const ViewDetailScreen = ({ route }) => {
  const { site } = route.params;

  const renderDetailRow = (label, value) => (
    <View style={styles.row}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.detail}>{value}</Text>
    </View>
  );

  const renderSiteDetails = () => (
    <>
      {renderDetailRow("Site Name:", site.siteName)}
      {renderDetailRow("State:", site.state)}
      {renderDetailRow("Dist:", site.dist)}
      {renderDetailRow("Location:", site.location)}
      {renderDetailRow("Project Serial Code:", site.projectSerialCode)}
      {renderDetailRow("Project Capacity:", site.ProjectCapacity)}
      {renderDetailRow("CA Number:", site.cANumber)}
      {renderDetailRow("I&C Vendor Name:", site.iCVendorName)}
      {renderDetailRow("Contact No:", site.ContactNo)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name:", site.projectName)}
      {renderDetailRow("Duration:", site.duration)}
      {renderDetailRow("Status:", site.status)}
      {renderDetailRow("Project Serial:", site.projectSerial)}
      {renderDetailRow("Site Name:", site.siteName)}
      {renderDetailRow("Sanction Load:", site.sanctionLoad)}
      {renderDetailRow("Project Capacity:", site.projectCapacity)}
      {renderDetailRow("CA Number:", site.caNumber)}
      {renderDetailRow("Survey Status:", site.surveyStatus)}
      {renderDetailRow("Contact No:", site.contactNo)}
      {renderDetailRow("Solar Meter Serial:", site.solarMeterSerial)}
      {renderDetailRow("Vendor Name:", site.vendorName)}
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name:", site.vendorName)}
      {renderDetailRow("Mail ID:", site.mailId)}
      {renderDetailRow("Contact No:", site.contactNo)}
      {renderDetailRow("Location:", site.location)}
      {renderDetailRow("GST Number:", site.gstNumber)}
      {renderDetailRow("Status:", site.status)}
    </>
  );

  return (
    <View
      style={[
        spacing.mh2,
        {
          width: SCREEN_WIDTH - 16,
          paddingVertical: 10,
        },
      ]}
    >
      {site.vendorName
        ? renderVendorDetails()
        : site.projectName
        ? renderProjectDetails()
        : renderSiteDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  detail: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
});

export default ViewDetailScreen;
