import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, styles, typography } from "../styles";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import { H5, P, Span } from "../components/text";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomMenu from "../components/TargetScreen/CustomMenu";
import TabBar from "../components/TabBar";

export default function CurrentProjectsScreen({ navigation }) {
  const { staff } = useSelector((state) => state);
  const { tasks } = useSelector((state) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState([]);
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [activeTab, setActiveTab] = useState("Unassigned");
  const menuRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (staff?.id) dispatch(getAllTasks(staff.id));
  }, [staff]);

  useEffect(() => {
    if (Array.isArray(tasks)) setCurrentTasks(tasks);
  }, [tasks]);

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex(
        (target) => target.id === idx
      );

      if (existingTargetIndex > -1) {
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        return [...prevTargets, { id: idx, select: true }];
      }
    });
  };

  const assignMultipleTasksToVendor = () => {
    closeMenu();
    setShowVendorSelection(true);
  };

  const handleTabSelection = (tab) => {
    setActiveTab(tab);

    if (tab === "Unassigned") {
      setCurrentTasks(tasks.filter((task) => !task.vendor_id));
    } else if (tab === "Assigned") {
      setCurrentTasks(tasks.filter((task) => task.vendor_id && task.image));
    } else if (tab === "Pending") {
      setCurrentTasks(tasks.filter((task) => task.status === "Pending"));
    } else if (tab === "Done") {
      setCurrentTasks(tasks.filter((task) => task.status === "Done"));
    } else if (tab === "View All") {
      setCurrentTasks(tasks);
    }
  };

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
        renderItem={({ item }) => (
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
          >
            <View>
              <H5 style={[typography.font20]}>{item.activity}</H5>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date || "N/A"}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font12]}>{item.end_date || "N/A"}</P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        ListHeaderComponent={() => (
          <TabBar
            tabs={["Unassigned", "Assigned", "Pending", "Done", "View All"]}
            activeTab={activeTab}
            onTabSelected={handleTabSelection}
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />

      <CustomMenu
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        assignTasks={assignMultipleTasksToVendor}
      />

      {showVendorSelection && (
        <VendorSelectionScreen
          onClose={() => setShowVendorSelection(false)}
          task_id={selectedTargets}
        />
      )}
    </ContainerComponent>
  );
}
