import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addProject } from "../redux/actions/projectAction";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import moment from "moment";
import { useTranslation } from "react-i18next";
import MyPickerInput from "../components/input/MyPickerInput";

const FormScreen = () => {
  const [project_name, setProjectName] = useState("");
  const [work_order_number, setWorkOrderNumber] = useState("");
  const [rate, setRate] = useState("");
  const [project_capacity, setCapacity] = useState("");
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [project_in_state, setState] = useState(""); 

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (rate && project_capacity) {
      setTotal(Number(rate) * Number(project_capacity));
    }
  }, [rate, project_capacity]);

  const handleCancel = () => {
    setProjectName("");
    setWorkOrderNumber("");
    setStartDate(new Date());
    setEndDate(new Date());
    setCapacity("");
    setRate("");
    setTotal(0);
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
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
      total: total,
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
      if (selectedDateType === "start") {
        setStartDate(selectedDate);
      } else if (selectedDateType === "end") {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("create_project")} hasIcon={true} isBack={true} />
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

        <MyPickerInput
          title="State"
          Value={project_in_state}
          onChange={(value) => setState(value)}
          options={[
            { label: "Bihar", value: "State 1" },
            { label: "Punjab", value: "State 2" },
            { label: "Haryana", value: "State 3" },
          ]}
        />

        <TouchableOpacity
          onPress={() => {
            setSelectedDateType("start");
            setShowDatePicker(true);
          }}
        >
          <MyTextInput
            title={t("start_date")}
            value={start_date.toLocaleDateString()}
            placeholder="Select Start Date"
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedDateType("end");
            setShowDatePicker(true);
          }}
        >
          <MyTextInput
            title={t("end_date")}
            value={end_date.toLocaleDateString()}
            placeholder="Select End Date"
            editable={false}
          />
        </TouchableOpacity>

        <MyTextInput
          title="Work Order Number"
          value={work_order_number}
          onChangeText={setWorkOrderNumber}
          placeholder="Enter Work Order Number"
        />

        <MyTextInput
          title={t("rate")}
          value={rate}
          onChangeText={setRate}
          placeholder="Enter Rate"
          keyboardType="numeric"
        />

        <MyTextInput
          title={t("site_projectcapacity")}
          value={project_capacity}
          onChangeText={setCapacity}
          placeholder="Enter Capacity"
          keyboardType="numeric"
        />

        <MyTextInput
          title={t("total_title")}
          value={total.toString()}
          editable={false}
          placeholder="Total"
        />

        <MyTextInput
          title={t("description")}
          value={description}
          onChangeText={setDescription}
          placeholder="Description here"
          style={{ height: 100, padding: 10 }}
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

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateType === "start" ? start_date : end_date}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
