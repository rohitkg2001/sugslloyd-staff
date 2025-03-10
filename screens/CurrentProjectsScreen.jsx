// import All React native

import { View } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
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
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";

// import all redux
import { useSelector } from "react-redux";

// import all styles
import { H5, H6, P, Span } from "../components/text";
import {
  spacing,
  styles,
  typography,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  LIGHT,
} from "../styles";

import { useTaskFunctions } from "../hooks/useTaskFunctions";

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

      <MyFlatList
        data={Array.isArray(currentTasks) ? currentTasks : []}
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
              subtitle={`${item.site?.location || ""}, ${
                item.site?.district || ""
              }, ${item.site?.state || ""}`}
              onPress={() =>
                navigation.navigate("targetManagementScreen", { id: item.id })
              }
              onLongPressAction={(idx) => selectTargets(idx)}
              selected={selectedTargets.find((target) => target.id === item.id)}
              borderColor={borderColor}
            >
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    position: "absolute",

                    right: 0,
                    alignItems: "flex-end",
                    bottom: 70,
                  }}
                >
                  <Span
                    style={[
                      typography.font10,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    breda sl no
                  </Span>

                  <H5
                    style={[
                      typography.font16,
                      typography.fontLato,
                      spacing.mr4,
                      // { marginRight: 20 },
                    ]}
                  >
                    {item.site?.breda_sl_no}
                  </H5>
                </View>

                <H6 style={[typography.font14, typography.fontLato]}>
                  {item.activity}
                </H6>

                <View style={[spacing.mt1, styles.row, spacing.mv2]}>
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
                        { textTransform: "uppercase", color: "gray" },
                      ]}
                    >
                      End date
                    </Span>
                    <P style={[typography.font12, typography.fontLato]}>
                      {item.end_date}
                    </P>
                  </View>
                </View>
              </View>
            </ClickableCard1>
          );
        }}
        ListHeaderComponent={() => (
          <View>
            <View
              style={[
                spacing.mv4,
                styles.row,
                spacing.mh1,
                { alignItems: "center" },
              ]}
            >
              <SearchBar
                placeholder="Search"
                style={{ width: SCREEN_WIDTH - 80 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(true)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>

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
                  name: "Inapproval",
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
