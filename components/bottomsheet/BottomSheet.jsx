import { Animated, useAnimatedValue } from "react-native";
import { useEffect } from "react";
import { LIGHT, SCREEN_WIDTH, SECONDARY_COLOR } from "../../styles";

export default function BottomSheet({ children }) {
  const height = useAnimatedValue(0);
  useEffect(() => {
    Animated.timing(height, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [height]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        height: 400,
        opacity: height,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: LIGHT,
        borderColor: SECONDARY_COLOR,
        borderWidth: 0.5,
        width: SCREEN_WIDTH,
      }}
    >
      {children}
    </Animated.View>
  );
}
