import { useState } from "react";
import {
  View,
  Text,
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
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import {
  styles,
  typography,
  spacing,
  PRIMARY_COLOR_TRANSPARENT,
} from "../styles";
import { H2, Span, H6 } from "../components/text";
import { addBill } from "../redux/actions/projectAction";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";

const AddBillForm = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  // Function to create an empty travel field
  const createEmptyTravelField = () => ({
    from: "",
    to: "",
    departure_time: "",
    arrival_time: "",
    modeoftravel: "",
    add_total_km: "",
    add_rate_per_km: "",
    add_vehicle_no: "",
    amount: "",
    add_rent: "", // Ensure add_rent is part of the travel field
  });

  // Function to create an empty daily fare field
  const createEmptyDailyFareField = () => ({
    place: "",
    HotelBillNo: "",
    date_of_stay: null,
    amount: "",
  });

  const [form, setForm] = useState({
    user_id: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    end_journey: "",
    transport: "Train",
    from_city: "",
    to_city: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    description_category: "",
    category: "", // Added category field
    add_rent: "", // Added add_rent field
    otherexpense: { meal: 0, parking: 0 },
    travelfare: [],
    dailyfare: [],
    start_journey_pnr: "",
    end_journey_pnr: "",
    ticket: null,
    hotelBill: null,
  });

  const [datePicker, setDatePicker] = useState({ show: false, field: "" });
  const [formFields, setFormFields] = useState([createEmptyTravelField()]);
  const [dailyFareFields, setDailyFareFields] = useState([
    createEmptyDailyFareField(),
  ]);

  const steps = ["Basic Info", "Ticket Details", "Other Info"];

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      setFormFields(updatedFields);
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const showDatePicker = (field) => {
    setDatePicker({ show: true, field });
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      handleChange(datePicker.field, formatted);
    }
  };

  const handleUpload = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        setForm({ ...form, [type]: { name: result.name, uri: result.uri } });
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleRemove = (type) => {
    setForm({ ...form, [type]: null });
  };

  const handleSubmit = async () => {
    try {
      // Check if the category field is populated
      if (!form.category) {
        Alert.alert("Error", "Please select a category.");
        return; // Prevent submission if category is not set
      }

      const payload = {
        ...form,
        total_km: Number(form.total_km),
        rate_per_km: Number(form.rate_per_km),
        Rent: Number(form.Rent),
        add_rent: Number(form.add_rent) || 0, // Ensure add_rent is included
        travelfare: formFields.map((field) => ({
          from: field.from || "",
          to: field.to || "",
          departure_time: field.departure_time || null,
          arrival_time: field.arrival_time || null,
          modeoftravel: field.modeoftravel || "",
          add_total_km: field.add_total_km ? Number(field.add_total_km) : 0,
          add_rate_per_km: field.add_rate_per_km
            ? Number(field.add_rate_per_km)
            : 0,
          add_vehicle_no: field.add_vehicle_no || "",
          amount: field.amount ? Number(field.amount) : 0,
          add_rent: Number(field.add_rent) || 0, // Ensure add_rent is included in travel fields
        })),
        dailyfare: dailyFareFields.map((field) => ({
          place: field.place || "",
          HotelBillNo: field.HotelBillNo || "",
          date_of_stay: field.date_of_stay || null,
          amount: field.amount ? Number(field.amount) : 0,
        })),
      };

      // Log the payload to check values
      console.log("Payload to submit:", payload);

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
      <ProgressStep
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <ScrollView style={[spacing.p2]}>
        {activeStep === 0 && (
          <>
            {[
              "user_id",
              "visit_approve",
              "objective_tour",
              "meeting_visit",
              "outcome_achieve",
              "category", // Added category to the first step
              // "add_rent", // Added add_rent to the first step
            ].map((field) => (
              <MyTextInput
                key={field}
                title={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                value={form[field]}
                onChangeText={(text) => handleChange(field, text)}
                placeholder={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              />
            ))}
          </>
        )}
        {activeStep === 1 && (
          <ScrollView style={[spacing.p1]}>
            {["start_journey", "end_journey"].map((field) => (
              <View key={field} style={{ marginBottom: 15 }}>
                <Span style={typography.fontLato}>
                  {field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </Span>
                <Pressable
                  onPress={() => showDatePicker(field)}
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
                  <Text style={{ color: form[field] ? "#000" : "#888" }}>
                    {form[field] || `${field.replace(/_/g, " ")} Date`}
                  </Text>
                  <Icon name="calendar" size={20} color="#888" />
                </Pressable>
              </View>
            ))}
            {datePicker.show && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            {["start_journey_pnr", "end_journey_pnr"].map((field) => (
              <MyTextInput
                key={field}
                title={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                value={form[field]}
                onChangeText={(text) => handleChange(field, text)}
                placeholder={`Enter ${field.replace(/_/g, " ")}`}
              />
            ))}
            {["ticket", "hotelBill"].map((type) => (
              <View
                key={type}
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
                <H6
                  style={[typography.font14, typography.fontLato, spacing.mb2]}
                >
                  {type === "ticket" ? "Journey Ticket" : "Hotel Bill"}
                </H6>
                <TouchableOpacity
                  onPress={() => handleUpload(type)}
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
                    Upload {type === "ticket" ? "Ticket" : "Hotel Bill"}
                  </H6>
                </TouchableOpacity>
                {form[type] && (
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <H6 style={{ color: "green", fontSize: 14 }}>
                      Uploaded File: {form[type].name}
                    </H6>
                    <TouchableOpacity onPress={() => handleRemove(type)}>
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
            ))}
          </ScrollView>
        )}

        {activeStep === 2 && (
          <ScrollView style={[spacing.p1]}>
            {["from_city", "to_city", "transport", "description_category"].map(
              (field) => (
                <MyPickerInput
                  key={field}
                  title={field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={form[field]}
                  onChange={(text) => handleChange(field, text)}
                  options={
                    field === "transport"
                      ? [
                          { label: "Bus", value: "Bus" },
                          { label: "Train", value: "Train" },
                          { label: "Flight", value: "Flight" },
                        ]
                      : field === "description_category"
                      ? [
                          { label: "Food", value: "Food" },
                          { label: "Fuel", value: "Fuel" },
                          { label: "Parking", value: "Parking" },
                        ]
                      : [
                          { label: "Patna", value: "Patna" },
                          { label: "Delhi", value: "Delhi" },
                          { label: "Mumbai", value: "Mumbai" },
                          { label: "Kolkata", value: "Kolkata" },
                          { label: "Chennai", value: "Chennai" },
                          { label: "Bangalore", value: "Bangalore" },
                          { label: "Hyderabad", value: "Hyderabad" },
                          { label: "Ahmedabad", value: "Ahmedabad" },
                          { label: "Pune", value: "Pune" },
                        ]
                  }
                />
              )
            )}
            {["amount", "rate_per_km", "vehicle_no"].map((field) => (
              <MyTextInput
                key={field}
                title={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                value={form[field]?.toString()}
                onChangeText={(text) => handleChange(field, text)}
                placeholder={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                keyboardType="numeric"
              />
            ))}
            {formFields.length === 0 && (
              <TouchableOpacity
                onPress={() => {
                  setFormFields([...formFields, createEmptyTravelField()]);
                  setActiveStep(2); // stays on same tab
                }}
              >
                <Text style={{ color: "#76885B", fontWeight: "bold" }}>
                  Add More
                </Text>
              </TouchableOpacity>
            )}
            {formFields.map((field, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                {[
                  "from",
                  "to",
                  "departure_time",
                  "arrival_time",
                  "modeoftravel", // This will be replaced with MyPickerInput
                  "add_total_km",
                  "add_rate_per_km",
                  "add_vehicle_no",
                  "amount",
                  //  "add_rent", // Ensure add_rent is included in the travel fields
                ].map((subField) => (
                  <View key={subField}>
                    {subField === "modeoftravel" ? (
                      <MyPickerInput
                        title={subField
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                        value={field[subField]}
                        onChange={(text) => handleChange(subField, text, index)}
                        options={[
                          { label: "Bus", value: "Bus" },
                          { label: "Train", value: "Train" },
                          { label: "Flight", value: "Flight" },
                          { label: "Car", value: "Car" },
                          { label: "Bicycle", value: "Bicycle" },
                          { label: "Walking", value: "Walking" },
                        ]}
                      />
                    ) : (
                      <MyTextInput
                        title={subField
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                        value={field[subField]}
                        onChangeText={(text) =>
                          handleChange(subField, text, index)
                        }
                        placeholder={subField
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                        keyboardType={
                          [
                            "add_total_km",
                            "add_rate_per_km",
                            "amount",
                            "add_rent", // Ensure add_rent is included in the keyboard type check
                          ].includes(subField)
                            ? "numeric"
                            : "default"
                        }
                      />
                    )}
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFormFields([...formFields, createEmptyTravelField()]);
                      setActiveStep(2); // stays on same tab
                    }}
                  >
                    <Text style={{ color: "#76885B", fontWeight: "bold" }}>
                      Add More
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setFormFields(formFields.filter((_, i) => i !== index))
                    }
                  >
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

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
        goToPrevious={() => setActiveStep(activeStep - 1)}
        goToNext={() => setActiveStep(activeStep + 1)}
      />
    </ContainerComponent>
  );
};

export default AddBillForm;
