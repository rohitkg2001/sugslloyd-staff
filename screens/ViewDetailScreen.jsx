import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SCREEN_WIDTH, spacing } from "../styles";

const ViewDetailScreen = ({ route }) => {
  const { site } = route.params;

  const renderSiteDetails = () => (
    <>
      <Text style={styles.title}>{site.siteName}</Text>
      <Text style={styles.detail}>State: {site.state}</Text>
      <Text style={styles.detail}>Dist: {site.dist}</Text>
      <Text style={styles.detail}>Location: {site.location}</Text>
      <Text style={styles.detail}>
        Project Serial Code: {site.projectSerialCode}
      </Text>
      <Text style={styles.detail}>
        Project Capacity: {site.ProjectCapacity}
      </Text>
      <Text style={styles.detail}>CANumber: {site.cANumber}</Text>
      <Text style={styles.detail}>I&C VendorName: {site.iCVendorName}</Text>
      <Text style={styles.detail}>Contact No: {site.ContactNo}</Text>
    </>
  );

  const renderProjectDetails = () => (
    <>
      <Text style={styles.title}>{site.projectName}</Text>
      <Text style={styles.detail}>Duration: {site.duration}</Text>
      <Text style={styles.detail}>Status: {site.status}</Text>
    </>
  );
  const renderVendorDetails = () => (
    <>
      <Text style={styles.title}>Vendor Details</Text>
      <Text style={styles.detail}>Vendor Name: {site.vendorName}</Text>
      <Text style={styles.detail}>Mail ID: {site.mailId}</Text>
      <Text style={styles.detail}>Contact No: {site.contactNo}</Text>
      <Text style={styles.detail}>Location: {site.location}</Text>
      <Text style={styles.detail}>GST Number: {site.gstNumber}</Text>
      <Text style={styles.detail}>Status: {site.status}</Text>
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
     

      <Card style={styles.card}>
        {site.vendorName
          ? renderVendorDetails()
          : site.projectName
          ? renderProjectDetails()
          : renderSiteDetails()}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ViewDetailScreen;
