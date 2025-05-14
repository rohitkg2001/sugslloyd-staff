import { View, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConveyanceById } from "../redux/actions/projectAction";

// Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import SearchBar from "../components/input/SearchBar";
import SwipeTab from "../components/tab/SwipeTab";

// Styles
import {
  ICON_LARGE,
  ICON_MEDIUM,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
  typography,
  PRIMARY_COLOR_TRANSPARENT,
} from "../styles";
import { P, Span } from "../components/text";

export default function ConveyanceManagementScreen({ navigation }) {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "thisWeek", title: "This Week" },
    { key: "thisMonth", title: "This Month" },
    { key: "approved", title: "Approved" },
    { key: "rejected", title: "Rejected" },
  ];

  const { firstName, id: userId } = useSelector((state) => state.staff);
  const conveyances = useSelector((state) => state.project.conveyances || []);

  useEffect(() => {
    if (userId) {
      dispatch(getConveyanceById(userId));
    }
  }, [dispatch, userId]);

  const renderConveyances = (data) => (
    <MyFlatList
      data={data}
      renderItem={({ item, index }) => (
        <ClickableCard1
          key={index}
          item={item}
          title={`${item.from} - ${item.to}`}
          onPress={() =>
            navigation.navigate("conveyanceDetail", { travelItem: item })
          }
          cardStyle={{
            backgroundColor: "#F0F0F0",
            height: 135,
          }}
        >
          <View style={[styles.row, { bottom: 30 }]}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <P style={[typography.font12, typography.fontLato]}>
                Vehicle Type
              </P>
              <P style={[typography.font12]}>
                {String(item.vehicle_category || "Not provided")}
              </P>
            </View>

            <View style={{ flex: 1, marginHorizontal: 6 }}>
              <P style={[typography.font12, typography.fontLato]}>Kilometer</P>
              <P style={[typography.font12]}>{item.kilometer ?? "N/A"}</P>
            </View>

            <View style={{ flex: 1, marginLeft: 6 }}>
              <P style={[typography.font12, typography.fontLato]}>Time</P>
              <P style={[typography.font12]}>{item.time ?? "N/A"}</P>
            </View>
          </View>

          <View
            style={[
              styles.row,
              spacing.pv1,
              spacing.ph2,
              spacing.br1,
              {
                backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                bottom: 16,
              },
            ]}
          >
            <Span
              style={[
                typography.font14,
                typography.fontLato,
                { color: PRIMARY_COLOR },
              ]}
            >
              Price
            </Span>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
                { color: "#1B5E20" }, // darker green for value
              ]}
            >
              {item.amount != null
                ? `₹${parseFloat(item.amount).toFixed(2)}`
                : "Not provided"}
            </P>
          </View>
        </ClickableCard1>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={[spacing.mh1, spacing.mt1]}
      showSearchBar={false}
    />
  );

  const renderScene = () => renderConveyances(conveyances);

  return (
    <ContainerComponent style={{ flex: 1 }}>
      <DashboardHeader
        greeting="Good morning"
        firstName={firstName}
        message="You fall under M3 category"
        style={[
          spacing.p2,
          {
            width: SCREEN_WIDTH,
            backgroundColor: PRIMARY_COLOR,
            height: 70,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            margin: 0,
          },
        ]}
        textStyle={{ color: LIGHT }}
        useEllipsis
      />
      <View
        style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}
      >
        <SearchBar placeholder="Search" style={{ width: SCREEN_WIDTH - 80 }} />
        <Button
          style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
        >
          <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <SwipeTab
          tabs={routes}
          index={index}
          onIndexChange={setIndex}
          renderScene={renderScene}
          swipeEnabled={true}
          style={{ backgroundColor: "#76885B" }} // TabBar background
          tabLabelStyle={{ fontSize: 16, color: "#020409" }}
          tabIndicatorStyle={{ backgroundColor: "#020409" }}
          // tabStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      {/* Add Button */}
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("conveyanceBillForm")}
      >
        <Icon name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
