import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  SCREEN_WIDTH,
  spacing,
  typography,
  styles,
  TouchableOpacity,
} from "../styles";
import MyHeader from "../components/header/MyHeader";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";
import { sitesData } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/ClickableCard";

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sites");

  const renderDetailRow = (label, value) => (
    <View style={[styles.row, spacing.pv3]}>
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
    </>
  );

  const renderDetailRowForTab = (label, value) => (
    <View style={[styles.row, spacing.pv3]}>
      <H5 style={[typography.textBold, { flex: 1 }]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 2 }]}>
        {value}
      </H5>
    </View>
  );

  const renderSitesTab = () => (
    <MyFlatList
      data={sitesData}
      keyExtractor={(item) =>
        item?.id ? item.id.toString() : `${Math.random()}`
      }
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isSiteData={true}
          hideIcons={true}
          showArrow={true}
          handleViewDetails={() => console.log("Navigating to site:", item)}
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

  const renderInventoryTab = () => <View style={spacing.mt4}></View>;

  const renderTargetTab = () => <View style={spacing.mt4}></View>;

  // Main render function for tabs
  const renderActiveTab = () => {
    switch (activeTab) {
      case "Sites":
        return renderSitesTab();
      case "Inventory":
        return renderInventoryTab();
      case "Target":
        return renderTargetTab();
      default:
        return null;
    }
  };

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
      <MyHeader title={t("project_details")} isBack={true} />
      <ScrollView>
        {renderProjectDetails()}

        {/* Tabs */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[spacing.pv5, spacing.ph1]}
          >
            {["Sites", "Inventory", "Target"].map((tab) => (
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
                      width: "100%",
                      marginTop: 4,
                    }}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {renderActiveTab()}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailsScreen;
