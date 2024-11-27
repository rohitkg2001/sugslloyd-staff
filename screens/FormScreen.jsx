import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";

const FormScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [rate, setRate] = useState("");
  const [location, setLocation] = useState("");
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCancel = () => {
    setProjectName("");
    setWorkOrderNumber("");
    setRate("");
    // setLocation("");
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
      <MyHeader title={t("crete_project")} isBack={true} hasIcon={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
        showsVerticalScrollIndicator={false}
      >

        <MyTextInput
          title={t("project_name")}
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
        />
        <MyTextInput
          title={t("word_order_number")}
          value={workOrderNumber}
          onChangeText={setWorkOrderNumber}
          placeholder="Enter Work Order Number"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title={t("date")}
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
          title={t("rate")}
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
          <MyButton
            title={t("cancel")}
            onPress={handleCancel}
            color="#DC4C64"
          />
          <MyButton title={t("create")} onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
