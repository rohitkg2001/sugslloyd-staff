import React, { useState } from "react";
import { View, ScrollView, Animated, TouchableOpacity } from "react-native";
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
import { H5, H6 } from "../components/text";
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
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [expandHeight] = useState(new Animated.Value(0));

  
  const MAX_HEIGHT = 330; 

  const handleViewDetails = (siteData) => {
    dispatch(viewSite(siteData));
  };

 
  const renderDetailRow = (label, value) => (
    <View style={[styles.row, spacing.pv1]}>
      {label === "Start Date" && <H6 style={[typography.font16]}>{value}</H6>}

      {label !== "Start Date" && label !== "End Date" && (
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
      {label === "End Date" && (
        <H6
          style={[
            {
              position: "absolute",
              right: 100,
              bottom: 10,
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
      {/* Initially displayed details */}
      {renderDetailRow("Project in State", project.project_in_state)}
      {renderDetailRow("Project Name", project.project_name)}
      {renderDetailRow("Work Order Number", project.work_order_number)}
      {renderDetailRow("Start Date", project.start_date)}
      {renderDetailRow("End Date", project.end_date)}

   
    </>
  );


  const renderHiddenDetails = () => (
    <>
      {renderDetailRow("Project Capacity", `${project.project_capacity} KW`)}
      {renderDetailRow("Description", project.description)}
      {renderDetailRow("Additional Detail 1", project.additional_detail_1)}
      {renderDetailRow("Additional Detail 2", project.additional_detail_2)}
      {renderDetailRow("Additional Detail 3", project.additional_detail_3)}
    </>
  );

  const renderSitesTab = () => (
    <MyFlatList
      data={sitesData}
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isSiteData={true}
          onEyePress={() =>
            navigation.navigate("siteDetailScreen", { site: item })
          }
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

  const renderInventoryTab = () => (
    <MyFlatList
      data={inventoryData}
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isInventoryData={true}
          onEyePress={() =>
            navigation.navigate("inventoryDetailScreen", {
              item: item,
            })
          }
        />
      )}
      ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
    />
  );

  const renderTargetTab = () => (
    <MyFlatList
      data={targetManagementData}
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isTargetManagementData={true}
          onEyePress={() =>
            navigation.navigate("targetManagementScreen", {
              target: item,
            })
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

  // Function to toggle the view of project details
  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
    Animated.timing(expandHeight, {
      toValue: showFullDetails ? 0 : MAX_HEIGHT, 
      duration: 300, 
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
      <MyHeader title={t("project_details")} isBack={true} hasIcon={true} />
      <ScrollView>

        {renderProjectDetails()}

        <Animated.View style={{ height: expandHeight }}>
          {showFullDetails && renderHiddenDetails()}
        </Animated.View>

        <Button
          style={[styles.btn, styles.bgPrimary, spacing.mt2]}
          onPress={toggleDetails}
        >
          <H6 style={{ color: "#FFF" }}>
            {showFullDetails ? t("view Less") : t("View More")}
          </H6>
        </Button>

        {/* Tabs for Sites, Inventory, Target */}
        <View
          style={[
            styles.row,
            {
              marginTop: 40,
            },
          ]}
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

        {/* Search and Bottom Sheet Button */}
        <View style={[styles.row, { alignItems: "center", marginTop: 20 }]}>
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

        {/* Render Active Tab */}
        {renderActiveTab()}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailsScreen;
