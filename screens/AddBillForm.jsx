// import All react Native
import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

// import Components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";

import { useDispatch } from "react-redux";
import { setBillData } from "../redux/actions/taskActions";

// import Styles
import { spacing, styles, typography } from "../styles";
import { H2, H6, Span } from "../components/text";
import Button from "../components/buttons/Button";
import useAddBillForm from "../hooks/useAddBillForm";

const AddBillForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // Use all function in hooks useAddBillForm
  const {
    start_date,
    journeyDate,
    selectedDateType,
    showDatePicker,
    pnrNumbersStart,
    pnrNumbersReturn,
    ticket,
    hotelBill,
    onDateChange,
    handlePnrChangeStart,
    addPnrFieldStart,
    removePnrFieldStart,
    handlePnrChangeReturn,
    addPnrFieldReturn,
    removePnrFieldReturn,
    handleUploadTicket,
    handleRemoveTicket,
    handleUploadHotelBill,
    handleRemoveHotelBill,
    setSelectedDateType,
    setShowDatePicker,
  } = useAddBillForm();
  const [type, setType] = useState(null);
  const [city, setCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);

  const handleCalculateBill = () => {
    const formData = {
      start_date,
      journeyDate,
      pnrNumbersStart,
      pnrNumbersReturn,
      ticket,
      hotelBill,
      city,
      destinationCity,
      type,
    };

    dispatch(setBillData(formData));
    console.log("Form Data:", formData);
    navigation.navigate("travelDetailScreen", { formData });
  };
  return (
    <ContainerComponent>
      <MyHeader title={t("Add Bill")} hasIcon={true} isBack={true} />
      <ScrollView>
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

        {/* PNR and Ticket Upload Group */}
        <View
          style={[
            spacing.bw1,
            spacing.p1,
            spacing.br2,
            {
              borderStyle: "dotted",
            },
          ]}
        >
          <H6 style={[typography.font14, typography.fontLato, spacing.p1]}>
            {t("Journey Ticket")}
          </H6>
          {pnrNumbersStart.map((pnr, index) => (
            <View key={index}>
              <MyTextInput
                title={`${t("PNR Number")} ${index + 1}`}
                value={pnr}
                onChange={(value) => handlePnrChangeStart(value, index)}
                placeholder={t("Upload Ticket & Enter PNR")}
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
                typography.fontLato,
                spacing.p1,
                spacing.bw1,
                spacing.br1,
                spacing.mb2,
                typography.font16,
                {
                  textAlign: "center",
                  borderColor: "green",
                  borderStyle: "dotted",
                  backgroundColor: "#e8f5e9",
                },
              ]}
            >
              {t("Upload Ticket")}
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
          title={t("From")}
          value={city}
          onChange={setCity}
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

        {/* Destination City */}
        <MyPickerInput
          title={t("To")}
          value={destinationCity}
          onChange={setDestinationCity}
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
          title={t("Mode Of Transport")}
          value={type}
          onChange={setType}
          options={[
            { label: t("Bus"), value: "Bus" },
            { label: t("Train"), value: "Train" },
            { label: t("Flight"), value: "Flight" },
          ]}
        />
        <View
          style={[
            spacing.bw1,
            spacing.br2,
            spacing.p2,
            spacing.mt1,
            {
              borderColor: "#ccc",
            },
          ]}
        >
          {/* Hotel Bill Upload Section */}
          <View
            style={[
              spacing.p3,
              spacing.bw1,
              spacing.br2,
              {
                marginTop: spacing.mh2,
                alignItems: "center",
                borderStyle: "dotted",
                backgroundColor: "#e8f5e9",
              },
            ]}
          >
            <TouchableOpacity onPress={handleUploadHotelBill}>
              <H6
                style={[
                  typography.textBold,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                {t("Upload Hotel Bill")}
              </H6>
            </TouchableOpacity>

            {hotelBill && (
              <View
                style={[
                  spacing.mt2,
                  spacing.p1,
                  spacing.br1,
                  {
                    alignItems: "center",
                    backgroundColor: "#f1f8e9",
                    borderWidth: 0.2,
                  },
                ]}
              >
                <H6 style={[typography.font14, typography.fontLato]}>
                  {t("Uploaded File")}: {hotelBill.name}
                </H6>
                <TouchableOpacity onPress={handleRemoveHotelBill}>
                  <Span
                    style={[
                      styles.rightLink,
                      typography.fontLato,
                      {
                        color: "red",
                        marginTop: 6,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {t("Remove")}
                  </Span>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          // onPress={() => navigation.navigate("travelDetailScreen")}
          onPress={handleCalculateBill}
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
