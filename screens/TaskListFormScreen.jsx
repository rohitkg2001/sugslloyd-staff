import React, { useState, useEffect } from "react";
import { View, ScrollView, Platform } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { updateTask } from '../redux/actions/taskActions';
import { project } from "../utils/faker";
import { useTranslation } from "react-i18next";

const TaskListFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentTask = useSelector(state => state.tasks?.currentTask);

  const [projectName, setProjectName] = useState(currentTask?.projectName || null);
  const [taskName, setTaskName] = useState(currentTask?.taskName || "");
  const [description, setDescription] = useState(currentTask?.description || "");
  const [deadline, setDeadline] = useState(currentTask?.deadline ? new Date(currentTask.deadline) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState(
    project.map((proj) => ({
      label: proj.projectName,
      value: proj.id,
    }))
  );

  useEffect(() => {
    if (currentTask) {
      setProjectName(currentTask.projectName);
      setTaskName(currentTask.taskName);
      setDescription(currentTask.description);
      setDeadline(new Date(currentTask.deadline));
    }
  }, [currentTask]);

  const handleReset = () => {
    setProjectName(currentTask?.projectName || null);
    setTaskName(currentTask?.taskName || "");
    setDescription(currentTask?.description || "");
    setDeadline(currentTask?.deadline ? new Date(currentTask.deadline) : new Date());
  };

  const handleSubmit = () => {
    if (currentTask) {
      const updatedTask = {
        ...currentTask,
        projectName,
        taskName,
        description,
        deadline: deadline.toISOString(),
      };
      dispatch(updateTask(updatedTask));
      navigation.goBack();
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };


  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        <MyHeader title={t("update_task")} hasIcon />

        <DropDownPicker
          open={open}
          value={projectName}
          items={projects}
          setOpen={setOpen}
          setValue={setProjectName}
          placeholder="Select a Project"
          searchable={true}
          searchPlaceholder="Search Project"
          style={{ marginBottom: 16, backgroundColor: "#E1F3E1" }}
          searchTextInputStyle={{
            color: "black",
          }}
          zIndex={3000}
        />

        <MyTextInput
          title={t("task_name")}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter Task Name"
        />

        <MyTextInput
          title={t("description")}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
          multiline
          style={{ height: 120, textAlignVertical: "top", padding: 12 }}
        />

        <View>
          <MyTextInput
            title={t("start_date")}
            value={deadline.toLocaleDateString()}
            editable={false}
            onPressIn={showPicker}
          />
          <MyTextInput
            title={t("end_date")}
            value={deadline.toLocaleDateString()}
            editable={false}
            onPressIn={showPicker}
          />

          {showDatePicker && (
            <DateTimePicker value={deadline} mode="date" onChange={true} />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton
            title={t("reset_button")}
            onPress={handleReset}
            color="#DC4C64"
          />
          <MyButton title={t("update_button")} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskListFormScreen;

