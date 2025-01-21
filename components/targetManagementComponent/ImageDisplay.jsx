import React, { useState, useEffect } from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import Button from "../buttons/Button";
import { P } from "../text";
import ImageViewing from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
import { spacing, styles, typography } from "../../styles";
import TabBar from "../TabBar";
import MyButton from "../buttons/MyButton";

const ImageDisplay = ({ images }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Survey");
  const [filteredImages, setFilteredImages] = useState(images);

  useEffect(() => {
    if (activeTab === "Survey") {
      setFilteredImages([images[0]]);
    } else if (activeTab === "Final Inspection") {
      setFilteredImages(images);
    }
  }, [activeTab, images]);

  const handleTabSelection = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const handleDownload = (uri) => {
    Linking.openURL(uri);
  };

  const handleNextImage = () => {
    if (selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const imageArray = Array.isArray(filteredImages)
    ? filteredImages.map((uri) => ({ uri }))
    : [];

  const tabs = [{ name: "Survey" }, { name: "Final Inspection" }];

  return (
    <View style={{ padding: 12, backgroundColor: "white" }}>
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabSelected={handleTabSelection}
        style={{ marginBottom: 10 }}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Array.isArray(filteredImages) &&
          filteredImages.map((uri, index) => {
            const extension = uri?.split(".").pop();

            if (extension === "pdf") {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    width: "30%",
                  }}
                >
                  <Button
                    style={[
                      styles.btn,
                      styles.bgPrimary,
                      { justifyContent: "center", width: "100%" },
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
                  style={[
                    spacing.mb3,
                    {
                      width: "22%",
                    },
                  ]}
                >
                  <Image
                    source={{ uri }}
                    style={{
                      width: "100%",
                      height: 80,
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: "black",
                    }}
                  />
                  <P>Lat:</P>
                  <P>Long:</P>
                </TouchableOpacity>
              );
            }
          })}
      </View>

      <ImageViewing
        images={imageArray}
        imageIndex={selectedImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={() => (
          <View>
            <View style={{ position: "absolute", top: 20, left: 20 }}>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="arrow-back-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {
                  position: "absolute",
                  top: 340,
                  left: 0,
                  right: 0,
                  justifyContent: "space-between",
                },
              ]}
            >
              <TouchableOpacity onPress={handlePreviousImage}>
                <Ionicons name="chevron-back-outline" size={48} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNextImage}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={48}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        FooterComponent={() => (
          <View
            style={[
              styles.row,
              spacing.p3,
              {
                justifyContent: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleDownload(imageArray[selectedImageIndex].uri)}
              style={[styles.row, { alignItems: "center" }]}
            >
              <Ionicons name="download-outline" size={24} color="white" />
              <P style={{ color: "white" }}>Download</P>
            </TouchableOpacity>
          </View>
        )}
      />

      {(activeTab === "Survey" || activeTab === "Final Inspection") && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton title={"Approve"} />
          <MyButton title={"Reject"} color="#DC4C64" />
        </View>
      )}
    </View>
  );
};

export default ImageDisplay;
