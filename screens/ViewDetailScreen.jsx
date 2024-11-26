import { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
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

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  const renderSiteDetails = () => (
    <>
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 16,
        }}
      >
  
      </View>
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.email)}
      {renderDetailRow("Contact Number", site.contact_number)}
      {renderDetailRow("Aadhar Number", site.aadhar_number)}
      {renderDetailRow("Account Name", site.account_name)}
      {renderDetailRow("GST Number", site.gstNumber)}
      {renderDetailRow("Status", site.status)}
    </>
  );

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
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton
            title={t("create_task")}
            onPress={() => navigation.navigate("taskListFormScreen")}
            color="#DC4C64"
          />
          <MyButton
            title={t("view_task")}
            onPress={() => navigation.navigate("taskScreen")}
          />
        </View>
      </View>
    </ContainerComponent>
  );
};

export default ViewDetailScreen;
