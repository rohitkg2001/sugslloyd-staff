import { useState } from "react";
import { View, ScrollView, Platform } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { project } from "../utils/faker";

const TaskListFormScreen = () => {
  const [projectName, setProjectName] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState(
    project.map((proj) => ({
      label: proj.projectName,
      value: proj.id,
    }))
  );

  const handleReset = () => {
    setProjectName(null);
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
        <MyHeader title="Create Task" hasIcon icon="ellipsis-vertical" />

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
            editable={true}
            onPress={showPicker}
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
          <MyButton title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskListFormScreen;
