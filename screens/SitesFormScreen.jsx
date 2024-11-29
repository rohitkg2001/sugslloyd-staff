import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addSite, fetchSites } from "../redux/actions/siteActions"; // Import actions

const SitesFormScreen = () => {
  const [state, setState] = useState(null);
  const [city, setCity] = useState("");
  const [projectSerial, setProjectSerial] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [projectCapacity, setProjectCapacity] = useState("");
  const [caNumber, setCaNumber] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [sancationLoad, setSancationLoad] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [loadEnhancementStatus, setLoadEnhancementStatus] = useState("");
  const [netMeter, setNetMetre] = useState("");
  const [solarMeter, setSolarMetre] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Reset form fields
  const handleCancel = () => {
    setState("");
    setCity("");
    setLocation("");
    setProjectSerial("");
    setSiteName("");
    setProjectCapacity("");
    setCaNumber("");
    setContactNo("");
    setVendorName("");
    setSancationLoad("");
    setMeterNumber("");
    setLoadEnhancementStatus("");
    setNetMetre("");
    setSolarMetre("");
    setRemarks("");
  };

  // Handle create button press
  const handleCreate = () => {
    if (!location || !solarMeter || !remarks || !netMeter) {
      Alert.alert(
        "Fields Are Required",
        "Please fill all the fields before creating a project."
      );
    } else {
      // Create site data
      const siteData = {
        state,
        city,
        projectSerial,
        siteName,
        location,
        projectCapacity,
        caNumber,
        contactNo,
        vendorName,
        sancationLoad,
        meterNumber,
        loadEnhancementStatus,
        netMeter,
        solarMeter,
        remarks,
        materialInspectionDate: date,
        installationDate: date,
        commissioningDate: date,
      };

      // Dispatch addSite action to add the new site
      dispatch(addSite(siteData));

      // Refresh the list of sites
      dispatch(fetchSites());

      // Clear form fields
      handleCancel();
      Alert.alert("Site Created", "The site has been created successfully.");
    }
  };

  // Handle date picker change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("create_site")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 18 }]}
        showsVerticalScrollIndicator={false}
      >

        <MyPickerInput
          title={t("site_State")}
          value={state}
          onChange={setState}
          options={[
            { label: "Select State", value: null },
            { label: "Andhra Pradesh", value: "AP" },
            { label: "Bihar", value: "BR" },
            { label: "Chattishgarh", value: "CH" },
          ]}
        />

        <MyPickerInput
          title={t("site_city")}
          enabled={state ? true : false}
          value={city}
          onChange={setCity}
          options={[
            { label: "Select City", value: null },
            { label: "Patna", value: "LA" },
            { label: "Purniea", value: "HOU" },
            { label: "Gaya", value: "NYC" },
          ]}
        />

        <MyTextInput
          title={t("site_location")}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <MyTextInput
          title={t("site_Projectcode")}
          value={projectSerial}
          onChangeText={setProjectSerial}
          placeholder="Enter Project Serial Code"
        />
        <MyTextInput
          title={t("site_name")}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="Enter Site Name"
        />
        <MyTextInput
          title={t("site_projectcapacity")}
          value={projectCapacity}
          onChangeText={setProjectCapacity}
          placeholder="Enter Project Capacity"
        />
        <MyTextInput
          title={t("site_canumber")}
          value={caNumber}
          onChangeText={setCaNumber}
          placeholder="Enter CA Number"
        />
        <MyTextInput
          title={t("site_ContactNo")}
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No."
          keyboardType="numeric"
        />
        <MyTextInput
          title={t("site_I&CVendorName")}
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter I & C Vendor Name"
        />
        <MyTextInput
          title={t("sanction_load")}
          value={sancationLoad}
          onChangeText={setSancationLoad}
          placeholder="Enter Sanction Value"
        />
        <MyTextInput
          title={t("meter_no")}
          value={meterNumber}
          onChangeText={setMeterNumber}
          placeholder="Enter Meter Number"
        />
        <MyTextInput
          title={t("load_enhancementstatus")}
          value={loadEnhancementStatus}
          onChangeText={setLoadEnhancementStatus}
          placeholder="Enter Load Enhancement Status"
        />
        <MyPickerInput
          title={t("site_surveystatus")}
          value={state}
          onChange={setState}
          options={[{ label: t("done") }, { label: t("pending") }]}
        />
        <MyTextInput
          title={t("net_meterserialnumber")}
          value={netMeter}
          onChangeText={setNetMetre}
          placeholder="Net Meter Sl. No"
        />
        <MyTextInput
          title={t("solar_meterserialnumber")}
          value={solarMeter}
          onChangeText={setSolarMetre}
          placeholder="Solar Meter Sl. No"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title={t("material_inspectiondate")}
            value={date.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title={t("spp_installationiondate")}
            value={date.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title={t("commissioning_date")}
            value={date.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>

        <MyTextInput
          title={t("remarks")}
          value={remarks}
          onChangeText={setRemarks}
          placeholder="Description here"
          style={{ height: 100, padding: 10 }}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
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

export default SitesFormScreen;
