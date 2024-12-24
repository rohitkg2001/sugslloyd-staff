import React, { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyButton from "../components/buttons/MyButton";
import BottomSheet from "../components/bottomsheet/BottomSheet";

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
    height: 20,
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
    <BottomSheet>
      <View>
        <View
          style={[
            styles.vendorContainer,
            { marginLeft: 20, marginTop: 10, marginRight: 10 },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
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
            dropDownMaxHeight={100}
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
              marginTop: 250,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <MyButton title={t("Assign Vendor")} onPress={handleAssignVendor} />
        </View>
      </View>
    </BottomSheet>
  );
};

export default VendorSelectionScreen;
