import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  SCREEN_WIDTH,
  spacing,
  typography,
  styles,
  ICON_MEDIUM,
  LIGHT,
  PRIMARY_COLOR,
} from "../styles";
import MyHeader from "../components/header/MyHeader";
import { H5, H6, P } from "../components/text";
import { useTranslation } from "react-i18next";
import { sitesData, inventoryData, targetManagementData } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/ClickableCard";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import NoRecord from "./NoRecord";

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sites");
  const [searchText, setSearchText] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);

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
      {renderDetailRow("Order Value", `₹ - ${project.rate}`)}
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
          onPress={() =>
            navigation.navigate("SiteDetailsScreen", { site: item })
          }
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SCREEN_WIDTH - 16,
            paddingHorizontal: 16,
            marginTop: 40,
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <H5
              onPress={() => setActiveTab("Sites")}
              style={[
                typography.textBold,
                {
                  color: activeTab === "Sites" ? PRIMARY_COLOR : "#888888",
                },
              ]}
            >
              {t("Sites").toUpperCase()}
            </H5>
            {activeTab === "Sites" && (
              <View
                style={{
                  height: 3,
                  backgroundColor: PRIMARY_COLOR,
                  width: "37%",
                  marginTop: 4,
                }}
              />
            )}
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <H5
              onPress={() => setActiveTab("Inventory")}
              style={[
                typography.textBold,
                {
                  color: activeTab === "Inventory" ? PRIMARY_COLOR : "#888888",
                },
              ]}
            >
              {t("Inventory").toUpperCase()}
            </H5>
            {activeTab === "Inventory" && (
              <View
                style={{
                  height: 3,
                  backgroundColor: PRIMARY_COLOR,
                  width: "80%",
                  marginTop: 4,
                }}
              />
            )}
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <H5
              onPress={() => setActiveTab("Target")}
              style={[
                typography.textBold,
                {
                  color: activeTab === "Target" ? PRIMARY_COLOR : "#888888",
                },
              ]}
            >
              {t("Target").toUpperCase()}
            </H5>
            {activeTab === "Target" && (
              <View
                style={{
                  height: 3,
                  backgroundColor: PRIMARY_COLOR,
                  width: "50%",
                  marginTop: 4,
                }}
              />
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: SCREEN_WIDTH - 16,
            marginTop: 20,
          }}
        >
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder={t("search_placeholder")}
            style={{ width: SCREEN_WIDTH - 82, marginLeft: 5 }}
          />
          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              spacing.mh1,
              { width: 50, marginLeft: 8 },
            ]}
            onPress={() => setShowBottomSheet(!showBottomSheet)}
          >
            <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
          </Button>
        </View>

        {renderActiveTab()}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailsScreen;
