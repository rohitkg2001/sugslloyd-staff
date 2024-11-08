import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { earnings } from "../utils/faker";
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
  const [filteredEarnings, setFilteredEarnings] = useState(earnings);

  // Filter earnings based on the search text
  const filterEarnings = (text) => {
    setSearchText(text);
    const filtered = earnings.filter((earning) =>
      earning.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEarnings(filtered);
  };

  // Sorting function
  const sortEarnings = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`); // Debugging
    let sortedEarnings = [...filteredEarnings];
    if (sortOrder === "lowToHigh") {
      sortedEarnings.sort((a, b) => a.totalEarnings - b.totalEarnings);
    } else if (sortOrder === "highToLow") {
      sortedEarnings.sort((a, b) => b.totalEarnings - a.totalEarnings);
    }
    setFilteredEarnings(sortedEarnings);
  };

  const toggleMenu = () => {
    console.log("Toggling menu visibility"); // Debugging
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort by Price (Low to High)",
      onPress: () => {
        sortEarnings("lowToHigh");
        toggleMenu();
      },
    },
    {
      label: "Sort by Price (High to Low)",
      onPress: () => {
        sortEarnings("highToLow");
        toggleMenu();
      },
    },
  ];

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Total Earnings"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <View style={{ width: "80%" }}>
            <SearchBar
              placeholder="Search"
              value={searchText}
              onChangeText={filterEarnings} // Update earnings based on search text
            />
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              console.log("Filter Pressed");
              toggleMenu(); // Open the filter menu when pressed
            }}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              console.log("Sort Pressed");
              toggleMenu(); // Open the filter menu when pressed
            }}
          >
            <Ionicons name="swap-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredEarnings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{`Earnings: ₹ ${item.totalEarnings.toFixed(2)}`}</P>
                <P>{`Completion Date: ${item.completionDate}`}</P>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Filter Modal */}
        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions} // Pass the menu options for sort functionality
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log("Add Pressed")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

export default TotalEarningScreen;
