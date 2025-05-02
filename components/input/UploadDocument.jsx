import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR, spacing, styles, SCREEN_WIDTH } from "../../styles";
import { P } from "../text";

function UploadDocument({ file, setFile }) {
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <View
      onPress={pickDocument}
      style={{
        width: SCREEN_WIDTH - 20,
        height: SCREEN_WIDTH - 200,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 30,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <TouchableOpacity onPress={pickDocument} style={{ alignItems: "center" }}>
        <Ionicons name="document-text-outline" size={40} color="black" />
        <Text>Upload Document</Text>
      </TouchableOpacity>
      {file && (
        <View style={[styles.filePreview, spacing.mt2]}>
          <Text>{file.name}</Text>
          <TouchableOpacity onPress={removeFile}>
            <Text style={{ color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      {fileUploadProgress > 0 && fileUploadProgress < 100 && (
        <View style={[styles.progressBar, spacing.mv2]}>
          <View
            style={{
              width: `${fileUploadProgress}%`,
              backgroundColor: PRIMARY_COLOR,
              height: 5,
            }}
          />
        </View>
      )}
      <P
        style={{
          position: "absolute",
          bottom: 165,
          left: 10,
          fontWeight: "bold",
        }}
      >
        Attachments
      </P>
    </View>
  );
}

export default UploadDocument;
