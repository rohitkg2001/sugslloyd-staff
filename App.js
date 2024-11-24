import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
