import MenuItem from "../components/MenuItem";
import { internal } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export default function SettingsScreen({ navigation }) {

  return (
    <ContainerComponent justifyContent="space-between">
      <MyHeader
        title={t("setting")}
        isBack={true}
        hasIcon={true}
        icon={"cog-outline"}
      />
      <View style={{ flex: 1 }}>
        {internal.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            icon={item.icon}
            onPress={() => navigation.navigate(item.page)}
          />
        ))}
      </View>
    </ContainerComponent>
  );
}
