// import React from "react";
// import { View, Image, Linking } from "react-native";
// import Button from "../buttons/Button";
// import { styles, typography } from "../../styles";
// import { P } from "../text";

// const ImageDisplay = ({ images }) => {
//   return (
//     <>
//       {Array.isArray(images) &&
//         images.map((item, index) => {
//           const uri = item;
//           const extension = uri.split(".").pop();

//           if (extension === "pdf") {
//             return (
//               <View
//                 key={index}
//                 style={{ flexDirection: "row", alignItems: "center" }}
//               >
//                 <Button
//                   style={[
//                     styles.btn,
//                     styles.bgPrimary,
//                     { justifyContent: "center" },
//                   ]}
//                   onPress={() => Linking.openURL(uri)}
//                 >
//                   <P
//                     style={[
//                       styles.btnText,
//                       typography.font16,
//                       typography.textLight,
//                     ]}
//                   >
//                     View PDF
//                   </P>
//                 </Button>
//               </View>
//             );
//           } else {
//             return (
//               <Image
//                 key={index}
//                 source={{ uri }}
//                 style={{ width: 130, height: 130, marginLeft: 10 }}
//               />
//             );
//           }
//         })}
//     </>
//   );
// };

// export default ImageDisplay;

import React, { useState } from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import Button from "../buttons/Button";
import { styles, typography } from "../../styles";
import { P } from "../text";
import ImageViewing from "react-native-image-viewing";

const ImageDisplay = ({ images }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
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
                    { justifyContent: "center" },
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
                  style={{ width: 130, height: 130, marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          }
        })}

      <ImageViewing
        images={imageArray}
        imageIndex={selectedImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default ImageDisplay;
