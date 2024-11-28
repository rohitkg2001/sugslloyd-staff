import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { addProject } from "../redux/actions/projectAction";
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
  const [date, setDate] = useState(new Date());
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch(); // Initialize dispatch
  const navigation = useNavigation(); // Initialize navigation

  const handleCancel = () => {
    setProjectName("");
    setWorkOrderNumber("");
    setRate("");
    setLocation("");
    setDate(new Date());
  };

  const handleCreate = () => {
    if (!projectName || !workOrderNumber || !rate || !location) {
      Alert.alert(
        "Fields Are Required",
        "Please fill all the fields before creating a project."
      );
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      projectName,
      workOrderNumber,
      rate,
      location,
      date: date.toLocaleDateString(),
    };

    dispatch(addProject(newProject));
    Alert.alert("Success", "Project created successfully!");

    handleCancel();
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("crete_project")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
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
          placeholder="Enter Rate"
        />
        <MyTextInput
          title="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
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
