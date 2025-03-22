// import All React native
import { useState } from "react";
import { View } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";

// import all components
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomMenu from "../components/TargetScreen/CustomMenu";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/Filter";
//import SearchBar from "../components/input/SearchBar";

// import all redux
import { useSelector } from "react-redux";

// import all styles
import { H4, H5, H6, P, Span } from "../components/text";
import { spacing, styles, typography } from "../styles";

import { useTaskFunctions } from "../hooks/useTaskFunctions";
import DashboardFilter from "../components/filters/DashboardFilter";
import { useFilterTasks } from "../hooks/useFilterTasks";

export default function CurrentProjectsScreen({ navigation }) {
  const { staff } = useSelector((state) => state);
  const { tasks } = useSelector((state) => state.tasks);

  const { t } = useTranslation();

  const {
    currentTasks,
    menuVisible,
    selectedTargets,
    showVendorSelection,
    activeTab,
    menuRef,
    showBottomSheet,
    setShowBottomSheet,
    toggleMenu,
    closeMenu,
    selectTargets,
    assignMultipleTasksToVendor,
    approveMultipleTasks,
    handleTabSelection,
  } = useTaskFunctions(staff);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("All");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // import in code useFilterTasks in Hooks folders
  const filteredTasks = useFilterTasks(currentTasks, searchQuery, dateFilter);

  return (
    <ContainerComponent>
      <MyHeader
        title="Task"
        hasIcon
        isBack
        rightComponent
        onIconPress={toggleMenu}
        rightIcon={
          <View
            ref={menuRef}
            style={{ width: 40, height: 40, backgroundColor: "gray" }}
          />
        }
      />
      <DashboardFilter updateDateFilter={setDateFilter} />
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ marginHorizontal: 10 }}
      />
      ;
      <MyFlatList
        // data={Array.isArray(currentTasks) ? currentTasks : []}
        data={filteredTasks} // Use filtered tasks
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isCompleted = item.status === "Completed"; // Assuming "status" is the field that indicates completion

          // Ensure end_date is parsed correctly and compare dates only (ignore the time part)
          const endDate = moment(item.end_date).startOf("day"); // Ignore time part

          // If the task is not completed, check if it's past due
          const isPastDue =
            !isCompleted && endDate.isBefore(moment().startOf("day"), "day");

          // Set border color
          let borderColor = "transparent"; // Default to transparent if completed
          if (!isCompleted) {
            borderColor = isPastDue ? "red" : "green"; // Red if past due, green if ongoing
          }

          return (
            <ClickableCard1
              key={item.id}
              index={item.id}
              title={item.site?.site_name || ""}
              onPress={() =>
                navigation.navigate("targetManagementScreen", { id: item.id })
              }
              onLongPressAction={(idx) => selectTargets(idx)}
              selected={selectedTargets.find((target) => target.id === item.id)}
              borderColor={borderColor}
            >
              <View style={{ position: "relative" }}>
                <H4
                  style={[
                    typography.font12,
                    typography.fontLato,
                    { marginTop: -20, bottom: 30 },
                  ]}
                >
                  {`${item.site?.location || ""}, ${
                    item.site?.district || ""
                  }, ${item.site?.state || ""}`}
                </H4>

                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    alignItems: "flex-end",
                    bottom: 45,
                  }}
                >
                  <H6 style={[typography.font14, typography.fontLato]}>
                    {item.activity}
                  </H6>
                  <Span
                    style={[
                      typography.font10,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray", top: 15 },
                    ]}
                  >
                    breda sl no
                  </Span>
                  <H5
                    style={[
                      typography.font12,
                      typography.fontLato,
                      typography.textBold,
                      spacing.mr4,
                      { top: 10 },
                    ]}
                  >
                    {item.site?.breda_sl_no}
                  </H5>
                </View>

                <View style={[styles.row, { marginTop: -14 }]}>
                  <View>
                    <Span
                      style={[
                        typography.font10,
                        typography.fontLato,
                        { textTransform: "uppercase", color: "gray" },
                      ]}
                    >
                      Start date
                    </Span>
                    <P style={[typography.font12, typography.fontLato]}>
                      {item.start_date}
                    </P>
                  </View>

                  <View>
                    <Span
                      style={[
                        typography.font10,
                        typography.fontLato,
                        {
                          textTransform: "uppercase",
                          color: "gray",
                          right: 180,
                        },
                      ]}
                    >
                      End date
                    </Span>
                    <P
                      style={[
                        typography.font12,
                        typography.fontLato,
                        { right: 180 },
                      ]}
                    >
                      {item.end_date}
                    </P>
                  </View>
                </View>

                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    alignItems: "flex-end",
                    top: 20,
                  }}
                >
                  <H6
                    style={[
                      typography.font14,
                      typography.fontLato,
                      { color: item.status === "Complete" ? "red" : "green" },
                    ]}
                  >
                    {item.status}
                  </H6>
                </View>
              </View>
            </ClickableCard1>
          );
        }}
        ListHeaderComponent={() => (
          <View>
            <TabBar
              tabs={[
                {
                  name: "Unassigned",
                  count: tasks.filter((t) => !t.vendor_id).length || "",
                },
                {
                  name: "Assigned",
                  count:
                    tasks.filter((t) => t.vendor_id && !t.image).length || "",
                },
                {
                  name: "In Approval",
                  count:
                    tasks.filter(
                      (t) => t.image && t.vendor_id && t.status !== "Completed"
                    ).length || "",
                },

                {
                  name: "Done",
                  count:
                    tasks.filter((t) => t.status === "Completed").length || "",
                },
                { name: "View All", count: tasks.length || "" },
                { name: "Rejected" },
              ].map((tab) => (tab.count ? tab : { name: tab.name }))}
              activeTab={activeTab}
              onTabSelected={handleTabSelection}
            />
            {activeTab === "Rejected" && (
              <View
                style={{
                  alignItems: "center",
                  top: 12,
                }}
              >
                <P style={[typography.font18, typography.textBold]}>
                  No Reject Found
                </P>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />
      <CustomMenu
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        assignTasks={assignMultipleTasksToVendor}
        approveTasks={approveMultipleTasks}
        disableAssign={
          selectedTargets.length > 0 &&
          selectedTargets.some((target) => target.hasVendor)
        }
        disableApprove={selectedTargets.length === 0 || activeTab !== "Pending"}
      />
      {showBottomSheet && (
        <Filter
          onClose={() => setShowBottomSheet(false)}
          onApply={applyFilterFromRedux}
        />
      )}
      {showVendorSelection && (
        <VendorSelectionScreen
          onClose={() => setShowVendorSelection(false)}
          task_id={selectedTargets}
        />
      )}
    </ContainerComponent>
  );
}
