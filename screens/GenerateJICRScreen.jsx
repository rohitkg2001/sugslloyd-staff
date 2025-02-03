import { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H4 } from "../components/text";
import MyPickerInput from "../components/input/MyPickerInput";
import Button from "../components/buttons/Button";
import { blocks, panchayats, wards } from "../utils/faker";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { useDispatch } from "react-redux";
import { setSiteInfo } from "../redux/actions/siteActions";
import MyButton from "../components/buttons/MyButton";

export default function GenerateJICRScreen({ navigation }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const dispatch = useDispatch();

  const getBlockOptions = () =>
    selectedDistrict ? blocks[selectedDistrict] : [];
  const getPanchayatOptions = () =>
    selectedBlock ? panchayats[selectedDistrict] : [];
  const getWardOptions = () =>
    selectedPanchayat ? wards[selectedDistrict] : [];

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedBlock("");
    setSelectedPanchayat("");
    setSelectedWard("");
  };

  const handleReset = () => {
    setSelectedDistrict("");
    setSelectedBlock("");
    setSelectedPanchayat("");
    setSelectedWard("");
    setFromDate(new Date());
    setToDate(new Date());
  };

  const handleCreateJICRReport = () => {
    const reportData = {
      district: selectedDistrict,
      block: selectedBlock,
      panchayat: selectedPanchayat,
      ward: selectedWard,
      fromDate: fromDate.toLocaleDateString(),
      toDate: toDate.toLocaleDateString(),
    };

    dispatch(setSiteInfo(reportData));

    navigation.navigate("jicrReportDetailsScreen", { reportData });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={"Generate JICR Report"} hasIcon />
      <View style={{ flex: 1, width: SCREEN_WIDTH - 16 }}>
        {/* <H4>From</H4>
        {showFromDatePicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setFromDate(date || fromDate);
              setShowFromDatePicker(false);
            }}
          />
        )}
        <Button
          onPress={() => setShowFromDatePicker(true)}
          style={[
            spacing.mv1,
            spacing.p3,
            spacing.bw05,
            { backgroundColor: "#E8F5E9" },
          ]}
        >
          <H4 style={[typography.font16, { color: "black" }]}>
            {fromDate.toLocaleDateString()}
          </H4>
        </Button>

        <H4>To</H4>
        {showToDatePicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setToDate(date || toDate);
              setShowToDatePicker(false);
            }}
          />
        )}
        <Button
          onPress={() => setShowToDatePicker(true)}
          style={[
            spacing.mv1,
            spacing.p3,
            spacing.bw05,
            { backgroundColor: "#E8F5E9" },
          ]}
        >
          <H4 style={[typography.font16, { color: "black" }]}>
            {toDate.toLocaleDateString()}
          </H4>
        </Button> */}
        <MyPickerInput
          title="District"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          options={[
            { label: "Patna", value: "Patna" },
            { label: "Gaya", value: "district2" },
          ]}
        />
        <MyPickerInput
          title="Block"
          value={selectedBlock}
          onChange={setSelectedBlock}
          options={getBlockOptions()}
          style={spacing.mv2}
        />
        <MyPickerInput
          title="Panchayat"
          value={selectedPanchayat}
          onChange={setSelectedPanchayat}
          options={getPanchayatOptions()}
          style={spacing.mv2}
        />
        <MyPickerInput
          title="Ward"
          value={selectedWard}
          onChange={setSelectedWard}
          options={getWardOptions()}
          style={spacing.mv2}
        />
      </View>

      <View
        style={[
          styles.row,
          {
            width: SCREEN_WIDTH / 1.1,
          },
        ]}
      >
        <MyButton title={"RESET DATA"} onPress={handleReset} color="#DC4C64" />
        <MyButton title={"CREATE JICR"} onPress={handleCreateJICRReport} />
      </View>
    </ContainerComponent>
  );
}
