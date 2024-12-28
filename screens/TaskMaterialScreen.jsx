import React, { useState } from "react";
import { View, ScrollView, Alert, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import { useTranslation } from "react-i18next";
import { P } from "../components/text";
import MyButton from "../components/buttons/MyButton";
import DashboardFilter from "../components/filters/DashboardFilter";

const TaskMaterialScreen = () => {
  const [site, setSite] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openSiteDropdown, setOpenSiteDropdown] = useState(false);
  const [openEngineerDropdown, setOpenEngineerDropdown] = useState(false);
  const [siteOptions, setSiteOptions] = useState([
    { label: "Cement", value: "cement" },
    { label: "Sand", value: "sand" },
    { label: "Bricks", value: "bricks" },
    { label: "Steel", value: "steel" },
  ]);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dropdownStyle = {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F0FAF0",
    zIndex: 10,
  };

  const dropdownTextStyle = {
    fontSize: 16,
    color: "#333",
  };
  const handleCancel = () => {
    setSite({});
  };
  const handleCreate = () => {};

  const toggleSiteDropdown = () => {
    setOpenSiteDropdown(!openSiteDropdown);
    if (openEngineerDropdown) {
      setOpenEngineerDropdown(false);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("Material Allotment")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        <View>
          <P style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
            Select Material
          </P>
          <DropDownPicker
            multiple={true}
            open={openSiteDropdown}
            value={site}
            items={siteOptions}
            setOpen={setOpenSiteDropdown}
            setValue={setSite}
            setItems={setSiteOptions}
            placeholder="Select Material"
            style={dropdownStyle}
            textStyle={dropdownTextStyle}
            searchable={true}
            searchPlaceholder="Search Site"
            mode="BADGE"
            onOpen={toggleSiteDropdown}
          />
        </View>

        {/* <TouchableOpacity onPress={() => setShowDatePicker("start")}>
          <MyTextInput
            title={t("Dispatch Date")}
            value={startDate.toLocaleDateString()}
            placeholder="Select Dispatch Date"
            editable={false}
          />
        </TouchableOpacity> */}
        <DashboardFilter />

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
        <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
          <MyButton
            title={t("Cancel")}
            onPress={handleCancel}
            color="#DC4C64"
          />
          <MyButton title={t("Allot")} onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskMaterialScreen;
