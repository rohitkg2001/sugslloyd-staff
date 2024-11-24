import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import { greet } from "../redux/actions/staffActions";
import MyFlatList from "../components/utility/MyFlatList";
import { H4, H5, P, Span } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";
import { useSelector } from "react-redux";
import { ICON_SMALL, ICON_MEDIUM, ICON_LARGE } from "../styles/constant";

import {
  layouts,
  LIGHT,
  DARK,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import {
  siteCardsForDashboard,
  vendorCardForDashboard,
  tasks,
} from "../utils/faker";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";

export default function DashboardScreen({ navigation }) {
  const today = useState(moment().format("DD MMM YYYY"));
  const [dueTasks, setDueTasks] = useState(4);
  const [greeting, setGreeting] = useState("Good morning");
  const { first_name } = useSelector((state) => state);

  useEffect(() => {
    setGreeting(greet());
  }, []);

  const navigateToTaskCardScreen = () => {
    navigation.navigate("TaskCardScreen");
  };

  const navigateToToDoTaskCardScreen = () => {
    navigation.navigate("ToDoTaskCardScreen");
  };

  const navigateToNoRecord = () => {
    navigation.navigate("NoRecord");
  };

  const firstTwoTasks = tasks.slice(0, 2);
  const secondFourTasks = tasks.slice(2, 6);

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
          <H4 style={typography.textBold}>
            {greeting}, {first_name}
          </H4>
          <P style={spacing.ml1}>You have {dueTasks} due Today</P>
        </View>
        <TouchableOpacity
          style={[
            layouts.circle12,
            layouts.center,
            spacing.bw05,
            spacing.br5,
            { position: "relative" },
          ]}
        >
          <Icon name="notifications-outline" size={ICON_MEDIUM} color={DARK} />
          <View
            style={[
              styles.bgDanger,
              layouts.center,
              {
                position: "absolute",
                top: 0,
                right: 0,
                height: 24,
                width: 24,
                borderRadius: 12,
              },
            ]}
          >
            <Span
              style={[
                typography.textLight,
                typography.font16,
                { textAlign: "center" },
              ]}
            >
              6
            </Span>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        <View >
          <SearchBar
            placeholder="Search"
            style={{ width: SCREEN_WIDTH - 70 }}
          />
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
          >
            <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
          </Button>
          </View>
          <View style={[spacing.mv2, styles.row, { alignItems: "center" }]}>
            <H4>Today</H4>
            <View style={{ flexDirection: "row" }}>
              <Icon name="calendar-outline" size={ICON_SMALL} color={DARK} />
              <H5 style={spacing.ml1}>{today}</H5>
            </View>
          </View>
 

        <MyFlatList
          data={firstTwoTasks}
          renderItem={({ item }) => (
            <StatCard
              key={item.id}
              backgroundColor={item.backgroundColor}
              tasks={item.count}
              status={item.status}
              onPress={() => navigation.navigate(item.page)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View>
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon
                name="calendar-clear"
                size={ICON_LARGE}
                color={PRIMARY_COLOR}
              />
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
                <P>20</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Completed</P>
                <P>7</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Hold</P>
                <P>1</P>
              </TouchableOpacity>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={siteCardsForDashboard}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;

            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.title}
                onPress={() =>
                  navigation.navigate(item.page, {
                    pageTitle: item.title,
                    data: item.data,
                  })
                }
                style={{
                  marginTop: marginTop,
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View>
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="filter" size={ICON_LARGE} color={PRIMARY_COLOR} />
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
          data={vendorCardForDashboard}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.title}
                onPress={() =>
                  navigation.navigate(item.page, {
                    pageTitle: item.title,
                    data: item.data,
                  })
                }
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
