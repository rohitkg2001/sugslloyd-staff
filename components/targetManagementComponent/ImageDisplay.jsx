import React, { useState } from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import Button from "../buttons/Button";
import { P } from "../text";
import ImageViewing from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
import { styles, typography } from "../../styles";

const ImageDisplay = ({ images }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const handleDownload = (uri) => {
    Linking.openURL(uri);
  };

  const handleNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const imageArray = Array.isArray(images)
    ? images.map((uri) => ({ uri }))
    : [];

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
                    { justifyContent: "center", marginLeft: 20 },
                  ]}
                  onPress={() => Linking.openURL(uri)}
                >
                  <P
                    style={[
                      styles.btnText,
                      typography.font16,
                      typography.textLight,
                    ]}
                  >
                    View PDF
                  </P>
                </Button>
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
              >
                <Image
                  source={{ uri }}
                  style={{
                    width: 150,
                    height: 150,
                    marginLeft: 20,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 2,
                  }}
                />
                <P style={{ color: "Black", marginLeft: 20 }}>
                  Latitude: {(Math.random() * 180 - 90).toFixed(6)}
                </P>
                <P style={{ color: "Black", marginLeft: 20 }}>
                  Longitude: {(Math.random() * 360 - 180).toFixed(6)}
                </P>
              </TouchableOpacity>
            );
          }
        })}

      <ImageViewing
        images={imageArray}
        imageIndex={selectedImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={() => (
          <View
            style={{
              position: "absolute",
              top: 340,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handlePreviousImage}>
              <Ionicons name="chevron-back-outline" size={48} color="#76885B" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextImage}>
              <Ionicons
                name="chevron-forward-outline"
                size={48}
                color="#76885B"
              />
            </TouchableOpacity>
          </View>
        )}
        FooterComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableOpacity
              onPress={() => handleDownload(imageArray[selectedImageIndex].uri)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="download-outline" size={24} color="white" />
              <P style={{ color: "white", marginLeft: 5 }}>Download</P>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

export default ImageDisplay;
