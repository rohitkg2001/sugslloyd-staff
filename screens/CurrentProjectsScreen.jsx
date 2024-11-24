import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { project } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { ICON_MEDIUM, LIGHT, SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText] = useState("");

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
          ListEmptyComponent={() => (
            <NoRecord msg="Oops! There are no current projects available. Start creating or contact admin" />
          )}
          ListHeaderComponent={() => (
            <View style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}>
              <SearchBar style={{ width: SCREEN_WIDTH - 70 }} />
              <Button
                style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>
          )}
        />
      </View>
    </ContainerComponent>
  );
}
