import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { earnings } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { spacing, styles } from "../styles";
import { useTranslation } from "react-i18next";

export default function TotalEarningScreen() {
  const [filteredEarnings, setFilteredEarnings] = useState(earnings);
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("total_earnings")} isBack={true} hasIcon={true} />
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
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! There are no sites data available. Start creating or contact admin" />
        )}
        ListHeaderComponent={() => <SearchBar placeholder="Search..." />}
      />
    </ContainerComponent>
  );
}
