import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  DANGER_COLOR,
  ICON_LARGE,
} from "../styles";
import Button from "../components/buttons/Button";
import BottomSheet from "../components/bottomsheet/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { transformArray } from "../utils/faker";
import { H1, H2 } from "../components/text";

const VendorSelectionScreen = ({ onClose, setVendor }) => {
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
            {
              justifyContent: "center",
              marginTop: 260,
              width: SCREEN_WIDTH - 16,
              marginHorizontal: 8,
            },
          ]}
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
