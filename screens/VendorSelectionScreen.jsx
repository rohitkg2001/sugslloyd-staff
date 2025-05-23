import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  SCREEN_WIDTH,
  styles,
  typography,
  DANGER_COLOR,
  ICON_LARGE,
  spacing,
} from "../styles";
import Button from "../components/buttons/Button";
import BottomSheet from "../components/bottomsheet/BottomSheet";
import { useSelector } from "react-redux";
import { transformArray } from "../utils/faker";
import { BASE_URL } from "../redux/constant";
import H1 from "../components/text/H2";
import { H2 } from "../components/text";

const VendorSelectionScreen = ({ onClose, setVendor, task_id }) => {
  const [vendors, setVendors] = useState([]);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const vendorInStore = useSelector((state) => state.vendor.vendors);
  const [vendorOptions, setVendorOptions] = useState([]);

  useEffect(() => {
    const result = transformArray(vendorInStore);
    setVendorOptions(result);
  }, [vendorInStore]);

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
    if (!Array.isArray(task_id)) {
      const response = await fetch(`${BASE_URL}/api/task/${task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendor_id: vendors,
        }),
      });

      const data = await response.json();

      setVendor(vendors);
      onClose();
    } else {
      task_id.map(async (task) => {
        const { id } = task;
        const response = await fetch(`${BASE_URL}/api/task/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendor_id: vendors,

          }),
        });
        await response.json();
        Alert.alert("Success", "Vendor assigned successfully", [
          { text: "OK", onPress: onClose },
        ]);
      });
    }
  };

  return (
    <BottomSheet>
      <View>
        <View
          style={[
            styles.vendorContainer,

            { marginLeft: 16, marginTop: 12, marginRight: 16 },
          ]}
        >
          <H1 style={[typography.font20, typography.textBold]}>
            Select Vendor
          </H1>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 8,
              left: 290,
            }}
          >
            <Icon name="close-outline" color={DANGER_COLOR} size={ICON_LARGE} />
          </TouchableOpacity>

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

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            spacing.mh4,
            {
              justifyContent: "center",
              marginTop: 260,
              width: SCREEN_WIDTH - 16,
            },
          ]}
          onPress={handleAssignVendor}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {t("Assign Vendor")}
          </H2>
        </Button>
      </View>
    </BottomSheet>
  );
};

export default VendorSelectionScreen;
