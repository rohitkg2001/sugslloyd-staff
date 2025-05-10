import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";

export default function SwipeTab({
  tabs,
  renderScene,
  index,
  onIndexChange,
  style,
}) {
  const layout = useWindowDimensions();

  return (
    <TabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{ width: layout.width }}
      swipeEnabled={true}
      style={style}
    />
  );
}


