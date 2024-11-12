import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const TaskListFormScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleReset = () => {
    setProjectName("");
    setTaskName("");
    setDescription("");
    setDeadline("");
  };

  const handleSubmit = () => {
    console.log("Submitting Task with data:", {
      projectName,
      taskName,
      description,
      deadline,
    });
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
        />

        <MyTextInput
          title="Deadline"
          date={deadline}
          onDateChange={setDeadline}
          placeholder="Deadline"
        />

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
