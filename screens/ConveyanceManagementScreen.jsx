// import { View } from "react-native";
// import { useState, useEffect } from "react";
// import Icon from "react-native-vector-icons/Ionicons";

// // Components
// import ContainerComponent from "../components/ContainerComponent";
// import ClickableCard1 from "../components/card/ClickableCard1";
// import MyFlatList from "../components/utility/MyFlatList";
// import Button from "../components/buttons/Button";
// import DashboardHeader from "../components/header/DashboardHeader";
// import TabBar from "../components/TabBar";
// import SearchBar from "../components/input/SearchBar";

// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { getConveyanceById } from "../redux/actions/projectAction";

// // Styles
// import {
//   ICON_LARGE,
//   ICON_MEDIUM,
//   LIGHT,
//   spacing,
//   styles,
//   SCREEN_WIDTH,
//   PRIMARY_COLOR,
//   typography,
// } from "../styles";
// import { P, Span } from "../components/text";

// export default function ConveyanceManagementScreen({ navigation }) {
//   const [activeTab, setActiveTab] = useState("This Week");

//   const dispatch = useDispatch();

//   const { firstName, id: userId } = useSelector((state) => state.staff);
//   const conveyances = useSelector((state) => state.project.conveyances || []);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getConveyanceById(userId));
//     }
//   }, [dispatch, userId]);

//   return (
//     <ContainerComponent>
//       <DashboardHeader
//         greeting="Good morning"
//         firstName={firstName}
//         message="You fall under M3 category"
//         style={[
//           spacing.p2,
//           {
//             width: SCREEN_WIDTH,
//             backgroundColor: PRIMARY_COLOR,
//             height: 70,
//             borderBottomLeftRadius: 12,
//             borderBottomRightRadius: 12,
//             margin: 0,
//           },
//         ]}
//         textStyle={{ color: LIGHT }}
//         useEllipsis
//       />

//       <MyFlatList
//         data={conveyances}
//         renderItem={({ item, index }) => (
//           <ClickableCard1
//             key={index}
//             item={item}
//             title={`${item.from} - ${item.to}`}
//             onPress={() =>
//               navigation.navigate("conveyanceDetail", { travelItem: item })
//             }
//             cardStyle={{
//               backgroundColor: "#F0F0F0",
//               height: 135,
//             }}
//           >
//             <View
//               style={[
//                 styles.row,
//                 {
//                   bottom: 30,
//                 },
//               ]}
//             >
//               {/* Vehicle Type */}
//               <View style={{ flex: 1, marginRight: 6 }}>
//                 <P style={[typography.font12, typography.fontLato]}>
//                   Vehicle Type
//                 </P>
//                 <P style={[typography.font12]}>
//                   {String(item.vehicle_category || "Not provided")}
//                 </P>
//               </View>

//               {/* Kilometer */}
//               <View style={{ flex: 1, marginHorizontal: 6 }}>
//                 <P style={[typography.font12, typography.fontLato]}>
//                   Kilometer
//                 </P>
//                 <P style={[typography.font12]}>{item.kilometer ?? "N/A"}</P>
//               </View>

//               {/* Time */}
//               <View style={{ flex: 1, marginLeft: 6 }}>
//                 <P style={[typography.font12, typography.fontLato]}>Time</P>
//                 <P style={[typography.font12]}>{item.time ?? "N/A"}</P>
//               </View>
//             </View>
//             <View
//               style={[
//                 styles.row,
//                 {
//                   bottom: 20,
//                 },
//               ]}
//             >
//               <Span style={[typography.font14, typography.fontLato]}>
//                 Price
//               </Span>
//               <P
//                 style={[
//                   typography.font14,
//                   typography.fontLato,
//                   typography.textBold,
//                 ]}
//               >
//                 {item.amount != null
//                   ? `₹${parseFloat(item.amount).toFixed(2)}`
//                   : "Not provided"}
//               </P>
//             </View>
//           </ClickableCard1>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={[spacing.mh1, spacing.mt1]}
//         ListHeaderComponent={() => (
//           <View>
//             <View
//               style={[
//                 spacing.mv4,
//                 styles.row,
//                 spacing.mh1,
//                 { alignItems: "center" },
//               ]}
//             >
//               <SearchBar
//                 placeholder="Search"
//                 style={{ width: SCREEN_WIDTH - 80 }}
//               />
//               <Button
//                 style={[
//                   styles.btn,
//                   styles.bgPrimary,
//                   spacing.mh1,
//                   { width: 50 },
//                 ]}
//               >
//                 <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
//               </Button>
//             </View>
//             {/* <TabBar
//               tabs={[
//                 { name: "This Week" },
//                 { name: "This Month" },
//                 { name: "Approved" },
//                 { name: "Rejected" },
//               ]}
//               activeTab={activeTab}
//               onTabSelected={setActiveTab}
//             /> */}
//           </View>
//         )}
//       />

//       <Button
//         style={styles.addButton}
//         onPress={() => navigation.navigate("conveyanceBillForm")}
//       >
//         <Icon name="add" size={ICON_LARGE} color="white" />
//       </Button>
//     </ContainerComponent>
//   );
// }

// import { View, useWindowDimensions, Text } from "react-native";
// import { useState, useEffect } from "react";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { getConveyanceById } from "../redux/actions/projectAction";

