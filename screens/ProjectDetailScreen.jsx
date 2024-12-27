import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
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
import { H4, H5, H6, Span, P, H3 } from "../components/text";
import { useTranslation } from "react-i18next";
import { inventoryData, targetManagementData } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/ClickableCard";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import Tabs from "../components/Tabs";
import NoRecord from "./NoRecord";
import { getStateById } from "../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchSites } from "../redux/actions/siteActions";

const ProjectDetailsScreen = ({ route, navigation, description }) => {
  const { project } = route.params;
  const [Project, setProject] = useState({
    state: "",
    project_name: "",
    work_order_number: "",
    start_date: "",
    end_date: "",
    project_capacity: "",
    description: "",
  });
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sites");
  const [state, setState] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [sites, setSites] = useState([]);
  const storeState = useSelector((state) => state);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const dispatch = useDispatch();

  const setAsyncState = async () => {
    const state = await getStateById(4);
    setState(state);
  };
  useEffect(() => {
    setAsyncState();
    setProject(project);
    dispatch(fetchSites());
    console.log(project.sites);
    setSites(storeState.project.projects[0].sites);
  }, [storeState]);

  const toggleDescription = () => {
    setIsDescriptionExpanded((prevState) => !prevState);
  };

  const renderSitesTab = () => (
    <MyFlatList
      data={sites}
      renderItem={({ item, index }) => (
        <ClickableCard
          key={item.id || index}
          item={item}
          isSite={true}
          handleViewDetails={() =>
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
          handleViewDetails={() =>
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
          handleViewDetails={() =>
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

  const isDataAvailable = project && Object.keys(project).length > 0;
  // const toggleDescription = () => {
  //   setIsDescriptionExpanded((prevState) => !prevState);
  // };
  // const truncatedDescription =
  //   Project.description && Project.description.length > 100
  //     ? Project.description.slice(0, 100)
  //     : Project.description;

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
      <MyHeader title={t("project_details")} isBack={true} hasIcon={true} />
      <ScrollView>
        <View>
          {isDataAvailable ? (
            <ScrollView>
              <H5
                style={{
                  textTransform: "uppercase",
                }}
              >
                {state}
              </H5>
              <H3>{Project.project_name}</H3>
              <H6
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,
                  textAlign: "right",
                  fontSize: 12,
                }}
              >
                {Project.work_order_number}
              </H6>

              <View>
                <Span style={[typography.font14, spacing.pv1]}>Capacity</Span>
                <P style={[typography.font16]}>{Project.project_capacity} KW</P>
              </View>

              <View style={[spacing.mt1, styles.row, spacing.pv2]}>
                <View>
                  <Span
                    style={[typography.font14, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font16]}>{Project.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font14, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font16]}>{Project.end_date}</P>
                </View>
              </View>

              {/* <H6>{Project.description}</H6> */}
              {/* <View>
                <H6 style={[typography.font16]}>
                  {isDescriptionExpanded
                    ? Project.description
                    : ${truncatedDescription}...}
                  <Span
                    style={{ color: PRIMARY_COLOR, fontSize: 18 }}
                    onPress={toggleDescription}
                  >
                    {isDescriptionExpanded ? " Read Less" : " Read More"}
                  </Span>
                </H6>
              </View> */}

              <View>
                <TouchableOpacity onPress={toggleDescription}>
                  <P
                    style={[typography.font16]}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {Project.description}
                  </P>
                </TouchableOpacity>
                {Project.description.length > 100 && (
                  <Span
                    style={{ color: PRIMARY_COLOR, fontSize: 18 }}
                    onPress={toggleDescription}
                  >
                    {isDescriptionExpanded ? " Read Less" : " Read More"}
                  </Span>
                )}
              </View>
            </ScrollView>
          ) : (
            <NoRecord msg="No data found" />
          )}
        </View>

        <Tabs
          tabs={[t("Sites"), t("Inventory"), t("Target")]}
          onTabPress={(index) => {
            const tabName = ["Sites", "Inventory", "Target"][index];
            setActiveTab(tabName);
            setShowBottomSheet(true);
          }}
        />

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

        {renderActiveTab()}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailsScreen;
