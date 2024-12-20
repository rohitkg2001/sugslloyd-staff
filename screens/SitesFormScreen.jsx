import { useEffect, useState } from "react";
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
import {
  addSite,
  fetchSites,
  setStatesAndCities,
} from "../redux/actions/siteActions"; // Import actions
import { SiteFields } from "../utils/faker";

const SitesFormScreen = () => {
  const [date, setDate] = useState(new Date()); //Don't remove
  const [showDatePicker, setShowDatePicker] = useState(false); //Don't remove
  const [states, setStates] = useState([]); //Don't remove
  const [cities, setCities] = useState([]); //Don't remove
  const [site, setSite] = useState({
    state: null,
    district: "",
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Reset form fields
  const handleCancel = () => {
    setSite({});
  };

  // Handle create button press
  const handleCreate = () => {
    // Create site data
    // Dispatch addSite action to add the new site
    // dispatch(addSite(siteData));
    // Refresh the list of sites
    // dispatch(fetchSites());
    // Clear form fields
    // handleCancel();
    // Alert.alert("Site Created", "The site has been created successfully.");
  };

  // Handle date picker change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeText = (name, value) => {
    setSite((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getCityOptions = (selectedState) => {
    const state = states.find((state) => state.name === selectedState);
    return state
      ? state.cities.map((city) => ({
          label: city,
          value: city,
        }))
      : [];
  };

  const handleStateChange = (selectedState) => {
    const cities = getCityOptions(selectedState);
    setCities(cities);
    setSite((prevState) => ({
      ...prevState,
      state: selectedState,
    }));
  };
  useEffect(() => {
    const { states } = setStatesAndCities();

    setStates(states);
  }, [states]);

  return (
    <ContainerComponent>
      <MyHeader title={t("create_site")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 18 }]}
        showsVerticalScrollIndicator={false}
      >
        <MyPickerInput
          title={t("site_State")}
          value={site.state}
          onChange={handleStateChange}
          options={[
            { label: "Select State", value: null },
            ...states.map((state) => ({
              label: state.name,
              value: state.name,
            })),
          ]}
        />

        <MyPickerInput
          title={t("site_city")}
          enabled={site.state ? true : false}
          value={site.city}
          onChange={(value) => onChangeText("district", value)}
          options={[{ label: "Select City", value: null }, ...cities]}
        />

        {SiteFields.map((item, index) => (
          <MyTextInput
            key={index}
            title={t(item.title)}
            onChangeText={(value) => onChangeText(item.fieldName, value)}
            placeholder={item.placeholder}
            keyboardType={item.keyboardType}
          />
        ))}

        <MyTextInput
          title={t("load_enhancementstatus")}
          onChangeText={(value) =>
            onChangeText("load_enhancement_status", value)
          }
          placeholder="Enter Load Enhancement Status"
        />
      
        <MyPickerInput
          title={t("site_surveystatus")}
          onChangeText={(value) => onChangeText("site_survey_status", value)}
          options={[{ label: t("done") }, { label: t("pending") }]}
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
          onChangeText={(value) => onChangeText("remarks", value)}
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
