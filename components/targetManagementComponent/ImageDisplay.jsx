import React, { useState, useEffect } from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import axios from "axios";
import { P } from "../text";
import ImageViewing from "react-native-image-viewing";
import Icon from "react-native-vector-icons/Ionicons";
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
      <View>
        <P
          style={[
            typography.font14,
            typography.textBold,
            typography.fontLato,
            { textAlign: "center", marginBottom: 10, color: "#333" },
          ]}
        >
          Proof of Work
        </P>

        <View
          style={[
            styles.row,
            spacing.bbw05,
            spacing.pb3,
            spacing.mb3,
            {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              padding: 10,
              borderRadius: 12,
            },
          ]}
        >
          {["Survey", "Final Inspection"].map((tab, index) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabSelection(tab)}
              style={[
                spacing.p2,
                spacing.ph4,
                spacing.br3,
                index !== 0 && { marginLeft: 16 },
                {
                  backgroundColor: activeTab === tab ? "#76885B" : "#E0E0E0",
                  elevation: 1,
                },
              ]}
            >
              <P
                style={[
                  typography.font14,
                  typography.textBold,
                  {
                    color: activeTab === tab ? "#fff" : "#555",
                    textAlign: "center",
                  },
                ]}
              >
                {tab}
              </P>
            </TouchableOpacity>
          ))}
        </View>
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
                  style={[
                    styles.row,
                    {
                      alignItems: "center",
                      marginBottom: 20,
                      width: "32%",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => Linking.openURL(uri)}
                    style={[
                      spacing.br2,
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "#ff6347",
                        width: 120,
                        height: 120,
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Image
                      source={{
                        uri: "https://img.icons8.com/ios-filled/50/ff6347/pdf.png",
                      }}
                      style={{ width: 50, height: 50, marginBottom: 5 }}
                    />
                    <P
                      style={[
                        typography.font14,
                        typography.fontLato,
                        {
                          textAlign: "center",
                          color: "#ff6347",
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      View PDF
                    </P>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(index)}
                  style={{
                    marginBottom: 16,
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri }}
                    style={{
                      width: "100%",
                      height: 117,
                      borderRadius: 10,
                      resizeMode: "cover",
                    }}
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
                <Icon name="arrow-back-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={[styles.row, { top: 340 }]}>
              <TouchableOpacity onPress={handlePreviousImage}>
                <Icon name="chevron-back-outline" size={48} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNextImage}>
                <Icon
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
              <Icon name="download-outline" size={24} color="white" />
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
