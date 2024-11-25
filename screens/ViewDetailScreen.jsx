import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import MyButton from "../components/buttons/MyButton";

const ViewDetailScreen = ({ route, navigation }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("Date", site.date)}
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.mailId)}
      {renderDetailRow("Contact No", site.contactNumber)}
      {renderDetailRow("Location", site.location)}
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
            title="Create Task"
            onPress={() => navigation.navigate("taskListFormScreen")}
            color="#DC4C64"
          />
          <MyButton
            title="View Task"
            onPress={() => navigation.navigate("taskScreen")}
          />
        </View>
      </View>
    </ContainerComponent>
  );
};

export default ViewDetailScreen;
