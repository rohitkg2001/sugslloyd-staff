import React from "react";
import { View, Image, Text, Linking } from "react-native";
import Button from "../buttons/Button";
import { styles, typography } from "../../styles";

const ImageDisplay = ({ images }) => {
  return (
    <>
      {Array.isArray(images) &&
        images.map((item, index) => {
          const uri = item;
          const extension = uri.split(".").pop();

          if (extension === "pdf") {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Button
                  style={[
                    styles.btn,
                    styles.bgPrimary,
                    { justifyContent: "center" },
                  ]}
                  onPress={() => Linking.openURL(uri)}
                >
                  <Text
                    style={[
                      styles.btnText,
                      typography.font16,
                      typography.textLight,
                    ]}
                  >
                    View PDF
                  </Text>
                </Button>
              </View>
            );
          } else {
            return (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: 100, height: 100 }}
              />
            );
          }
        })}
    </>
  );
};

export default ImageDisplay;
