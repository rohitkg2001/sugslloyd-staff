import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { projecttask } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText] = useState("");

  const filteredProjects = projecttask.filter((item) =>
    item.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ContainerComponent>
      <View>
        <MyHeader title="Current Projects" isBack={true} hasIcon={true} />

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
            <SearchBar placeholder="Search current projects..." />
          )}
        />
      </View>
    </ContainerComponent>
  );
}
