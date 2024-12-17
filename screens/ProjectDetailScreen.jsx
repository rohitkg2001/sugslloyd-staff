import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import { H5, H6, P } from "../components/text";
import { useTranslation } from "react-i18next";
import { sitesData, inventoryData, targetManagementData } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/ClickableCard";

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sites");

  const renderDetailRow = (label, value) => (
    <View style={[styles.row, spacing.pv1, { position: "relative" }]}>
      {label !== "Date" && (
        <H6
          style={[
            { textAlign: "left" },
            label === "Project Name"
              ? [typography.textBold, typography.font20]
              : { fontSize: 16 },
          ]}
        >
          {value}
        </H6>
      )}

      {label === "Date" && (
        <H6
          style={[
            {
              textAlign: "right",
              position: "absolute",
              right: 0,
              bottom: 70,
              fontSize: 16,
            },
          ]}
        >
          {value}
        </H6>
      )}
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
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

  const renderInventoryTab = () => (
    <MyFlatList
      data={inventoryData}
      keyExtractor={(item) =>
        item?.id ? item.id.toString() : `${Math.random()}`
      }
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isInventoryData={true}
          hideIcons={true}
          showArrow={true}
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

  const renderTargetTab = () => (
    <MyFlatList
      data={targetManagementData}
      keyExtractor={(item) =>
        item?.id ? item.id.toString() : `${Math.random()}`
      }
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isTargetManagementData={true}
          hideIcons={true}
          showArrow={true}
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

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
      <MyHeader title={t("project_details")} isBack={true} hasIcon={true} />
      <ScrollView>
        {renderProjectDetails()}

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              spacing.pv5,
              spacing.ph5,
              // { paddingLeft: 38 },
            ]}
          >
            {["Sites", "Inventory", "Target"].map((tab) => (
              <View key={tab} style={[spacing.mh5]}>
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
                      marginTop: 10,
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
