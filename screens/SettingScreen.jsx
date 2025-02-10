// import All react native
import { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

// import All Components
import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import ContainerComponent from "../components/ContainerComponent";

// import Faker
import { menuItems } from "../utils/faker";
// import Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../redux/actions/inventoryAction";
// import All Styles
import { spacing, DANGER_COLOR, typography, ICON_SMALL } from "../styles";
import { H5 } from "../components/text";

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const { staff, id } = useSelector((state) => state);
  const dispatch = useDispatch();

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
        onPress={() => navigation.navigate("loginScreen")}
        style={[
          spacing.mb2,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Icon name="power-outline" size={ICON_SMALL} color={DANGER_COLOR} />
        <H5 style={[typography.fontLato, { color: DANGER_COLOR }]}>
          {t("logout_button")}
        </H5>
      </TouchableOpacity>
    </ContainerComponent>
  );
}
