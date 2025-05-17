import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { addBill } from "../redux/actions/projectAction";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import { styles, typography, spacing } from "../styles";
import { H2, Span, H6 } from "../components/text";
const AddBillForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user_id: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    end_journey: "",
    transport: "Train",
    start_journey_pnr: "",
    end_journey_pnr: "",
    from_city: "",
    to_city: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    category: "Train",
    description_category: "",
    pickup_date: "", // This is for the main form
  });

  const [pnrNumbersStart, setPnrNumbersStart] = useState([""]);
  const [ticket, setTicket] = useState(null);
  const [errors, setErrors] = useState({ start: [] });
  const [hotelBill, setHotelBill] = useState(null);

  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: "date",
    field: "",
    index: null,
  });

  const [formFields, setFormFields] = useState([
    {
      total_km: "",
      rate_per_km: "",
      Rent: "",
      vehicle_no: "",
      description_category: "",
      pickup_date: "",
    },
  ]);

  const addTransactionField = () => {
    setFormFields([
      ...formFields,
      {
        total_km: "",
        rate_per_km: "",
        Rent: "",
        vehicle_no: "",
        description_category: "",
        pickup_date: "",
      },
    ]);
  };

  const removeTransactionField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      // Handles dynamic transport entry updates
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      setFormFields(updatedFields);
    } else {
      //  Handles main form updates
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

  const isValidDate = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const addPnrFieldStart = () => {
    setPnrNumbersStart([...pnrNumbersStart, ""]);
  };

  const removePnrFieldStart = (index) => {
    const newPnrs = [...pnrNumbersStart];
    newPnrs.splice(index, 1);
    setPnrNumbersStart(newPnrs);
    const newErrors = [...errors.start];
    newErrors.splice(index, 1);
    setErrors({ ...errors, start: newErrors });
  };

  const handlePnrChangeStart = (value, index) => {
    const newPnrs = [...pnrNumbersStart];
    newPnrs[index] = value;
    setPnrNumbersStart(newPnrs);
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
    const requiredDates = ["start_journey", "end_journey", "pickup_date"];

    // Validate top-level dates
    for (let key of requiredDates) {
      if (form[key] && !isValidDate(form[key])) {
        Alert.alert(
          "Invalid Date",
          `${key.replace("_", " ")} must be in YYYY-MM-DD format.`
        );
        return;
      }
    }

    //   Validate pickup_date in transport entries
    for (let i = 0; i < formFields.length; i++) {
      const entry = formFields[i];
      if (!entry.pickup_date || !isValidDate(entry.pickup_date)) {
        Alert.alert(
          "Invalid Date",
          `Pickup date in transport entry ${
            i + 1
          } must be in YYYY-MM-DD format.`
        );
        return;
      }
    }

    const payload = {
      ...form,
      user_id: Number(form.user_id),
      total_km: Number(form.total_km),
      rate_per_km: Number(form.rate_per_km),
      Rent: Number(form.Rent),
      start_journey_pnr: [form.start_journey_pnr],
      end_journey_pnr: [form.end_journey_pnr],
      transport_entries: formFields,
      pickup_date: form.pickup_date,
    };

    try {
      const result = await dispatch(addBill(payload));
      if (result === true) {
        console.log("Submitted bill data:", payload);
        navigation.navigate("travelManagement", { formData: payload });
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "Unexpected error occurred.");
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Add Bill"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View>
          <MyTextInput
            title="User Id"
            value={form.user_id}
            onChangeText={(text) => handleChange("user_id", text)}
            placeholder="User ID"
          />
        </View>

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
          title="Meeting/Visit Location"
          value={form.meeting_visit}
          onChangeText={(text) => handleChange("meeting_visit", text)}
          placeholder="Meeting/Visit Location"
        />

        <MyTextInput
          title="Outcome Achieved"
          value={form.outcome_achieve}
          onChangeText={(text) => handleChange("outcome_achieve", text)}
          placeholder="Outcome Achieved"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {/* Start Journey Date */}
          <View style={{ marginBottom: 10 }}>
            <Text>Start Journey Date</Text>
            <Pressable
              onPress={() => showDatePicker("start_journey")}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F0FAF0",
              }}
            >
              <Text>{form.start_journey || "Start Journey Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View>

          {/*  End Journey Date */}
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text>End Journey Date</Text>
            <Pressable
              onPress={() => showDatePicker("end_journey")}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F0FAF0",
              }}
            >
              <Text>{form.end_journey || "End Journey Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View>
        </View>

        {datePicker.show && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* <View style={{ marginBottom: 10 }}>
          <Text>Start Journey PNR</Text>
          <TextInput
            value={form.start_journey_pnr}
            onChangeText={(text) => handleChange("start_journey_pnr", text)}
            placeholder="Start Journey PNR"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>End Journey PNR</Text>
          <TextInput
            value={form.end_journey_pnr}
            onChangeText={(text) => handleChange("end_journey_pnr", text)}
            placeholder="End Journey PNR"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View> */}

        <View
          style={[
            spacing.bw1,
            spacing.p1,
            spacing.br2,
            { borderStyle: "dotted", marginTop: 10 },
          ]}
        >
          <H6 style={[typography.font14, typography.fontLato, spacing.p2]}>
            Journey Ticket
          </H6>

          {pnrNumbersStart.map((pnr, index) => (
            <View key={index}>
              <MyTextInput
                title={`PNR Number ${index + 1}`}
                value={pnr}
                onChangeText={(value) => handlePnrChangeStart(value, index)}
                placeholder="Upload Ticket & Enter PNR"
              />
              {errors.start[index] ? (
                <Text style={{ color: "red" }}>{errors.start[index]}</Text>
              ) : null}
              {pnrNumbersStart.length > 1 && (
                <TouchableOpacity onPress={() => removePnrFieldStart(index)}>
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={addPnrFieldStart}>
            <Span style={[styles.rightLink, typography.fontLato]}>
              Add More PNR
            </Span>
          </TouchableOpacity>

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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <MyPickerInput
              title={"From"}
              value={form.from_city}
              // onChange={setFromCity}
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
          </View>

          <View style={{ flex: 1, marginLeft: 5 }}>
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
          </View>
        </View>

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

        {/* Remove & Add More Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={addTransactionField}>
            <Text style={{ color: "#76885B", fontWeight: "bold" }}>
              Add More Miscellaneous Bills
            </Text>
          </TouchableOpacity>
        </View>

        {formFields.map((form, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Total KM */}

            <MyTextInput
              title="Total KM"
              value={form.total_km}
              onChangeText={(text) => handleChange("total_km", text, index)}
              placeholder="Total KM"
              keyboardType="numeric"
              maxLength={6}
            />

            {/* Rate per KM */}

            <MyTextInput
              title="Rate per KM"
              value={form.rate_per_km}
              onChangeText={(text) => handleChange("rate_per_km", text, index)}
              placeholder="Rate per KM"
              keyboardType="numeric"
              maxLength={6}
            />

            {/* Rent */}
            <MyTextInput
              title="Rent"
              value={form.Rent}
              onChangeText={(text) => handleChange("Rent", text, index)}
              placeholder="Rent"
              keyboardType="numeric"
            />

            {/* Vehicle No */}

            <MyTextInput
              title="Vehicle No"
              value={form.vehicle_no}
              onChangeText={(text) => handleChange("vehicle_no", text, index)}
              placeholder="Vehicle No"
            />

            {/* Category Description */}
            <Text>Category Description</Text>
            <MyPickerInput
              Value={form.description_category}
              onChange={(itemValue) =>
                handleChange("description_category", itemValue, index)
              }
              options={[
                { label: "Transport", value: "Transport" },
                { label: "Fuel", value: "Fuel" },
                { label: "Maintenance", value: "Maintenance" },
                { label: "Miscellaneous", value: "Miscellaneous" },
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
            </View>

            {/* Pickup Date */}
            <MyTextInput
              title="Pickup Date"
              placeholder="YYYY-MM-DD"
              value={form.pickup_date}
              onChangeText={(text) => handleChange("pickup_date", text, index)}
            />

            {/* Remove & Add More Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => removeTransactionField(index)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addTransactionField}>
                <Text style={{ color: "#76885B", fontWeight: "bold" }}>
                  Add More Miscellaneous Bills
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", top: 4 },
          ]}
          onPress={handleSubmit}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"Calculate Bill"}
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
};

export default AddBillForm;
