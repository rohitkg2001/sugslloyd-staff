import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import { menuItems } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { View, TouchableOpacity } from "react-native";
import { H5 } from "../components/text";
import { DANGER_COLOR, ICON_MEDIUM } from "../styles/constant";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const { staff } = useSelector(state => state)

  const handleLogoutPress = () => {
    navigation.navigate("loginScreen");
    // Insert logout logic
  };


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
        style={{
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleLogoutPress}
      >
        <Icon name="power-outline" size={ICON_MEDIUM} color={DANGER_COLOR} />
        <H5 style={{ color: DANGER_COLOR }}>{t("logout_button")}</H5>
      </TouchableOpacity>
    </ContainerComponent>
  );
}
