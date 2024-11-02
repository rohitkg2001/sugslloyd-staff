import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { earnings } from "../utils/faker"; // Your earnings data
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";

const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const filteredEarnings = earnings.filter((earning) =>
    earning.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort", onPress: () => console.log("Sort clicked") },
    { label: "Filter", onPress: () => console.log("Filter clicked") },
  ];

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Total Earnings"
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />

        <SearchBar
          placeholder="Search projects..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <FlatList
          data={filteredEarnings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{`Earnings: $${item.totalEarnings.toFixed(2)}`}</P>
                <P>{`Completion Date: ${item.completionDate}`}</P>
              </View>
            </TouchableOpacity>
          )}
        />

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

export default TotalEarningScreen;
