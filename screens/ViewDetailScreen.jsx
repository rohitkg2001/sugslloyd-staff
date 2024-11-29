import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ViewDetailScreen = ({ route, navigation }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [siteCreated, setSiteCreated] = useState(false);
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation();
  const { currentProject } = useSelector(state => state.project);
  useEffect(() => {
    if (currentProject) {
      setProject(currentProject)
      setLoading(false)
    }
  }, [currentProject])


  // Optimize rendering of the row components
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
      {renderDetailRow("Site Name", site.siteName)}
      {renderDetailRow("State", site.state)}
      {renderDetailRow("District", site.dist)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("Contact No", site.contactNo)}
      {renderDetailRow("Project Serial Code", site.projectSerialCode)}
      {renderDetailRow("Project Capacity", site.projectCapacity)}
      {renderDetailRow("CA Number", site.cANumber)}
      {renderDetailRow("Sanction Load", site.sanctionLoad)}
      {renderDetailRow("Meter Number", site.meterNumber)}
      {renderDetailRow("Load Enhancement Status", site.loadEnhancementStatus)}
      {renderDetailRow("Site Survey Status", site.siteSurveyStatus)}
      {renderDetailRow("Net Meter Sr No", site.netMeterSrNo)}
      {renderDetailRow("Solar Meter Sr NO", site.solarMeterSrNO)}
      {renderDetailRow("Material Inspection Date", site.materialInspectionDate)}
      {renderDetailRow("SPP INSTALLATION DATE", site.sppInstallationDate)}
      {renderDetailRow("COMMISSIONING DATE", site.commissioningDate)}
      {renderDetailRow("Remarks", site.remarks)}
      {renderDetailRow("I & C Vendor Name", site.iCVendorName)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", project.project_name)}
      {renderDetailRow("Work Order Number", project.work_order_number)}
      {renderDetailRow("Price", project.rate)}
      {renderDetailRow("Date", project.start_date)}

      <View style={[styles.row, spacing.mv4]}>
        <MyButton
          title={t("create_site")}
          onPress={() => {
            setSiteCreated(true);
            navigation.navigate("sitesFormScreen");
          }}
          color="#DC4C64"
        />
        <MyButton
          title={t("view_site")}
          onPress={() => navigation.navigate("totalSitesScreen")}
        />
      </View>
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.email)}
      {renderDetailRow("Contact Number", site.contactNumber)}
      {renderDetailRow("Aadhar Number", site.aadharNumber)}
      {renderDetailRow("Account Name", site.accountName)}
      {renderDetailRow("Ifsc", site.ifsc)}
      {renderDetailRow("Bank Name", site.bankName)}
      {renderDetailRow("Gst Number", site.gstNumber)}
      {renderDetailRow("Pan Number", site.panNumber)}
      {renderDetailRow("Status", site.status)}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 16,
        }}
      >
        <MyButton
          title={t("create_site")}
          onPress={() => {
            setSiteCreated(true);
            navigation.navigate("sitesFormScreen");
          }}
          color="#DC4C64"
        />
        <MyButton
          title={t("view_site")}
          onPress={() => navigation.navigate("totalSitesScreen")}
        />
      </View>
    </>
  );

  // Optimized button handler using useCallback
  const handleViewTask = useCallback(() => {
    navigation.navigate("taskScreen");
  }, [navigation]);

  const handleCreateTask = useCallback(() => {
    navigation.navigate("taskListFormScreen");
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={
            formType === "vendor"
              ? t("vendor_details")
              : formType === "project"
                ? t("project_details")
                : t("site_details")
          }
          isBack={true}
          hasIcon={true}
          onIconPress={() => setIsMenuVisible(!isMenuVisible)}
        />
        <ScrollView>
          {formType === "vendor"
            ? renderVendorDetails()
            : formType === "project"
              ? renderProjectDetails()
              : renderSiteDetails()}
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