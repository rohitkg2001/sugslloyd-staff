import { View } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

// Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getConveyanceById } from "../redux/actions/projectAction";

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
} from "../styles";
import { P, Span } from "../components/text";

export default function ConveyanceManagementScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("This Week");
  const [currentIndex, setCurrentIndex] = useState(0);
  const my_id = 11;

  const dispatch = useDispatch();

  const { firstName } = useSelector((state) => state.staff);
  const conveyances = useSelector((state) => state.project.conveyances || []);

  useEffect(() => {
    dispatch(getConveyanceById(my_id));
  }, [dispatch]);

  const showNextTransport = () => {
    if (currentIndex < conveyances.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const filterData = () => {
    if (conveyances.length === 0) return [];
    return [conveyances[currentIndex]];
  };

  return (
    <ContainerComponent>
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

      <MyFlatList
        data={filterData()}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={`${item.from} - ${item.to}`}
            onPress={() =>
              navigation.navigate("conveyanceDetail", { travelItem: item })
            }
          >
            <View>
              <View
                style={[
                  styles.row,
                  spacing.mb2,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span style={[typography.font14, typography.fontLato]}>
                  Vehicle Type
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {String(item.vehicle_category || "Not provided")}
                </P>
              </View>

              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span style={[typography.font14, typography.fontLato]}>
                  Kilometer
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {item.kilometer ?? "N/A"}
                </P>
              </View>

              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span style={[typography.font14, typography.fontLato]}>
                  Time
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {item.time ?? "N/A"}
                </P>
              </View>

              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span style={[typography.font14, typography.fontLato]}>
                  Price
                </Span>
                <P
                  style={[
                    typography.font18,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  ₹{item.amount ?? "Not provided"}
                </P>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListHeaderComponent={() => (
          <View>
            <View
              style={[
                spacing.mv4,
                styles.row,
                spacing.mh1,
                { alignItems: "center" },
              ]}
            >
              <SearchBar
                placeholder="Search"
                style={{ width: SCREEN_WIDTH - 80 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>
            <TabBar
              tabs={[
                { name: "This Week" },
                { name: "This Month" },
                { name: "Approved" },
                { name: "Rejected" },
              ]}
              activeTab={activeTab}
              onTabSelected={setActiveTab}
            />
          </View>
        )}
      />

      {conveyances.length > 1 && (
        <Button style={styles.nextButton} onPress={showNextTransport}>
          <P style={{ color: LIGHT }}>Next</P>
        </Button>
      )}

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("conveyanceBillForm")}
      >
        <Icon name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
