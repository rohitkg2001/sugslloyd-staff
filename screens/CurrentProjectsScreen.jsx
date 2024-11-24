import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { project } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { ICON_MEDIUM, LIGHT, SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import Button from "../components/buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText] = useState("");
  const { t } = useTranslation();

  const filteredProjects = project.filter((item) =>
    item.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ContainerComponent>
      <View>
        <MyFlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("taskScreen")}
            >
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{` ${item.siteName}`}</P>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={[spacing.mh2, spacing.mt1]}
          ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
          ListHeaderComponent={() => (
            <SearchBar placeholder={t("placeholder")} />
          )}
        />
      </View>
    </ContainerComponent>
  );
}
