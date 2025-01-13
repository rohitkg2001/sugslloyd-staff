import { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import { menuItems } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { DANGER_COLOR, ICON_MEDIUM } from "../styles/constant";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../redux/actions/inventoryAction";
import { spacing } from "../styles";

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const { staff, id } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogoutPress = () => {
    navigation.navigate("loginScreen");
  };

  useEffect(() => {
    dispatch(getAllItems());
    // dispatch(getAllTasks(id))
  }, [id]);

  return (
    <ContainerComponent justifyContent="space-between">
      <ProfileCard
        imageUri={staff.image}
        name={`${staff.firstName} ${staff.lastName}`}
        phoneNumber={staff.contactNo}
        onPress={() => navigation.navigate("profileScreen")}
      />
      <View style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            label={t(item.label)}
            icon={item.icon}
            onPress={() => navigation.navigate(item.page)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          spacing.mb2,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={handleLogoutPress}
      >
        <Icon name="power-outline" size={ICON_MEDIUM} color={DANGER_COLOR} />
        <H5 style={{ color: DANGER_COLOR }}>{t("logout_button")}</H5>
      </TouchableOpacity>
    </ContainerComponent>
  );
}
