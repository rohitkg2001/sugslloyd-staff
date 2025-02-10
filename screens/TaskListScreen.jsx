import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import TaskCard from "../components/card/TaskCard";
import { spacing } from "../styles";

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks) || [];
  const [currentTasks, setCurrentTasks] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const { t } = useTranslation();

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex(
        (target) => target.id === idx
      );

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
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={t("task_list")}
        isBack={true}
        rightComponent={true}
        hasIcon={true}
      />
      <MyFlatList
        data={currentTasks}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            navigation={navigation}
            selectTargets={selectTargets}
            selectedTargets={selectedTargets}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
