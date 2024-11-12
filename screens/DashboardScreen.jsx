import { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H2, H3, H4, H5, P } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";

import {
  layouts,
  LIGHT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { staff, tasks } from "../utils/faker"; 

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));

  const navigateToTaskList = () => {
    navigation.navigate("taskList");
  };

  const navigateToTaskCardScreen = () => {
    navigation.navigate("TaskCardScreen");
  };

  const navigateToToDoTaskCardScreen = () => {
    navigation.navigate("ToDoTaskCardScreen");
  };

  const navigateToNoRecord = () => {
    navigation.navigate("NoRecord");
  };

  const navigateToTotalProjectsScreen = () => {
    navigation.navigate("TotalProjectsScreen");
  };
  const navigateToTotalEarningScreen = () => {
    navigation.navigate("TotalEarningScreen");
  };
  const navigateToTotalSitesScreen = () => {
    navigation.navigate("TotalSitesScreen");
  };
  const navigateToInventoryScreen = () => {
    navigation.navigate("InventoryScreen");
  };
  const navigateToCompletedSitesScreen = () => {
    navigation.navigate("completedSitesScreen");
  };
  const navigateToProgressSitesScreen = () => {
    navigation.navigate("progressSitesScreen");
  };
  const navigateToPendingSitesScreen = () => {
    navigation.navigate("pendingSitesScreen");
  };
  const navigateToTotalVendorsScreen = () => {
    navigation.navigate("totalVendorsScreen");
  };
  const navigateToinactiveVendorsScreen = () => {
    navigation.navigate("inactiveVendorsScreen");
  };
  const navigateToactiveVendorsScreen = () => {
    navigation.navigate("activeVendorsScreen");
  };
  const navigateToBlockListedVendorsScreen = () => {
    navigation.navigate("blockListedVendorScreen");
  };

  const firstTwoTasks = tasks.slice(0, 2);
  const firstFourTasks = tasks.slice(2, 6);
  const secondFourTasks = tasks.slice(6, 10);

  return (
    <ContainerComponent>
      <View
        style={[
          styles.row,
          spacing.mh2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H3 style={typography.textBold}>Good Morning, {staff.first_name}</H3>
          <P style={spacing.ml1}>{today}</P>
        </View>
        <Image
          source={{ uri: staff.image }}
          style={[layouts.circle12, spacing.mv3, layouts.center]}
        />
      </View>
      {/* Welcome message */}
      <ScrollView>
        <View>
          <MyFlatList
            data={firstTwoTasks}
            renderItem={({ item }) => {
              const handlePress = () => {
                if (item.id === 1) {
                  navigateToTotalProjectsScreen();
                } else if (item.id === 2) {
                  navigateToTotalEarningScreen();
                }
              };
              return (
                <StatCard
                  key={item.id}
                  backgroundColor={item.backgroundColor}
                  tasks={item.count}
                  status={item.status}
                  onPress={handlePress}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </View>

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        >
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                Project Overview
              </H5>
            </View>
            <View style={[spacing.bbw05, spacing.mv1]} />
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Open</P>
                <P>0</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Completed</P>
                <P>0</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Hold</P>
                <P>0</P>
              </TouchableOpacity>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={firstFourTasks}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;

            const handlePress = () => {
              if (item.id === 1) {
                navigateToTotalProjectsScreen();
              } else if (item.status === "Total Sites") {
                navigateToTotalSitesScreen();
              } else if (item.status === "Pending Sites") {
                navigateToPendingSitesScreen();
              } else if (item.status === "Completed Sites") {
                navigateToCompletedSitesScreen();
              } else if (item.status === "Sites in Progress") {
                navigateToProgressSitesScreen();
              } else if (item.status === "Pending Sites") {
                navigateToPendingSitesScreen;
              }
            };

            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.status}
                onPress={handlePress}
                style={{
                  marginTop: marginTop,
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        >
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="filter" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                All Task Overview
              </H5>
            </View>
            <View style={[spacing.bbw05, spacing.mv1]} />
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={navigateToToDoTaskCardScreen}>
                  <P style={typography.textBold}>To Do</P>
                  <P style={spacing.ml2}>2</P>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginRight: 140 }}>
                <TouchableOpacity onPress={navigateToTaskCardScreen}>
                  <P style={typography.textBold}>Done</P>
                  <P style={spacing.ml2}>3</P>
                </TouchableOpacity>
              </View>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={secondFourTasks}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;

            const handlePress = () => {
              if (item.id === 1) {
                navigateToTotalProjectsScreen();
              } else if (item.status === "Total Vendors") {
                navigateToTotalVendorsScreen();
              } else if (item.status === "Inactive Vendors") {
                navigateToinactiveVendorsScreen();
              } else if (item.status === "Active Vendors") {
                navigateToactiveVendorsScreen();
              } else if (item.status === "Blocklisted Vendor") {
                navigateToBlockListedVendorsScreen();
              }
            };

            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.status}
                onPress={handlePress}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </ScrollView>
    </ContainerComponent>
  );
}
