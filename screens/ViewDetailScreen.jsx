import { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";

const ViewDetailScreen = ({ route, navigation }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [siteCreated, setSiteCreated] = useState(false);
  const { t } = useTranslation();

  // Optimize rendering of the row components
  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  // Site details rendering
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

  // Project details rendering
  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.projectName)}
      {renderDetailRow("Work Order Number", site.workOrderNumber)}
      {renderDetailRow("Rate", site.rate)}
      {renderDetailRow("Date", site.date)}

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

  // Vendor details rendering
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

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={
            formType === "vendor"
              ? t("vendor_details")
              : site.projectName
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
            : site.projectName
              ? renderProjectDetails()
              : renderSiteDetails()}
        </ScrollView>

        {/* Conditionally render the Create Task and View Task buttons */}
        {formType !== "vendor" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
            }}
          >
            <MyButton
              title={t("create_task")}
              onPress={handleCreateTask}
              color="#DC4C64"
            />
            <MyButton title={t("view_task")} onPress={handleViewTask} />
          </View>
        )}
      </View>
    </ContainerComponent>
  );
};

export default ViewDetailScreen;
