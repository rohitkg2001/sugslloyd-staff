import React, { useState } from "react";
import { View, ScrollView, Button, Platform } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const TaskListFormScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleReset = () => {
    setProjectName("");
    setTaskName("");
    setDescription("");
    setDeadline(new Date());
  };

  const handleSubmit = () => {
    console.log("Submitting Task with data:", {
      projectName,
      taskName,
      description,
      deadline,
    });
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
        <MyHeader title="Task Details" hasIcon icon="ellipsis-vertical" />

        <MyTextInput
          title="Project Name"
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
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

        <MyTextInput
          title="Selected Deadline"
          value={deadline.toLocaleDateString()}
          editable={false}
        />
        <MyButton title="Select Deadline" onPress={showPicker} />
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton title="Reset" onPress={handleReset} color="#DC4C64" />
          <MyButton title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskListFormScreen;
