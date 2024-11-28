import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import MyButton from "../components/buttons/MyButton";
import ViewDetailsModal from "../components/ViewDetailsModel";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import { PRIMARY_COLOR } from "../styles/constant";

const ViewDetailScreen = ({ route, navigation }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDispatch, setNewDispatch] = useState({
    productName: "", quantity: "", dispatchDate: "", deliveryDate: "", approvedBy: "",
  });
  const [dispatchedInventory, setDispatchedInventory] = useState([]);
  const { t } = useTranslation();

  const handleDispatchDetailsChange = (field, value) => {
    setNewDispatch(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmDispatch = () => {
    setDispatchedInventory(prev => [...prev, newDispatch]);
    setIsModalVisible(false);
    setNewDispatch({ productName: "", quantity: "", dispatchDate: "", deliveryDate: "", approvedBy: "" });
  };

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>{value || "N/A"}</H5>
    </View>
  );

  const renderButtonsSites = () => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 16 }}>
        <MyButton title={t("create_site")} onPress={() => navigation.navigate("sitesFormScreen")} color="#DC4C64" />
        <MyButton title={t("view_site")} onPress={() => navigation.navigate("totalSitesScreen")} />
    </View>
  );

  const renderButtons = () => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 16 }}>
      <MyButton title={t("create_task")} onPress={() => navigation.navigate("taskListFormScreen")} />
      <MyButton title={t("view_task")} onPress={() => navigation.navigate("taskScreen")} />
    </View>
  );

  const renderSiteDetails = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.projectSerial}>{`Project SL No: ${site.projectSerialCode || "N/A"}`}</Text>
        <Text style={styles.siteName}>{site.siteName || "N/A"}</Text>
        <Text style={styles.vendorName}>{`I&C Vendor: ${site.iCVendorName || "N/A"}`}</Text>
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.column}>
          <Text style={styles.detailItem}>{`CA Number: ${site.cANumber || "N/A"}`}</Text>
          <Text style={styles.detailItem}>{`Meter Number: ${site.meterNumber || "N/A"}`}</Text>
          <Text style={styles.detailItem}>{`Net Meter Sr No: ${site.netMetereSrNo || "N/A"}`}</Text>
          <Text style={styles.detailItem}>{`Solar Meter Sr NO: ${site.solarMeterSrNO || "N/A"}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.detailItem}>{`Address: ${site.location || "N/A"}, ${site.dist || "N/A"}, ${site.state || "N/A"}`}</Text>
          <Text style={styles.detailItem}>{`Contact No: ${site.ContactNo || "N/A"}`}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.surveySection}>
        <Text style={styles.detailItem}>{`Load Enhancement: ${site.loadEnhancementStatus || "N/A"}`}</Text>
        <Text style={styles.detailItem}>{`Material Inspection Date: ${site.materialInspectionDate || "N/A"}`}</Text>
        <Text style={styles.detailItem}>{`SPP Installation Date: ${site.sppInstallationDate || "N/A"}`}</Text>
        <Text style={styles.detailItem}>{`Commissioning Date: ${site.cOMISSIONINGDATE || "N/A"}`}</Text>
      </View>
      <Divider style={styles.divider} />
      {renderButtons()}
      <View style={styles.dispatchButtonContainer}>
        <MyButton title={t("dispatch_inventory")} onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.tableContainer}>
        <Text style={styles.sectionTitle}>Dispatched Inventory</Text>
        <View style={styles.tableRow}>
          {["Product Name", "Quantity", "Dispatch Date", "Delivery Date", "Approved By"].map(header => (
            <Text key={header} style={styles.tableHeader}>{header}</Text>
          ))}
        </View>
        {dispatchedInventory.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            {Object.values(item).map((value, idx) => (
              <Text key={idx} style={styles.tableCell}>{value}</Text>
            ))}
          </View>
        ))}
      </View>
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.projectName)}
      {renderDetailRow("Work Order Number", site.workOrderNumber)}
      {renderDetailRow("Rate", site.rate)}
      {renderDetailRow("Date", site.date)}
      {renderButtonsSites()}
      {renderButtons()}
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.email)}
      {renderDetailRow("Contact Number", site.contact_number)}
      {renderDetailRow("Aadhar Number", site.aadhar_number)}
      {renderDetailRow("Account Name", site.account_name)}
      {renderDetailRow("Ifsc", site.ifsc)}
      {renderDetailRow("Bank_name", site.bank_name)}
      {renderDetailRow("Gst_number", site.gst_number)}
      {renderDetailRow("Pan_number", site.pan_number)}
      {renderDetailRow("Status", site.status)}
      {renderButtonsSites()}
      {renderButtons()}
    </>
  );

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={formType === "vendor" ? t('vendor_details') : site.projectName ? t('project_details') : t('site_details')}
          isBack={true}
          hasIcon={true}
          onIconPress={() => setIsMenuVisible(!isMenuVisible)}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            {formType === "vendor" ? renderVendorDetails() : site.projectName ? renderProjectDetails() : renderSiteDetails()}
          </View>
        </ScrollView>
        <ViewDetailsModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleConfirmDispatch}
          newDispatch={newDispatch}
          handleDispatchDetailsChange={handleDispatchDetailsChange}
        />
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  projectSerial: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  siteName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 16,
    color: "#555",
  },
  detailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  detailItem: {
    fontSize: 14,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  surveySection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  dispatchButtonContainer: {
    marginBottom: 16,
     flexDirection: "row",
    justifyContent: "center"
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
});

export default ViewDetailScreen;