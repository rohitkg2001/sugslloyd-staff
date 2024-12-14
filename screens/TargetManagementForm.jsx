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
  const [project_name, setProjectName] = useState("");
  const [site, setSite] = useState(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [siteEngineer, setSiteEngineer] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [openSiteDropdown, setOpenSiteDropdown] = useState(false);
  const [openEngineerDropdown, setOpenEngineerDropdown] = useState(false);
  const [siteOptions, setSiteOptions] = useState([
    { label: "Site A", value: "site_a" },
    { label: "Site B", value: "site_b" },
    { label: "Site C", value: "site_c" },
    { label: "Site D", value: "site_d" },
  ]);
  const [engineerOptions, setEngineerOptions] = useState([
    { label: "Engineer 1", value: "engineer_1" },
    { label: "Engineer 2", value: "engineer_2" },
    { label: "Engineer 3", value: "engineer_3" },
  ]);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCancel = () => {
    setProjectName("");
    setSite(null);
    setCategory("");
    setName("");
    setSiteEngineer(null);
    setDate(new Date());
  };

  const handleCreate = async () => {
    if (!project_name || !site || !category || !name || !siteEngineer) {
      Alert.alert(
        "Fields Are Required",
        "Please fill all the fields before creating a project."
      );
      return;
    }

    const newProject = {
      project_name,
      site,
      category,
      name,
      siteEngineer,
      date: moment(date).format("YYYY-MM-DD"),
    };
    const response = await dispatch(addProject(newProject));
    if (response) {
      Alert.alert("Success", "Target created successfully!");
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

  const dropdownStyle = {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F0FAF0",
  };

  const dropdownTextStyle = {
    fontSize: 16,
    color: "#333",
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
          title="Project Name"
          value={project_name}
          onChangeText={setProjectName}
          placeholder="Enter Project Name"
        />

        <View>
          <P style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
            Select Site
          </P>
          <DropDownPicker
            multiple={true}
            open={openSiteDropdown}
            value={site}
            items={siteOptions}
            setOpen={setOpenSiteDropdown}
            setValue={setSite}
            setItems={setSiteOptions}
            placeholder="Select Site"
            style={dropdownStyle}
            textStyle={dropdownTextStyle}
            searchable={true}
            searchPlaceholder="Search Site"
            mode="BADGE"
          />
        </View>

        <MyTextInput
          title="Category"
          value={category}
          onChangeText={setCategory}
          placeholder="Enter Category"
        />

        <MyTextInput
          title="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />

        <View>
          <P style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
            Select Site Engineer
          </P>
          <DropDownPicker
            open={openEngineerDropdown}
            value={siteEngineer}
            items={engineerOptions}
            setOpen={setOpenEngineerDropdown}
            setValue={setSiteEngineer}
            setItems={setEngineerOptions}
            placeholder="Select Site Engineer"
            style={dropdownStyle}
            textStyle={dropdownTextStyle}
            searchable={true}
            searchPlaceholder="Search Engineer"
          />
        </View>
        <TouchableOpacity onPress={() => setShowDatePicker("start")}>
          <MyTextInput
            title={t("Start Date")}
            value={startDate.toLocaleDateString()}
            placeholder="Select Start Date"
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker("end")}>
          <MyTextInput
            title={t("End Date")}
            value={endDate.toLocaleDateString()}
            placeholder="Select End Date"
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
          <MyButton title={t("Save")} onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TargetManagementForm;
