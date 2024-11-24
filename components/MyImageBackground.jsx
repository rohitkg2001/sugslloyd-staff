import { Image, View } from "react-native";
import ContainerComponent from "./ContainerComponent";
import { layouts, spacing, styles } from "../styles";

export default function MyImageBackground({ children, imageSource }) {
  return (
    <ContainerComponent>
      <Image
        source={imageSource}
        style={[styles.imageContainerImg, spacing.mt5]}
        resizeMode="contain"
      />

      <View style={layouts.flex1}>{children}</View>
    </ContainerComponent>
  );
}
