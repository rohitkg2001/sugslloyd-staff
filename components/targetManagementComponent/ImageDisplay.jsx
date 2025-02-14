import React, { useState, useEffect } from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import axios from "axios";
import Button from "../buttons/Button";
import { P } from "../text";
import ImageViewing from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../buttons/MyButton";
import { spacing, styles, typography } from "../../styles";

const ImageDisplay = ({ images, id }) => {
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

  const handleApprove = async () => {
    try {
      //const taskId = id;
      console.log(id);
      const response = await axios.post(
        `https://slldm.com/api/tasks/${id}/approve`
      );
      //console.log("Approval successful:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error approving the task:", error);
    }
  };

  const imageArray = Array.isArray(filteredImages)
    ? filteredImages.map((uri) => ({ uri }))
    : [];

  return (
    <View style={[spacing.p3, { backgroundColor: "white" }]}>
      <View
        style={[
          styles.row,
          spacing.bbw05,
          spacing.pb3,
          spacing.mb3,
          { justifyContent: "Flex-start", alignItems: "center" },
        ]}
      >
        {["Survey", "Final Inspection"].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabSelection(tab)}
            style={[
              spacing.p1,
              index !== 0 && { marginLeft: 16 },
              {
                borderBottomWidth: activeTab === tab ? 2 : 0,
                borderBottomColor:
                  activeTab === tab ? "#76885B" : "transparent",
              },
            ]}
          >
            <P
              style={[
                typography.font16,
                {
                  color: activeTab === tab ? "#76885B" : "#333",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                },
              ]}
            >
              {tab}
            </P>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          styles.row,
          {
            flexWrap: "wrap",
          },
        ]}
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
                  style={{
                    marginBottom: 16,
                    width: "22%",
                  }}
                >
                  <Image
                    source={{ uri }}
                    style={[
                      {
                        width: "100%",
                        height: 80,
                      },
                    ]}
                  />
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
            <View style={[styles.row, { top: 340 }]}>
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
              style={[
                styles.row,
                {
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons name="download-outline" size={24} color="white" />
              <P style={{ color: "white", marginLeft: 8 }}>Download</P>
            </TouchableOpacity>
          </View>
        )}
      />

      {(activeTab === "Survey" || activeTab === "Final Inspection") && (
        <View style={[styles.row, {}]}>
          <MyButton title={"Approve"} onPress={handleApprove} />
          <MyButton title={"Reject"} color="#DC4C64" />
        </View>
      )}
    </View>
  );
};

export default ImageDisplay;