// // Components
// import ContainerComponent from "../components/ContainerComponent";
// import ClickableCard1 from "../components/card/ClickableCard1";
// import MyFlatList from "../components/utility/MyFlatList";
// import Button from "../components/buttons/Button";
// import DashboardHeader from "../components/header/DashboardHeader";
// import SearchBar from "../components/input/SearchBar";
// import SwipeTab from "../components/tab/SwipeTab";

// // Styles
// import {
//   ICON_LARGE,
//   ICON_MEDIUM,
//   LIGHT,
//   spacing,
//   styles,
//   SCREEN_WIDTH,
//   PRIMARY_COLOR,
//   typography,
// } from "../styles";
// import { P, Span } from "../components/text";

// export default function ConveyanceManagementScreen({ navigation }) {
//   const layout = useWindowDimensions();
//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const routes = [
//     { key: "thisWeek", title: "This Week" },
//     { key: "thisMonth", title: "This Month" },
//     { key: "approved", title: "Approved" },
//     { key: "rejected", title: "Rejected" },
//   ];

//   const { firstName, id: userId } = useSelector((state) => state.staff);
//   const conveyances = useSelector((state) => state.project.conveyances || []);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getConveyanceById(userId));
//     }
//   }, [dispatch, userId]);

//   const renderConveyances = (data) => (
//     <MyFlatList
//       data={data}
//       renderItem={({ item, index }) => (
//         <ClickableCard1
//           key={index}
//           item={item}
//           title={`${item.from} - ${item.to}`}
//           onPress={() =>
//             navigation.navigate("conveyanceDetail", { travelItem: item })
//           }
//           cardStyle={{
//             backgroundColor: "#F0F0F0",
//             height: 135,
//           }}
//         >
//           <View style={[styles.row, { bottom: 30 }]}>
//             <View style={{ flex: 1, marginRight: 6 }}>
//               <P style={[typography.font12, typography.fontLato]}>
//                 Vehicle Type
//               </P>
//               <P style={[typography.font12]}>
//                 {String(item.vehicle_category || "Not provided")}
//               </P>
//             </View>

//             <View style={{ flex: 1, marginHorizontal: 6 }}>
//               <P style={[typography.font12, typography.fontLato]}>Kilometer</P>
//               <P style={[typography.font12]}>{item.kilometer ?? "N/A"}</P>
//             </View>

//             <View style={{ flex: 1, marginLeft: 6 }}>
//               <P style={[typography.font12, typography.fontLato]}>Time</P>
//               <P style={[typography.font12]}>{item.time ?? "N/A"}</P>
//             </View>
//           </View>

//           <View style={[styles.row, { bottom: 20 }]}>
//             <Span style={[typography.font14, typography.fontLato]}>Price</Span>
//             <P
//               style={[
//                 typography.font14,
//                 typography.fontLato,
//                 typography.textBold,
//               ]}
//             >
//               {item.amount != null
//                 ? `₹${parseFloat(item.amount).toFixed(2)}`
//                 : "Not provided"}
//             </P>
//           </View>
//         </ClickableCard1>
//       )}
//       keyExtractor={(item, index) => index.toString()}
//       contentContainerStyle={[spacing.mh1, spacing.mt1]}
//     />
//   );

//   // ✅ No filtering: same data for all tabs
//   const renderScene = () => renderConveyances(conveyances);

//   return (
//     <ContainerComponent style={{ flex: 1 }}>
//       <DashboardHeader
//         greeting="Good morning"
//         firstName={firstName}
//         message="You fall under M3 category"
//         style={[
//           spacing.p2,
//           {
//             width: SCREEN_WIDTH,
//             backgroundColor: PRIMARY_COLOR,
//             height: 70,
//             borderBottomLeftRadius: 12,
//             borderBottomRightRadius: 12,
//             margin: 0,
//           },
//         ]}
//         textStyle={{ color: LIGHT }}
//         useEllipsis
//       />

// {/* <View
//   style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}
// >
//   <SearchBar placeholder="Search" style={{ width: SCREEN_WIDTH - 80 }} />
//   <Button
//     style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
//   >
//     <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
//   </Button>
// </View> */}

//       <View style={{ flex: 1 }}>
//         <SwipeTab
//           tabs={routes}
//           index={index}
//           onIndexChange={setIndex}
//           renderScene={renderScene}
//           swipeEnabled={true}
//         />
//       </View>

//       <Button
//         style={styles.addButton}
//         onPress={() => navigation.navigate("conveyanceBillForm")}
//       >
//         <Icon name="add" size={ICON_LARGE} color="white" />
//       </Button>
//     </ContainerComponent>
//   );
// }

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
          // showSearchBar={false} // Don't show search bar here
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

          <View style={[styles.row, { bottom: 20 }]}>
            <Span style={[typography.font14, typography.fontLato]}>Price</Span>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
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

      {/* Tabs */}
      {/* <View style={{ flex: 1, marginRight: 10 }}>
        <SwipeTab
          tabs={routes}
          index={index}
          onIndexChange={setIndex}
          renderScene={renderScene}
          swipeEnabled={true}
        />
      </View> */}

      <View style={{ flex: 1 }}>
        <SwipeTab
          tabs={routes}
          index={index}
          onIndexChange={setIndex}
          renderScene={renderScene}
          swipeEnabled={true}
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
