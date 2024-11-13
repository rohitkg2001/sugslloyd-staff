import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5, P } from "../components/text";
import Filter from "../components/filters";
import MyButton from "../components/buttons/MyButton";

const ViewDetailScreen = ({ route, navigation }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderDetailRow = (label, value) => (
    <View style={styles.row}>
      <P>{label}</P>
      <P style={styles.value}>{value}</P>
    </View>
  );

  const renderSectionTitle = (title) => <H5>{title}</H5>;

  const renderSiteDetails = () => (
    <>
      {renderSectionTitle("Site Information")}
      {renderDetailRow("Site Name", site.siteName)}
      {renderDetailRow("State", site.state)}
      {renderDetailRow("District", site.dist)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("Project Serial Code", site.projectSerialCode)}
      {renderDetailRow("Project Capacity", site.ProjectCapacity)}
      {renderDetailRow("CA Number", site.cANumber)}
      {renderDetailRow("I&C Vendor Name", site.iCVendorName)}
      {renderDetailRow("Contact No", site.ContactNo)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.projectName)}
      {renderDetailRow("Duration", site.duration)}
      {renderDetailRow("Status", site.status)}
      {renderDetailRow("Project Serial", site.projectSerial)}
      {renderDetailRow("Site Name", site.siteName)}
      {renderDetailRow("Sanction Load", site.sanctionLoad)}
      {renderDetailRow("Project Capacity", site.projectCapacity)}
      {renderDetailRow("CA Number", site.caNumber)}
      {renderDetailRow("Survey Status", site.surveyStatus)}
      {renderDetailRow("Contact No", site.contactNo)}
      {renderDetailRow("Solar Meter Serial", site.solarMeterSerial)}
      {renderDetailRow("Vendor Name", site.vendorName)}
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderSectionTitle("Vendor Information")}
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.mailId)}
      {renderDetailRow("Contact No", site.contactNumber)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("GST Number", site.gstNumber)}
      {renderDetailRow("Status", site.status)}
    </>
  );
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleEdit = () => {
    navigation.navigate("EditDetailsScreen", {
      site: site,
      formType: site.vendorName
        ? "vendor"
        : site.projectName
        ? "project"
        : "site",
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete this ${
        site.vendorName ? "vendor" : site.projectName ? "project" : "site"
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
  };

  const menuOptions = [
    { label: "Edit", onPress: handleEdit },
    { label: "Delete", onPress: handleDelete },
  ];

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={
            formType === "vendor"
              ? "Vendor Details"
              : site.projectName
              ? "Project Details"
              : "Site Details"
          }
          isBack={true}
          hasIcon={true}
          onIconPress={() => setIsMenuVisible(!isMenuVisible)}
        />
        <ScrollView contentContainerStyle>
          <View>
            {formType === "vendor"
              ? renderVendorDetails()
              : site.projectName
              ? renderProjectDetails()
              : renderSiteDetails()}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
            }}
          >
            <MyButton
              title="Create Task"
              onPress={() => navigation.navigate("taskListFormScreen")}
              color="#DC4C64"
            />
            <MyButton
              title="View Task"
              onPress={() => navigation.navigate("taskListScreen")}
            />
          </View>
        </ScrollView>

        <Filter
          visible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  value: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});

export default ViewDetailScreen;
