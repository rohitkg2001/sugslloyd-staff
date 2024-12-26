import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyButton from "../components/buttons/MyButton";
import BottomSheet from "../components/bottomsheet/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { transformArray } from "../utils/faker";
import { BASE_URL } from "../redux/constant";

const VendorSelectionScreen = ({ onClose, setVendor, task_id }) => {
  const [vendors, setVendors] = useState([]);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const vendorInStore = useSelector(state => state.vendor.vendors)
  const [vendorOptions, setVendorOptions] = useState([])

  useEffect(() => {
    const result = transformArray(vendorInStore)
    setVendorOptions(result)
  }, [vendorInStore])


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

  const handleAssignVendor = async () => {
    console.log(vendors)
    const vendor_id = vendorInStore.find(vendor => vendor.firstName === vendors).id

    const response = await fetch(`${BASE_URL}/api/task/${task_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendor_id: vendor_id,
      }),
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    // TODO: Assign vendor to task
    setVendor(vendors)
    onClose();
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
