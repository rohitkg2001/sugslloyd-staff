// import { FlatList, View, ActivityIndicator } from "react-native";
// import SearchBar from "../input/SearchBar";
// import {
//   spacing,
//   styles,
//   PRIMARY_COLOR,
//   SCREEN_WIDTH,
//   ICON_MEDIUM,
//   LIGHT,
// } from "../../styles";
// import Button from "../buttons/Button";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useState } from "react";
// import Filter from "../Filter";

// export default function MyFlatList({
//   data,
//   renderItem,
//   keyExtractor,
//   loading,
//   holidays,
//   ...props
// }) {
//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const applyFilterFromRedux = () => {};
//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//       ) : (
//         <>
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             initialNumToRender={50}
//             showsVerticalScrollIndicator={false}
//             ListHeaderComponent={() => (
//               <View
//                 style={[
//                   spacing.mv4,
//                   styles.row,
//                   spacing.mh1,
//                   { alignItems: "center" },
//                 ]}
//               >
//                 <SearchBar
//                   placeholder="Search"
//                   style={{ width: SCREEN_WIDTH - 80 }}
//                 />
//                 <Button
//                   style={[
//                     styles.btn,
//                     styles.bgPrimary,
//                     spacing.mh1,
//                     { width: 50 },
//                   ]}
//                   onPress={() => setShowBottomSheet(true)}
//                 >
//                   <Icon
//                     name="options-outline"
//                     size={ICON_MEDIUM}
//                     color={LIGHT}
//                   />
//                 </Button>
//               </View>
//             )}
//             {...props}
//           />
//         </>
//       )}
//       {showBottomSheet && (
//         <Filter
//           onClose={() => setShowBottomSheet(false)}
//           onApply={applyFilterFromRedux}
//         />
//       )}
//     </View>
//   );
// }

import { useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import SearchBar from "../input/SearchBar";
import {
  spacing,
  styles,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  LIGHT,
} from "../../styles";
import Button from "../buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";

import Filter from "../Filter";
import TabBar from "../TabBar";

export default function MyFlatList({
  data,
  renderItem,
  keyExtractor,
  loading,
  holidays,
  ...props
}) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const applyFilterFromRedux = () => {};

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={50}
            showsVerticalScrollIndicator={false}
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
                    onPress={() => setShowBottomSheet(true)}
                  >
                    <Icon
                      name="options-outline"
                      size={ICON_MEDIUM}
                      color={LIGHT}
                    />
                  </Button>
                </View>
                {/* <TabBar
                  tabs={[
                    "Unassigned",
                    "Assigned",
                    "Pending",
                    "Done",
                    "View All",
                  ]}
                  initialActiveTab="Unassigned"
                /> */}
              </View>
            )}
            {...props}
          />
        </>
      )}
      {showBottomSheet && (
        <Filter
          onClose={() => setShowBottomSheet(false)}
          onApply={applyFilterFromRedux}
        />
      )}
    </View>
  );
}
