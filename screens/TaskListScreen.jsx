import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import TaskCard from "../components/card/TaskCard";
import { spacing } from "../styles";
import { Menu } from "react-native-paper";

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks) || [];
  const [currentTasks, setCurrentTasks] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([])
  const [showModal, setShowModal] = useState(false);

  const menuRef = useRef(null)

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const { t } = useTranslation();

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex((target) => target.id === idx);

      if (existingTargetIndex > -1) {
        // If already selected, remove it (unselect)
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        // If not selected, add it with `select: true`
        return [...prevTargets, { id: idx, select: true }];
      }
    });
    console.log(selectedTargets)
  };

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <ContainerComponent>
      <MyHeader
        title={t("task_list")}
        isBack={true}
        rightComponent={true}
        onIconPress={() => {
          menuRef.current?.measure((fx, fy, width, height, px, py) => {
            openMenu()
          })
          console.log(showModal)
        }}
        rightIcon={
          <View
            ref={menuRef} // Attach ref to the anchor
            style={{ width: 40, height: 40 }} // Invisible dummy view
          />
        }
        hasIcon={true} />
      <MyFlatList
        data={currentTasks}
        renderItem={({ item }) => <TaskCard item={item} navigation={navigation} selectTargets={selectTargets} selectedTargets={selectedTargets} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
      <Menu
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        anchor={menuRef.current} //Put the anchor on top right icon button from MyHeader
      >
        <Menu.Item title="Assign to Vendor" onPress={() => console.log(selectedTargets)} />
      </Menu>

    </ContainerComponent>
  );
}
