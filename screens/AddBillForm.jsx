import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import {
  styles,
  typography,
  spacing,
  PRIMARY_COLOR_TRANSPARENT,
  SCREEN_WIDTH,
} from "../styles";
import { H2, Span, H6 } from "../components/text";
import { addBill } from "../redux/actions/projectAction";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";
const AddBillForm = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0); // Initialize active step state

  // Step state and handling
  const steps = ["Basic Info", "Ticket Details", "Other Info"];

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user_id: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    start_journey_time: "",
    end_journey: "",
    end_journey_time: "",
    transport: "Train",
    start_journey_pnr: "",
    end_journey_pnr: "",
    from_city: "",
    to_city: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    category: "Training",
    description_category: "",
    otherexpense: {
      meal: 0,
      parking: 0,
    },
    travelfare: [],
    dailyfare: [],
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDepartureTimePicker, setShowDepartureTimePicker] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [hotelBill, setHotelBill] = useState(null);
  const [errors, setErrors] = useState({ start: [""], end: [""] });
  const [start_journey_pnr, setStartJourneyPnr] = useState("");
  const [end_journey_pnr, setEndJourneyPnr] = useState("");

  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: "date",
    field: "",
    index: null,
  });

  const [formFields, setFormFields] = useState([
    {
      from: "",
      to: "",
      departure_date: "",
      departure_time: "",
      arrival_date: "",
      arrival_time: "",
      modeoftravel: "",
      add_total_km: "",
      add_rate_per_km: "",
      add_rent: "",
      add_vehicle_no: "",
      amount: "",
    },
  ]);

  const [dailyFareFields, setDailyFareFields] = useState([
    {
      place: "",
      HotelBillNo: "",
      date_of_stay: "",
      amount: "",
    },
  ]);

  // const addTransactionField = () => {
  //   setFormFields([
  //     ...formFields,
  //     {
  //       from: "",
  //       to: "",
  //       departure_date: "",
  //       departure_time: "",
  //       arrival_date: "",
  //       arrival_time: "",
  //       modeoftravel: "",
  //       add_total_km: "",
  //       add_rate_per_km: "",
  //       add_rent: "",
  //       add_vehicle_no: "",
  //       amount: "",
  //     },
  //   ]);
  //   setShowAdditionalFields(true); // Show the fields when "Add More" is clicked
  // };

  // Function to remove the transaction field

  const addTransactionField = () => {
    // If it's the first time, show the section and add one entry
    if (!showAdditionalFields) {
      setShowAdditionalFields(true);
      setFormFields([
        {
          from: "",
          to: "",
          departure_date: "",
          departure_time: "",
          arrival_date: "",
          arrival_time: "",
          modeoftravel: "",
          add_total_km: "",
          add_rate_per_km: "",
          add_rent: "",
          add_vehicle_no: "",
          amount: "",
        },
      ]);
    } else {
      // Already visible, just add another entry
      setFormFields([
        ...formFields,
        {
          from: "",
          to: "",
          departure_date: "",
          departure_time: "",
          arrival_date: "",
          arrival_time: "",
          modeoftravel: "",
          add_total_km: "",
          add_rate_per_km: "",
          add_rent: "",
          add_vehicle_no: "",
          amount: "",
        },
      ]);
    }
  };

  const removeTransactionField = (index) => {
    const newFields = [...formFields];
    newFields.splice(index, 1);
    setFormFields(newFields);
  };

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      console.log("Updated Form Fields:", updatedFields); // ✅ Add this
      setFormFields(updatedFields);
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const showDatePicker = (field, index = null) => {
    // Include index to determine if it's a transport field
    setDatePicker({ show: true, mode: "date", field, index });
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });

    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; //  Format to YYYY-MM-DD

      // Use index to decide whether to update form or formFields
      if (datePicker.index !== null) {
        handleChange(datePicker.field, formatted, datePicker.index);
      } else {
        handleChange(datePicker.field, formatted);
      }
    }
  };

  const handlePnrChangeStart = (value) => {
    setStartJourneyPnr(value); // Directly set the string value
    const updatedErrors = { ...errors };
    updatedErrors.start = value.trim() === "" ? "PNR is required" : "";
    setErrors(updatedErrors);
  };

  const handlePnrChangeEnd = (value) => {
    setEndJourneyPnr(value); // Directly set the string value
    const updatedErrors = { ...errors };
    updatedErrors.end = value.trim() === "" ? "PNR is required" : "";
    setErrors(updatedErrors);
  };

  const handleUploadTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setTicket({ name: result.name, uri: result.uri });
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleRemoveTicket = () => {
    setTicket(null);
  };

  const goToPrevious = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const goToNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };
  // hotel bill
  const handleUploadHotelBill = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setHotelBill({ name: result.name, uri: result.uri });
      }
    } catch (err) {
      console.log("Document pick error:", err);
    }
  };

  const handleRemoveHotelBill = () => {
    setHotelBill(null);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!form.user_id) {
        Alert.alert("Error", "User ID is required");
        return;
      }

      // Ensure numeric fields are properly converted to numbers
      const payload = {
        user_id: Number(form.user_id),
        visit_approve: form.visit_approve || "",
        objective_tour: form.objective_tour || "",
        meeting_visit: form.meeting_visit || "",
        outcome_achieve: form.outcome_achieve || "",
        start_journey: form.start_journey || null,
        start_journey_time: form.start_journey_time || null,
        end_journey: form.end_journey || null,
        end_journey_time: form.end_journey_time || null,
        transport: form.transport || "",
        start_journey_pnr: start_journey_pnr || "",
        end_journey_pnr: end_journey_pnr || "",
        from_city: form.from_city || "",
        to_city: form.to_city || "",
        total_km: form.total_km ? Number(form.total_km) : 0,
        rate_per_km: form.rate_per_km ? Number(form.rate_per_km) : 0,
        Rent: form.Rent ? Number(form.Rent) : 0,
        vehicle_no: form.vehicle_no || "",
        category: form.category || "",
        description_category: form.description_category || "",
        otherexpense: {
          meal: form.otherexpense?.meal ? Number(form.otherexpense.meal) : 0,
          parking: form.otherexpense?.parking
            ? Number(form.otherexpense.parking)
            : 0,
        },
        travelfare: formFields.map((field) => ({
          from: field.from || "",
          to: field.to || "",
          departure_date: field.departure_date || null,
          departure_time: field.departure_time || null,
          arrival_date: field.arrival_date || null,
          arrival_time: field.arrival_time || null,
          modeoftravel: field.modeoftravel || "",
          add_total_km: field.add_total_km ? Number(field.add_total_km) : 0,
          add_rate_per_km: field.add_rate_per_km
            ? Number(field.add_rate_per_km)
            : 0,
          add_rent: field.add_rent ? Number(field.add_rent) : 0,
          add_vehicle_no: field.add_vehicle_no || "",
          amount: field.amount ? Number(field.amount) : 0,
        })),
        dailyfare: dailyFareFields.map((field) => ({
          place: field.place || "",
          HotelBillNo: field.HotelBillNo || "",
          date_of_stay: field.date_of_stay || null,
          amount: field.amount ? Number(field.amount) : 0,
        })),
      };

      console.log("Payload to submit:", JSON.stringify(payload));

      // Dispatch the action and wait for the result
      const success = await dispatch(addBill(payload));

      if (success) {
        Alert.alert("Success", "Bill submitted successfully!");
        navigation.navigate("travelManagement");
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Add Bill"} hasIcon={true} isBack={true} />
      {/* Add ProgressStep Component to manage steps */}
      <ProgressStep
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <ScrollView style={[spacing.p2]}>
        {activeStep === 0 && (
          <>
            <MyTextInput
              title="User Id"
              value={form.user_id}
              onChangeText={(text) => handleChange("user_id", text)}
              placeholder="User ID"
            />

            <MyTextInput
              title="Visit Approved"
              value={form.visit_approve}
              onChangeText={(text) => handleChange("visit_approve", text)}
              placeholder="Visit Approved (Yes/No)"
            />

            <MyTextInput
              title="Objective of Tour"
              value={form.objective_tour}
              onChangeText={(text) => handleChange("objective_tour", text)}
              placeholder="Objective of Tour"
            />

            <MyTextInput
              title="Meeting/Purpose"
              value={form.meeting_visit}
              onChangeText={(text) => handleChange("meeting_visit", text)}
              placeholder="Meeting/Purpose"
            />

            <MyTextInput
              title="Outcome Achieved"
              value={form.outcome_achieve}
              onChangeText={(text) => handleChange("outcome_achieve", text)}
              placeholder="Outcome Achieved"
            />
          </>
        )}

        {activeStep === 1 && (
          <ScrollView style={[spacing.p1]}>
            {/* Start Journey Date */}
            <View style={{ marginBottom: 15 }}>
              <Span style={typography.fontLato}>Start Journey Date</Span>
              <Pressable
                onPress={() => showDatePicker("start_journey")}
                style={[
                  spacing.pv4,
                  spacing.ph3,
                  spacing.br1,
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",

                    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  },
                ]}
              >
                <Text style={{ color: form.start_journey ? "#000" : "#888" }}>
                  {form.start_journey || "Start Journey Date"}
                </Text>
                <Icon name="calendar" size={20} color="#888" />
              </Pressable>
            </View>

            {/* End Journey Date */}
            <View style={{ marginBottom: 15 }}>
              <Span style={typography.fontLato}>End Journey Date</Span>
              <Pressable
                onPress={() => showDatePicker("end_journey")}
                style={[
                  spacing.pv4,
                  spacing.ph3,
                  spacing.br1,
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",

                    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  },
                ]}
              >
                <Text style={{ color: form.end_journey ? "#000" : "#888" }}>
                  {form.end_journey || "End Journey Date"}
                </Text>
                <Icon name="calendar" size={20} color="#888" />
              </Pressable>
            </View>

            {datePicker.show && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <View
              style={[
                spacing.bw1,
                spacing.br2,
                {
                  borderStyle: "dotted",
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  width: SCREEN_WIDTH - 24,
                },
              ]}
            >
              <H6 style={[typography.font14, typography.fontLato, spacing.mb2]}>
                Journey Ticket
              </H6>

              <MyTextInput
                title="Start Journey PNR"
                value={start_journey_pnr}
                onChangeText={handlePnrChangeStart}
                placeholder="Start Journey Enter PNR"
                inputStyle={{ width: "100%" }}
              />

              <TouchableOpacity
                onPress={handleUploadTicket}
                style={{ marginTop: 10, alignItems: "center" }}
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
                  Upload Ticket
                </H6>
              </TouchableOpacity>

              {ticket && (
                <View style={{ marginTop: 10, alignItems: "center" }}>
                  <H6 style={{ color: "green", fontSize: 14 }}>
                    Uploaded File: {ticket.name}
                  </H6>
                  <TouchableOpacity onPress={handleRemoveTicket}>
                    <Span
                      style={{
                        color: "red",
                        borderColor: "green",
                        borderStyle: "dotted",
                      }}
                    >
                      Remove
                    </Span>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* End Journey Section */}
            <View
              style={[
                spacing.bw1,
                spacing.br2,
                {
                  borderStyle: "dotted",
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                },
              ]}
            >
              <H6 style={[typography.font14, typography.fontLato, spacing.p2]}>
                Journey Return Ticket
              </H6>

              <MyTextInput
                title="End Journey PNR"
                value={end_journey_pnr} // Bind directly to the string value
                onChangeText={handlePnrChangeEnd} // Use the updated handler
                placeholder="End Journey Enter PNR"
                inputStyle={{ width: "100%" }}
              />
            </View>
          </ScrollView>
        )}

        {activeStep === 2 && (
          <ScrollView style={[spacing.p1]}>
            {/* From City */}
            <MyPickerInput
              title={"From"}
              value={form.from_city}
              onChange={(text) => handleChange("from_city", text)}
              options={[
                { label: "Patna", value: "Patna" },
                { label: "Delhi", value: "Delhi" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Kolkata", value: "Kolkata" },
                { label: "Chennai", value: "Chennai" },
                { label: "Bangalore", value: "Bangalore" },
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Ahmedabad", value: "Ahmedabad" },
                { label: "Pune", value: "Pune" },
              ]}
            />

            {/* To City */}
            <MyPickerInput
              title={"To"}
              value={form.to_city}
              onChange={(text) => handleChange("to_city", text)}
              options={[
                { label: "Patna", value: "Patna" },
                { label: "Delhi", value: "Delhi" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Kolkata", value: "Kolkata" },
                { label: "Chennai", value: "Chennai" },
                { label: "Bangalore", value: "Bangalore" },
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Ahmedabad", value: "Ahmedabad" },
                { label: "Pune", value: "Pune" },
              ]}
            />

            {/* Mode of Transport */}
            <MyPickerInput
              title={"Mode Of Transport"}
              value={form.transport}
              onChange={(val) => handleChange("transport", val)}
              options={[
                { label: "Bus", value: "Bus" },
                { label: "Train", value: "Train" },
                { label: "Flight", value: "Flight" },
              ]}
            />

            <MyPickerInput
              Value={form.description_category}
              title="Category"
              onChange={(itemValue) =>
                handleChange("description_category", itemValue)
              }
              options={[
                { label: "Transport", value: "Transport" },
                { label: "Fuel", value: "Fuel" },
                { label: "Maintenance", value: "Maintenance" },
                { label: "Miscellaneous", value: "Miscellaneous" },
              ]}
            />

            <MyTextInput
              title="Amount"
              value={form.amount?.toString()}
              onChangeText={(text) => handleChange("amount", text)}
              placeholder="Amount"
              keyboardType="numeric"
            />

            {/* Rate per KM & Vehicle No */}
            <MyTextInput
              title="Rate per KM"
              value={form.rate_per_km?.toString()}
              onChangeText={(text) => handleChange("rate_per_km", text)}
              placeholder="Rate per KM"
              keyboardType="numeric"
            />
            <MyTextInput
              title="Vehicle No"
              value={form.vehicle_no}
              onChangeText={(text) => handleChange("vehicle_no", text)}
              placeholder="Vehicle No"
            />

            {/* Add More Miscellaneous Bills */}
            {!showAdditionalFields && (
              <TouchableOpacity onPress={addTransactionField}>
                <Text style={{ color: "#76885B", fontWeight: "bold" }}>
                  Add More Miscellaneous Bills
                </Text>
              </TouchableOpacity>
            )}

            {/* Form Fields (Dynamic) */}
            {showAdditionalFields &&
              formFields.map((form, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <MyTextInput
                    title="From"
                    value={form.from}
                    onChangeText={(text) => handleChange("from", text, index)}
                    placeholder="From"
                  />
                  <MyTextInput
                    title="To"
                    value={form.to}
                    onChangeText={(text) => handleChange("to", text, index)}
                    placeholder="To"
                  />

                  <MyTextInput
                    title="Departure Time"
                    value={form.departure_time}
                    onPressIn={() => setShowDepartureTimePicker(true)}
                    placeholder="HH:MM:SS"
                  />
                  {showDepartureTimePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedDate) => {
                        setShowDepartureTimePicker(false);
                        if (selectedDate) {
                          const time = selectedDate.toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          );
                          handleChange("departure_time", time, index);
                        }
                      }}
                    />
                  )}

                  <MyTextInput
                    title="Arrival Time"
                    value={form.arrival_time}
                    onPressIn={() => setShowTimePicker(true)}
                    placeholder="HH:MM:SS"
                  />
                  {showTimePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedDate) => {
                        setShowTimePicker(false);
                        if (selectedDate) {
                          const time = selectedDate.toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          );
                          handleChange("arrival_time", time, index);
                        }
                      }}
                    />
                  )}

                  <MyPickerInput
                    title={"Mode Of Transport"}
                    value={form.modeoftravel}
                    onChange={(val) => handleChange("modeoftravel", val, index)}
                    options={[
                      { label: "Bus", value: "Bus" },
                      { label: "Train", value: "Train" },
                      { label: "Flight", value: "Flight" },
                    ]}
                  />

                  <MyTextInput
                    title="Total KM"
                    value={form.add_total_km?.toString()}
                    onChangeText={(text) =>
                      handleChange("add_total_km", text, index)
                    }
                    placeholder="Total KM"
                    keyboardType="numeric"
                  />
                  <MyTextInput
                    title="Rate per KM"
                    value={form.add_rate_per_km?.toString()}
                    onChangeText={(text) =>
                      handleChange("add_rate_per_km", text, index)
                    }
                    placeholder="Rate per KM"
                    keyboardType="numeric"
                  />

                  <MyTextInput
                    title="Vehicle No"
                    value={form.add_vehicle_no}
                    onChangeText={(text) =>
                      handleChange("add_vehicle_no", text, index)
                    }
                    placeholder="Vehicle No"
                  />
                  <MyTextInput
                    title="Amount"
                    value={form.amount?.toString()}
                    onChangeText={(text) => handleChange("amount", text, index)}
                    placeholder="Amount"
                    keyboardType="numeric"
                  />

                  {/* Remove Button */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => removeTransactionField(index)}
                    >
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

            {/* Upload Hotel Bill */}
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
                  {"Upload Hotel Bill"}
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
                    {"Uploaded File"}: {hotelBill.name}
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
                      {"Remove"}
                    </Span>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Button
              style={[
                styles.btn,
                styles.bgPrimary,
                { justifyContent: "center" },
              ]}
              onPress={handleSubmit}
            >
              <H2
                style={[styles.btnText, styles.textLarge, typography.textLight]}
              >
                Calculate Bill
              </H2>
            </Button>
          </ScrollView>
        )}
      </ScrollView>

      <NavigationButtons
        activeStep={activeStep}
        steps={steps}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
    </ContainerComponent>
  );
};

export default AddBillForm;
