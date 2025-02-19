// import All react Native
import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import * as DocumentPicker from "expo-document-picker";

// import Components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import MyPickerInput from "../components/input/MyPickerInput";

// import Styles
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H2, H6, Span } from "../components/text";
import Button from "../components/buttons/Button";

const AddBillForm = ({ navigation }) => {
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [start_date, setStartDate] = useState(new Date());
  const [pnrNumbersStart, setPnrNumbersStart] = useState([""]);
  const [pnrNumbersReturn, setPnrNumbersReturn] = useState([""]);
  const [type, setType] = useState("");
  const [bill, setBill] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [ticket, setTicket] = useState(null);

  const { t } = useTranslation();

  const onDateChange = (event, selectedDate) => {
    const currentDate =
      selectedDate || (selectedDateType === "start" ? start_date : journeyDate);
    setShowDatePicker(false);

    if (selectedDateType === "start") {
      setStartDate(currentDate);
    } else {
      setJourneyDate(currentDate);
    }
  };

  // Function to handle PNR input change for Start Journey
  const handlePnrChangeStart = (value, index) => {
    const updatedPnrNumbers = [...pnrNumbersStart];
    updatedPnrNumbers[index] = value;
    setPnrNumbersStart(updatedPnrNumbers);
  };

  // Function to add a new PNR field for Start Journey
  const addPnrFieldStart = () => {
    setPnrNumbersStart([...pnrNumbersStart, ""]);
  };

  // Function to remove a PNR field for Start Journey
  const removePnrFieldStart = (index) => {
    const updatedPnrNumbers = pnrNumbersStart.filter((_, i) => i !== index);
    setPnrNumbersStart(updatedPnrNumbers);
  };

  // Function to handle PNR input change for Return Journey
  const handlePnrChangeReturn = (value, index) => {
    const updatedPnrNumbers = [...pnrNumbersReturn];
    updatedPnrNumbers[index] = value;
    setPnrNumbersReturn(updatedPnrNumbers);
  };

  // Function to add a new PNR field for Return Journey
  const addPnrFieldReturn = () => {
    setPnrNumbersReturn([...pnrNumbersReturn, ""]);
  };

  // Function to remove a PNR field for Return Journey
  const removePnrFieldReturn = (index) => {
    const updatedPnrNumbers = pnrNumbersReturn.filter((_, i) => i !== index);
    setPnrNumbersReturn(updatedPnrNumbers);
  };
  // Ticket Upload Handler
  const handleUploadTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Sirf PDF files allow kar raha hu, yahan images bhi allow kar sakte ho
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setTicket(result.assets[0]); // Uploaded file ko store kar rahe hain
      }
    } catch (error) {
      console.log("File upload error:", error);
    }
  };

  const handleRemoveTicket = () => {
    setTicket(null);
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("Add Bill")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        {/* Start Journey Date */}
        <TouchableOpacity
          onPress={() => {
            setSelectedDateType("start");
            setShowDatePicker(true);
          }}
        >
          <MyTextInput
            title={t("Journey Date")}
            value={start_date.toLocaleDateString()}
            placeholder={t("Select Start Date")}
            editable={false}
          />
        </TouchableOpacity>

        {/* {pnrNumbersStart.map((pnr, index) => (
          <View key={index} style={{ marginBottom: spacing.mh1 }}>
            <MyTextInput
              title={`${t("PNR Number (Start)")} ${index + 1}`}
              value={pnr}
              onChange={(value) => handlePnrChangeStart(value, index)}
              placeholder={t("Enter PNR Number")}
            />
           
            {pnrNumbersStart.length > 1 && (
              <TouchableOpacity onPress={() => removePnrFieldStart(index)}>
                <Span
                  style={[
                    styles.rightLink,
                    typography.fontLato,
                    { color: "red" },
                  ]}
                >
                  {t("Remove")}
                </Span>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={addPnrFieldStart}>
          <Span style={[styles.rightLink, typography.fontLato]}>
            {t("Add More PNR (Start)")}
          </Span>
        </TouchableOpacity> */}

        {/* PNR and Ticket Upload Group */}
        <View
          style={[
            spacing.bw1,
            spacing.br2,
            {
              // backgroundColor: "#f7f7f7",
              borderStyle: "dotted",
            },
          ]}
        >
          <H6 style={[typography.font14, typography.fontLato]}>
            {t("PNR Details & Ticket Upload")}
          </H6>
          {pnrNumbersStart.map((pnr, index) => (
            <View key={index} style={{ marginBottom: spacing.mh1 }}>
              <MyTextInput
                title={`${t("PNR Number")} ${index + 1}`}
                value={pnr}
                onChange={(value) => handlePnrChangeStart(value, index)}
                placeholder={t("Enter PNR Number")}
              />
              {pnrNumbersStart.length > 1 && (
                <TouchableOpacity onPress={() => removePnrFieldStart(index)}>
                  <Span
                    style={[
                      styles.rightLink,
                      typography.fontLato,
                      { color: "red" },
                    ]}
                  >
                    {t("Remove")}
                  </Span>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={addPnrFieldStart}>
            <Span style={[styles.rightLink, typography.fontLato]}>
              {t("Add More PNR")}
            </Span>
          </TouchableOpacity>

          {/* Ticket Upload Section */}
          <TouchableOpacity
            onPress={handleUploadTicket}
            style={{ marginTop: spacing.mh2, alignItems: "center" }}
          >
            <H6
              style={[
                spacing.p1,
                typography.textBold,
                spacing.bw2,
                spacing.br2,
                spacing.mb2,
                {
                  textAlign: "center",
                  borderColor: "green",
                  borderStyle: "dotted",
                },
              ]}
            >
              {t("Select Ticket")}
            </H6>
          </TouchableOpacity>

          {ticket && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <H6 style={{ color: "green", fontSize: 14 }}>
                {t("Uploaded File")}: {ticket.name}
              </H6>
              <TouchableOpacity onPress={handleRemoveTicket}>
                <Span
                  style={[
                    styles.rightLink,
                    typography.fontLato,
                    spacing.bw1,
                    {
                      color: "red",
                      borderColor: "green",
                      borderStyle: "dotted",
                    },
                  ]}
                >
                  {t("Remove")}
                </Span>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <MyPickerInput
          title={t("City")}
          value={type}
          onChange={setType}
          options={[
            { label: t("Patna"), value: "Patna" },
            { label: t("Delhi"), value: "Delhi" },
            { label: t("Mumbai"), value: "Mumbai" },
            { label: t("Kolkata"), value: "Kolkata" },
            { label: t("Chennai"), value: "Chennai" },
            { label: t("Bangalore"), value: "Bangalore" },
            { label: t("Hyderabad"), value: "Hyderabad" },
            { label: t("Ahmedabad"), value: "Ahmedabad" },
            { label: t("Pune"), value: "Pune" },
          ]}
        />

        {/* Return Journey Date */}
        <TouchableOpacity
          onPress={() => {
            setSelectedDateType("return");
            setShowDatePicker(true);
          }}
        >
          <MyTextInput
            title={t("Return Journey Date")}
            value={journeyDate.toLocaleDateString()}
            placeholder={t("Select Return Date")}
            editable={false}
          />
        </TouchableOpacity>

        {/* Return Journey PNR Inputs */}
        {pnrNumbersReturn.map((pnr, index) => (
          <View key={index} style={{ marginBottom: spacing.mh1 }}>
            <MyTextInput
              title={`${t("PNR Number (Return)")} ${index + 1}`}
              value={pnr}
              onChange={(value) => handlePnrChangeReturn(value, index)}
              placeholder={t("Enter PNR Number")}
            />

            {pnrNumbersReturn.length > 1 && (
              <TouchableOpacity onPress={() => removePnrFieldReturn(index)}>
                <Span
                  style={[
                    styles.rightLink,
                    typography.fontLato,
                    { color: "red" },
                  ]}
                >
                  {t("Remove")}
                </Span>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={addPnrFieldReturn}>
          <Span style={[styles.rightLink, typography.fontLato]}>
            {t("Add More PNR (Return)")}
          </Span>
        </TouchableOpacity>

        <MyPickerInput
          title={t("Mode of Type")}
          value={type}
          onChange={setType}
          options={[
            { label: t("Bus"), value: "Bus" },
            { label: t("Train"), value: "Train" },
            { label: t("Flight"), value: "Flight" },
          ]}
        />

        <MyTextInput
          title={t("Hotel Bill")}
          value={bill}
          onChange={setBill}
          placeholder={t("Upload your hotel bill")}
        />
        <Span style={[styles.rightLink, typography.fontLato]}>
          {t("Add More")}
        </Span>

        {/* <View
          style={{
            marginTop: spacing.mh2,
            padding: 15,
            backgroundColor: "#e0f7fa",
            borderRadius: 10,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#000",
            borderStyle: "dotted",
          }}
        >
          <H6
            style={{
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
              bottom: 35,
            }}
          >
            {t("Upload Ticket")}
          </H6>

          <TouchableOpacity
            onPress={handleUploadTicket}
            style={styles.uploadBtn}
          >
            <H6
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#000",
                borderStyle: "dotted",
                borderRadius: 10,
                padding: 5,
                bottom: 12,
              }}
            >
              {t("Select Ticket")}
            </H6>
          </TouchableOpacity>

          {ticket && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <H6 style={{ color: "green", fontSize: 14 }}>
                {t("Uploaded File")}: {ticket.name}
              </H6>
              <TouchableOpacity onPress={handleRemoveTicket}>
                <Span
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: "#000",
                    borderStyle: "dotted",
                  }}
                >
                  {t("Remove")}
                </Span>
              </TouchableOpacity>
            </View>
          )}
        </View> */}

        {/* <View
          style={{
            alignItems: "center",
          }}
        >
          <MyButton
            title={t("Calculate Bill")}
            onPress={() => navigation.navigate("travelDetailScreen")}
          />
        </View> */}
        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          onPress={() => navigation.navigate("travelDetailScreen")}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"Calculate Bill"}
          </H2>
        </Button>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDateType === "start" ? start_date : journeyDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </ContainerComponent>
  );
};

export default AddBillForm;
