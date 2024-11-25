import { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const FormScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [workOrderNumber, setworkOrderNumber] = useState("");
  const [rate, setRate] = useState("");
  const [location, setLocation] = useState("");

  const handleCancel = () => {
    setprojectName("");
    setworkOrderNumber("");
    setRate("");
  };

  const handleCreate = () => {
    console.log("Creating Project with data:", {
      projectName,
      workOrderNumber,
      rate,
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
        <MyHeader title="Project Details" hasIcon />

        <MyTextInput
          title="Project Name"
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
        />
        <MyTextInput
          title="Work Order Number"
          value={workOrderNumber}
          onChangeText={setworkOrderNumber}
          placeholder="Enter Work Order Number"
        />
        <MyTextInput
          title="Date"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <MyTextInput
          title="Rate"
          value={rate}
          onChangeText={setRate}
          placeholder="Rate"
        />
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
            },
          ]}
        >
          <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
          <MyButton title="Create" onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
