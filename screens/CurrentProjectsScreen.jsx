import { useState } from "react";
import { View } from "react-native";
import { project } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { spacing } from "../styles";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import ClickableCard from "../components/card/ClickableCard";

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
          renderItem={({ item, index }) => (
            <ClickableCard
              key={index}
              item={item}
              isProject={true}
              hideIcons={true}
              handleViewDetails={() =>
                navigation.navigate("taskScreen", { projectId: item.id })
              }
            />
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
