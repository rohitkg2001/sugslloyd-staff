import React, { useRef } from "react";
import { View, Image } from "react-native";
import { CameraView } from "expo-camera";
import { layouts, styles, spacing } from "../styles";

export default function CameraComponent({ photoUri, cameraRef }) {



  return (
    <View
      style={[
        styles.cameraContainer,
        spacing.mv5,
        layouts.center,
      ]}
    >
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={layouts.circle75} />
      ) : (
        <CameraView style={layouts.circle75} ref={cameraRef} facing="back" />
      )}
    </View>
  );
}
