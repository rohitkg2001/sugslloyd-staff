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
import moment from "moment";

const FormScreen = () => {
  const [project_name, setProjectName] = useState("");
  const [work_order_number, setWorkOrderNumber] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCancel = () => {
    setProjectName("");
    setWorkOrderNumber("");
    setDate(new Date());
  };

  const handleCreate = async () => {
    if (!project_name || !work_order_number || !rate) {
      Alert.alert(
        "Fields Are Required",
        "Please fill all the fields before creating a project."
      );
      return;
    }

    const newProject = {
      project_name,
      work_order_number,
      rate,
      date: moment(date).format("YYYY-MM-DD"),
    };
    const response = await dispatch(addProject(newProject));
    if (response) {
      Alert.alert("Success", "Project created successfully!");
      handleCancel();
      navigation.goBack();
    }

  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title="Create Project " hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >

        <MyTextInput
          title="Project Name"
          value={project_name}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
        />
        <MyTextInput
          title="Work Order Number"
          value={work_order_number}
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
          title="Price"
          value={rate}
          onChangeText={setRate}
          placeholder="Enter Price"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
          <MyButton title="Create" onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
