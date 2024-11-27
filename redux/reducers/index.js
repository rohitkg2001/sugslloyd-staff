import { taskReducer } from "./taskReducer";
import { siteReducer } from "./siteReducer";
import { staffReducer } from "./staffReducer";
import { projectReducer } from "./projectrReducer";
import { inventoryReducer } from "./inventoryReducer";
import { vendorReducer } from "./vendorReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
    tasks: taskReducer,
    staff: staffReducer,
    site: siteReducer,
    project: projectReducer,
    vendor: vendorReducer,
    inventory: inventoryReducer,
});

export default reducer;