import { Alert } from "react-native";

export const fakeDelete = ({
  title,
  message,
  negativeTextClick = null,
  positiveText,
  positiveTextClick = null,
}) => {
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel", onPress: negativeTextClick },
    { text: positiveText, onPress: positiveTextClick },
  ]);
};

export const ProjectcardsForDashboard = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    count: 1,
    status: "Total Projects ",
    page: "totalProjectsScreen",
    backgroundColor: "#A0D3E8",
  },
];

export const projects = [
  {
    id: 1,
    projectName: "Project 01B",
    workOrderNumber: "12345",
    rate: "100",
    date: "26-Nov-2024",
    sites: [1, 2],
    vendor: [1],
    tasks: [1, 2],
  },
];

export const totalsitesData = [
  {
    id: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    state: "Bihar",
    dist: "Purnia",
    location: "BANMANKHI",
    projectSerialCode: "12",
    projectCapacity: "30",
    cANumber: "CA123456",
    contactNo: "9199502622",
    iCVendorName: "Pankaj Singh",
    sanctionLoad: "5 kW",
    meterNumber: "123456789",
    loadEnhancementStatus: "Approved",
    siteSurveyStatus: "Done",
    netMeterSrNo: "NM-987654",
    solarMeterSrNO: "SM-543210",
    materialInspectionDate: "2024-11-20",
    sppInstallationDate: "2024-11-25",
    commissioningDate: "2024-11-30",
    remarks: "All systems operational and inspected.",
  },
  {
    id: 2,
    siteName: "Gyan Kendra High School",
    state: "Uttar Pradesh",
    dist: "Varanasi",
    location: "Lanka",
    geo: {
      lat: 25.2902024,
      lng: 82.9832034,
    },
    projectSerialCode: "45",
    projectCapacity: "50",
    cANumber: "CA789101",
    contactNo: "9123456789",
    iCVendorName: "Rajesh Kumar",
    sanctionLoad: "10 kW",
    meterNumber: "AB123456789",
    loadEnhancementStatus: "Pending Approval",
    siteSurveyStatus: "Pending",
    netMeterSrNo: "NM20241127001",
    solarMeterSrNO: "SM20241127002",
    materialInspectionDate: "2024-11-25",
    sppInstallationDate: "2024-12-05",
    commissioningDate: "2024-12-10",
    remarks: "Site survey and installation scheduled as per plan.",
  },
];

export const siteCardsForDashboard = [
  {
    id: 1,
    name: "total_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#f9caa7",
    status: 1,
  },
  {
    id: 2,
    name: "completed_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffeead",
  },
  {
    id: 3,
    name: "in_progress_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#bdeaee",
  },
  {
    id: 4,
    name: "pending_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffbbee",
  },
];

export const vendorCardForDashboard = [
  {
    id: "1",
    title: "total_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#FFB7B2",
  },
  {
    id: "2",
    title: "active_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#B6F4D3",
  },
  {
    id: "3",
    title: "inactive_vendors",
    count: 0,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#C4C3D0",
  },
];

export const vendors = [
  {
    id: 1,
    first_name: "Rakesh",
    last_name: "Sharma",
    name: "Rakesh Sharma",
    contact_person: "Amit Kumar",
    contact_number: "9876543210",
    aadhar_number: "1234-5678-9101",
    account_name: "Rakesh Sharma",
    account_number: "123456789012",
    ifsc: "SBIN0001234",
    bank_name: "State Bank of India",
    gst_number: "07ABCDE1234F1Z5",
    pan_number: "ABCDE1234F",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "rakesh.sharma@gmail.com",
    password: "12345678",
    status: "Active",
    disable_login: 0,
    address: "123 gali, Jhajjar, Haryana",
    last_online: "2024-10-03 05:41:49",
    created_date: "2024-11-22",
  },
];

