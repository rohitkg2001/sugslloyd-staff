import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles as componentStyles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5, P } from "../components/text";
import Icon from "react-native-vector-icons/Ionicons";
import Filter from "../components/filters";
import CardFullWidth from "../components/card/CardFullWidth"; 

const ViewDetailScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderDetailRow = (label, value) => (
    <View style={styles.row}>
      <P style={styles.label}>{label}</P>
      <P style={styles.value}>{value}</P>
    </View>
  );

  const renderSectionTitle = (title) => (
    <H5 style={styles.sectionTitle}>{title}</H5>
  );

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
      {renderDetailRow("Vendor Name", site.vendorName)}
      {renderDetailRow("Mail ID", site.mailId)}
      {renderDetailRow("Contact No", site.contactNo)}
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
      formType: site.vendorName ? "vendor" : site.projectName ? "project" : "site",
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete this ${site.vendorName ? "vendor" : site.projectName ? "project" : "site"}?`,
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

  const navigateToCreateTask = () => {
    navigation.navigate("CreateTaskScreen");
  };

  const navigateToViewTask = () => {
    navigation.navigate("ViewTaskScreen");
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={site.vendorName ? "Vendor Details" : site.projectName ? "Project Details" : "Site Details"}
          isBack={true}
          hasIcon={true}
          icon="ellipsis-vertical"
          onIconPress={toggleMenu}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {site.vendorName
              ? renderVendorDetails()
              : site.projectName
              ? renderProjectDetails()
              : renderSiteDetails()}
            <View style={styles.cardSection}>
              {}
              <View style={styles.cardContainer}>
                <CardFullWidth
                  backgroundColor="#4CAF50"
                  style={{ width: "48%" }}
                >
                  <Icon name="add-circle-outline" size={32} />
                  <P>Create Task</P>
                </CardFullWidth>
              </View>
              <View style={styles.cardContainer}>
                <CardFullWidth
                  backgroundColor="#2196F3"
                  style={{ width: "48%" }}
                >
                  <Icon name="eye" size={32} />
                  <P>View Task</P>
                </CardFullWidth>
              </View>
            </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  cardSection: {
    flexDirection: "row",
    flexWrap: "wrap",  
    justifyContent: "space-between",  
    marginTop: 16,
    paddingHorizontal: 8,  
  },
  cardContainer: {
    width: "45%", 
    marginBottom: 16,  
  },
});

export default ViewDetailScreen;
