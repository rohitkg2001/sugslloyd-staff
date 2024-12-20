import React, { useState } from "react";
import { View, ScrollView, Alert, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
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
import { P } from "../components/text";

const TargetManagementForm = () => {
  const [taskName, setTaskName] = useState("");
  const [project_name, setProjectName] = useState("");
  const [site, setSite] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [materialsConsumed, setMaterialsConsumed] = useState("");
  const [engineerID, setEngineerID] = useState("");
  const [siteEngineer, setSiteEngineer] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [openSiteDropdown, setOpenSiteDropdown] = useState(false);
  const [openEngineerDropdown, setOpenEngineerDropdown] = useState(false);
  const [siteOptions, setSiteOptions] = useState([
    { label: "Site A", value: "site_a" },
    { label: "Site B", value: "site_b" },
  ]);
  const [engineerOptions, setEngineerOptions] = useState([
    { label: "Mihir kr Mishra", value: "engineer_1" },
    { label: "Rohit kr Gupta", value: "engineer_2" },
  ]);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCancel = () => {
    setTaskName("");
    setProjectName("");
    setSite(null);
    setCategory("");
    setDescription("");
    setApprovedBy("");
    setMaterialsConsumed("");
    setEngineerID("");
    setSiteEngineer(null);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleCreate = async () => {
    if (
      !taskName ||
      !project_name ||
      !site ||
      !category ||
      !description ||
      !approvedBy ||
      !materialsConsumed ||
      !engineerID ||
      !siteEngineer
    ) {
      Alert.alert(
        "Fields Are Required",
        "Please fill all the fields before creating a project."
      );
      return;
    }

    const newProject = {
      taskName,
      project_name,
      site,
      category,
      description,
      approvedBy,
      materialsConsumed,
      engineerID,
      siteEngineer,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    const response = await dispatch(addProject(newProject));
    if (response) {
      Alert.alert("Success", "Target created successfully!");
      handleCancel();
      navigation.goBack();
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("Target Management")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        <MyTextInput
          title="Task Name"
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter Task Name"
        />

        <MyTextInput
          title="Project Name"
          value={project_name}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
        />

        <P>Select Site</P>
        <DropDownPicker
          open={openSiteDropdown}
          value={site}
          items={siteOptions}
          setOpen={setOpenSiteDropdown}
          setValue={setSite}
          setItems={setSiteOptions}
          placeholder="Select Site"
        />

        <MyTextInput
          title="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
        />

        <MyTextInput
          title="Approved By"
          value={approvedBy}
          onChangeText={setApprovedBy}
          placeholder="Enter Approver's Name"
        />

        <MyTextInput
          title="Materials Consumed"
          value={materialsConsumed}
          onChangeText={setMaterialsConsumed}
          placeholder="Enter Materials Consumed"
        />

        <MyTextInput
          title="Engineer ID"
          value={engineerID}
          onChangeText={setEngineerID}
          placeholder="Enter Engineer ID"
        />

        <P>Select Site Engineer</P>
        <DropDownPicker
          open={openEngineerDropdown}
          value={siteEngineer}
          items={engineerOptions}
          setOpen={setOpenEngineerDropdown}
          setValue={setSiteEngineer}
          setItems={setEngineerOptions}
          placeholder="Select Site Engineer"
        />

        <TouchableOpacity onPress={() => setShowDatePicker("start")}>
          <MyTextInput
            title="Start Date"
            value={moment(startDate).format("YYYY-MM-DD")}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDatePicker("end")}>
          <MyTextInput
            title="End Date"
            value={moment(endDate).format("YYYY-MM-DD")}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={showDatePicker === "start" ? startDate : endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (showDatePicker === "start") {
                setStartDate(selectedDate || startDate);
              } else {
                setEndDate(selectedDate || endDate);
              }
              setShowDatePicker(false);
            }}
          />
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
          <MyButton title="Save" onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TargetManagementForm;
