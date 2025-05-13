// import React from "react";
// import { useWindowDimensions } from "react-native";
// import { TabView } from "react-native-tab-view";

// export default function SwipeTab({
//   tabs,
//   renderScene,
//   index,
//   onIndexChange,
//   style,
// }) {
//   const layout = useWindowDimensions();

//   return (
//     <TabView
//       navigationState={{ index, routes: tabs }}
//       renderScene={renderScene}
//       onIndexChange={onIndexChange}
//       initialLayout={{ width: layout.width }}
//       swipeEnabled={true}
//       style={style}
//     />
//   );
// }

import { useWindowDimensions, Text, StyleSheet } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

export default function SwipeTab({
  tabs,
  renderScene,
  index,
  onIndexChange,
  style,
  tabLabelStyle,
  tabIndicatorStyle,
  tabStyle,
}) {
  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      style={[styles.tabBar, style]}
      indicatorStyle={[styles.indicator, tabIndicatorStyle]}
      tabStyle={[styles.tabStyle, tabStyle]}
      renderLabel={({ route, focused }) => (
        <Text
          style={[styles.label, focused && styles.labelFocused, tabLabelStyle]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{ width: layout.width }}
      swipeEnabled={true}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#F0FAF0",
    elevation: 4,
  },
  indicator: {
    backgroundColor: "#1E88E5",
    height: 3,
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  labelFocused: {
    color: "#1E88E5",
    fontWeight: "bold",
  },
  tabStyle: {
    paddingHorizontal: 12,
    // width: "auto",
  },
});
