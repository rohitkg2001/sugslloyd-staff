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

const TaskListFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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
        <MyHeader title="Update Task" hasIcon icon="ellipsis-vertical" />

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
          title="Task Name"
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter Task Name"
        />

        <MyTextInput
          title="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
          multiline
          style={{ height: 120, textAlignVertical: "top", padding: 12 }}
        />

        <View>
          <MyTextInput
            title="Select Deadline"
            value={deadline.toLocaleDateString()}
            editable={false}
            onPressIn={showPicker}
          />

          {showDatePicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
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
          <MyButton title="Reset" onPress={handleReset} color="#DC4C64" />
          <MyButton title="Update" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskListFormScreen;

