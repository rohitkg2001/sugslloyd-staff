import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyButton from "../components/buttons/MyButton";

const VendorSelectionScreen = () => {
  const [vendors, setVendors] = useState([]);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);

  const vendorOptions = [
    { label: "Mihir Mishra", value: "vendor1" },
    { label: "Rohit Gupta", value: "vendor2" },
    { label: "Bittu Pratihast", value: "vendor3" },
    { label: "Dheeraj Yadav", value: "vendor4" },
    { label: "Ujjawal Raj", value: "vendor5" },
  ];

  const { t } = useTranslation();

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

  const handleAssignVendor = () => {
    console.log("Assigned vendor(s):", vendors);
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
          paddingBottom: 100,
        }}
      >
        <View style={styles.vendorContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            {t("Select Vendor")}
          </Text>

          <DropDownPicker
            open={openVendorDropdown}
            value={vendors}
            items={vendorOptions}
            setOpen={setOpenVendorDropdown}
            setValue={setVendors}
            setItems={vendorOptions}
            placeholder="Select Vendor"
            style={dropdownStyle}
            textStyle={dropdownTextStyle}
            searchable={true}
            searchPlaceholder="Search Vendor"
            zIndex={10}
            dropDownMaxHeight={200}
            dropDownDirection="BOTTOM"
            modalTitle="Select Vendor"
            modalAnimationType="slide"
          />
        </View>

        <View
          style={[
            styles.row,
            {
              width: SCREEN_WIDTH - 20,
              marginTop: 480,
              justifyContent: "center", 
              alignItems: "center", 
            },
          ]}
        >
          <MyButton title={t("Assign Vendor")} onPress={handleAssignVendor} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default VendorSelectionScreen;
