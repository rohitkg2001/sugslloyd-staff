import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { earnings } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";

const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredEarnings, setFilteredEarnings] = useState(earnings);

 
  const filterEarnings = (text) => {
    setSearchText(text);
    const filtered = earnings.filter((earning) =>
      earning.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEarnings(filtered);
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Total Earnings"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 8,
          }}
        >
          <View style={{ width: "80%" }}>
            <SearchBar
              placeholder="Search"
              value={searchText}
              onChangeText={filterEarnings} 
            />
          </View>
        </View>

        <MyFlatList
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
     
      </View>
    </ContainerComponent>
  );
};

export default TotalEarningScreen;
