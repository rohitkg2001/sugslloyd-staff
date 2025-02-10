import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateTask } from "../redux/actions/taskActions";
import { useTranslation } from "react-i18next";

const TaskListFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentTask = useSelector((state) => state.tasks?.currentTask);

  const [projectName, setProjectName] = useState(
    currentTask?.projectName || null
  );
  const [taskName, setTaskName] = useState(currentTask?.taskName || "");
  const [description, setDescription] = useState(
    currentTask?.description || ""
  );
  const [deadline, setDeadline] = useState(
    currentTask?.deadline ? new Date(currentTask.deadline) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (isSelectingStartDate) {
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  };

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
    setDeadline(
      currentTask?.deadline ? new Date(currentTask.deadline) : new Date()
    );
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

  return (
    <ContainerComponent>
      <MyHeader title={t("create_task")} isBack={true} hasIcon={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
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
          <TouchableOpacity
            onPress={() => {
              setIsSelectingStartDate(true);
              setShowDatePicker(true);
            }}
          >
            <MyTextInput
              title="Start Date"
              value={startDate.toLocaleDateString()}
              placeholder="Select Start Date"
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsSelectingStartDate(false);
              setShowDatePicker(true);
            }}
          >
            <MyTextInput
              title="End Date"
              value={endDate.toLocaleDateString()}
              placeholder="Select End Date"
              editable={false}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={isSelectingStartDate ? startDate : endDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
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