export const inventoryData = [
  {
    id: 1,
    projectId: 1,
    siteId: 1,
    product_name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    unit: "pieces",
    initial_quantity: "1000 units",
    qty_stock: "1000",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "20 Nov 2024",
    allocation_officer: "Bittu Gupta",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: 1,
    siteId: 1,
    product_name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "200",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "24 Nov 2024",
    allocation_officer: "Bittu Mishra",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
];

export const menuItems = [
  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
  },
  {
    label: "site_management_title",
    icon: "map-outline",
    page: "totalSitesScreen",
  },
  {
    label: "vendor_management_title",
    icon: "people-outline",
    page: "totalVendorsScreen",
  },
  {
    label: "project_management_title",
    icon: "reader-outline",
    page: "totalProjectsScreen",
  },
  {
    label: "task_management_title",
    page: "",
    icon: "grid-outline",
    page: "taskScreen",
  },
  {
    label: "report_title",
    page: "",
    icon: "pie-chart-outline",
  },
  {
    label: "settings",
    page: "",
    icon: "cog-outline",
    page: "InternalSetting",
  },
];

export const internal = [
  {
    label: "Notification",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "Privacy", page: "privacyPolicy", icon: "shield-checkmark-outline" },
];

export const notifications = [
  {
    id: "1",
    title: "You updated your profile picture",
    description: "You just updated your profile picture.",
    icon: "account",
    time: "Just Now",
  },
  {
    id: "2",
    title: "Password Changed",
    description: "You’ve completed changing the password.",
    icon: "lock-reset",
    time: "2 oct,22:22 Pm",
  },
  {
    id: "3",
    title: "Subham Applied for Leave",
    description: "Please accept my leave request.",
    icon: "account-circle",
    time: "23 sept",
  },
  {
    id: "4",
    title: "System Update",
    description: "Please update to the newest app for a better experience.",
    icon: "cellphone-information",
    time: "25 sept,21:22 Pm",
  },
];

export const documentData = [
  {
    id: "1",
    staffId: 1,
    documentName: "Offer Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "2",
    staffId: 1,
    documentName: "Appointment Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "3",
    staffId: 1,
    documentName: "Bond Agreement",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "4",
    staffId: 1,
    documentName: "Appraisal Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
];

export const staff = {
  id: 1,
  first_name: "Rakesh",
  last_name: "Sharma",
  user_type: "staff",
  is_admin: 0,
  role_id: 0,
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  job_title: "Technical Assistant",
  salary: "20000",
  salary_term: "Monthly",
  Date_of_hire: "2024-08-27",
  disable_login: 0,
  note: [],
  address: "123 gali, jhajjar, Haryana",
  alternative_address: "",
  contactNo: "9909230912",
  alternative_phone: "",
  dob: "",
  gender: "male",
  sticky_note: [],
  skype: "",
  language: "",
  last_online: "2024-10-03 05:41:49",
  file: "file-pdf",
  size: "",
  uploaded_by: "rakesh sharma",
  created_date: "",
};

export const taskslistdata = [
  {
    id: 1,
    projectName: "Project Alpha",
    taskName: "Design Phase",
    deadline: "2024-11-20",
    status: "In Progress",
    startDate: "2024-10-01",
    endDate: "2024-12-15",
  },
  {
    id: 2,
    projectName: "Project Beta",
    taskName: "Development Phase",
    deadline: "2024-12-01",
    status: "Completed",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
  },
];

export const PRIVACY_POLICY = "lorem ipsum sit dolor amet";

// statuscode=0->Project,
//statuscode = 1 -> Site,
//statuscode = 2 -> Completed ,
//statuscode = 3 -> Pending

export const PageData = [
  {
    description:
      "Streamline Your Projects with Sugs Lloyd – Efficiency at Its Best!",
  },

  {
    id: 1,
    text: "Manage & Track Projects Anytime, Anywhere!",
  },
  {
    id: 2,
    text: "Stay Updated – Receive Tasks & Progress Instantly!",
  },
  {
    id: 3,
    text: "Share Work Details with Real-Time Location & Visuals!",
  },
  {
    id: 4,
    text: "Keep a Sharp Eye on Your Stock Levels with Ease!",
  },
];
