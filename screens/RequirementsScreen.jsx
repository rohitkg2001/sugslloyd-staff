import React from "react";
import { View, FlatList } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { requirementsData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";

const RequirementsScreen = () => {
  const renderListItem = ({ item }) => (
    <Card
      style={[
        spacing.mv1,
        { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <H6 style={[typography.textBold]}>{item.siteName}</H6>
          <P style={{ fontSize: 14, color: "#020409" }}>Dist: {item.dist}</P>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Location: {item.location}
          </P>
        </View>
        <IconButton
          icon="triangle-outline"
          size={20}
          color="#020409"
          style={{
            marginRight: 0,
          }}
        />
      </View>
    </Card>
  );

  return (
    <ContainerComponent>
      <MyHeader title="Total Sites" hasIcon={true} icon={"ellipsis-vertical"} />
      <FlatList
        data={requirementsData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ContainerComponent>
  );
};

export default RequirementsScreen;
