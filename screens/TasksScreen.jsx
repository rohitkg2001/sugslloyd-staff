import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { tasksData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";
import { useNavigation } from "@react-navigation/native";

const TasksScreen = () => {
  const navigation = useNavigation();

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("fileUploadScreen")} 
    >
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1, marginLeft: 16 }}>
            <H6 style={[typography.textBold]}>{item.taskName}</H6>
            <P style={{ fontSize: 14, color: "#020409" }}>
              {item.installation}
            </P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ContainerComponent>
      <MyHeader title="Task List" hasIcon={true} icon={"ellipsis-vertical"} />
      <FlatList
        data={tasksData}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </ContainerComponent>
  );
};

export default TasksScreen;
