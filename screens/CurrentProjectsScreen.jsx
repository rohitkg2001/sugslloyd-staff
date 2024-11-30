import { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { projects } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, styles, LIGHT, SCREEN_WIDTH, ICON_MEDIUM } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import ClickableCard from "../components/card/ClickableCard";
import Filter from "../components/Filter";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { t } = useTranslation();

  const filteredProjects = projects.filter((item) =>
    item.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ContainerComponent>

      <MyFlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isProject={true}
            hideIcons={true}
            showArrow={true}
            handleViewDetails={() =>
              navigation.navigate("taskScreen", { projectId: item.id })
            }
          />
        )}
        contentContainerStyle={[spacing.mh2, spacing.mt1, { flex: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
        ListHeaderComponent={() => (
          <View
            style={[
              spacing.mv4,
              styles.row,
              spacing.mh1,
              { alignItems: "center" },
            ]}
          >
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />

            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
              onPress={() => setShowBottomSheet(!showBottomSheet)}
            >
              <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />
      {showBottomSheet && <Filter />}
    </ContainerComponent>
  );
}
