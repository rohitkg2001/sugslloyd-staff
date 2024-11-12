import React, { useState } from "react";
import { View, ScrollView, Platform, Text } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { project } from "../utils/faker";

const MaterialAllocationForm = () => {
  const [projectName, setProjectName] = useState(null);
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState(0);
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
    setMaterialName("");
    setQuantity(0);
    setDeadline(new Date());
  };

  const handleSubmit = () => {
    console.log("Submitting Material Allocation with data:", {
      projectName,
      materialName,
      quantity,
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
        <MyHeader
          title="Material Allocation"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
      
        />

        {/* Project Dropdown */}
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

        {/* Material Name Input */}
        <MyTextInput
          title="Material Name"
          value={materialName}
          onChangeText={setMaterialName}
          placeholder="Enter Material Name"
        />

        {/* Quantity Input */}
        <MyTextInput
          title="Quantity"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(parseInt(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter Quantity"
        />

        <MyTextInput
          title="Allotment Date"
          value={deadline.toLocaleDateString()}
          editable={false}
        />
        <MyButton title="Select Allotment Date" onPress={showPicker} />
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

export default MaterialAllocationForm;
