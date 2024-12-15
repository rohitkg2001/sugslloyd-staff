import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params; // Pass project data through route params
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sites");

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", project.project_name)}
      {renderDetailRow("Work Order Number", project.work_order_number)}
      {renderDetailRow("Order Value", project.rate)}
      {renderDetailRow("Date", project.start_date)}

      <View style={{ flex: 1, paddingVertical: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[spacing.pv4, spacing.ph4]}
        >
          {["Sites", "Inventory", "Tasks"].map((tab) => (
            <View key={tab} style={[spacing.mh4]}>
              <H5
                onPress={() => setActiveTab(tab)}
                style={[
                  typography.textBold,
                  {
                    color: activeTab === tab ? "#000000" : "#888888",
                  },
                ]}
              >
                {tab.toUpperCase()}
              </H5>

              {activeTab === tab && (
                <View
                  style={{
                    height: 4,
                    backgroundColor: "#76885B",
                    width: "80%",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
      <MyHeader
        title={t("project_details")}
        isBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>{renderProjectDetails()}</ScrollView>
    </View>
  );
};

export default ProjectDetailsScreen;
