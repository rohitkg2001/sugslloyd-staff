import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const FormScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [rate, setRate] = useState("");
  const [location, setLocation] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCancel = () => {
    setProjectName("");
    setWorkOrderNumber("");
    setRate("");
    setLocation("");
    setDate(new Date());
  };

  const handleCreate = () => {
    console.log("Creating Project with data:", {
      projectName,
      workOrderNumber,
      rate,
      location,
      date,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
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
          onChangeText={setWorkOrderNumber}
          placeholder="Enter Work Order Number"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title="Date"
            value={date.toLocaleDateString()}
            placeholder="Select Date"
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
