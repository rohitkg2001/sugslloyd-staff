import { useState } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H1 } from "../components/text";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";
import { blocks, panchayats, wards } from "../utils/faker";
import { SCREEN_WIDTH, spacing } from "../styles";
import { useDispatch } from "react-redux";
import { setSiteInfo } from "../redux/actions/siteActions";

export default function SiteLocationScreen({ navigation }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useDispatch()

  const getBlockOptions = () => {
    return selectedDistrict ? blocks[selectedDistrict] : [];
  };

  const getPanchayatOptions = () => {
    return selectedBlock ? panchayats[selectedDistrict] : [];
  };

  const getWardOptions = () => {
    return selectedPanchayat ? wards[selectedDistrict] : [];
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedBlock("");
    setSelectedPanchayat("");
    setSelectedWard("");
  };

  const getSiteInfo = () => {
    const siteInfo = "BIR/PAT/FAT/WAR"
    dispatch(setSiteInfo(siteInfo))
    navigation.navigate('welcomeScreen')
  }


  return (
    <ContainerComponent>
      <MyHeader isBack title={"Set Site Location "} hasIcon />
      <H1>{"Bihar"}</H1>
      <View style={{ flex: 1, width: SCREEN_WIDTH - 16 }}>
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
          onChange={(value) => setSelectedBlock(value)}
          options={getBlockOptions()}
          style={spacing.mv2}
        />
        <MyPickerInput
          title="Panchayat"
          value={selectedPanchayat}
          onChange={(value) => setSelectedPanchayat(value)}
          options={getPanchayatOptions()}
          style={spacing.mv2}
        />
        <MyPickerInput
          title="Ward"
          value={selectedWard}
          onChange={(value) => setSelectedWard(value)}
          options={getWardOptions()}
          style={spacing.mv2}
        />
      </View>

      <MyButton title="Next" onPress={getSiteInfo} />
    </ContainerComponent>
  );
};
