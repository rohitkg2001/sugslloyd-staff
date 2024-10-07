import LoginScreen from '../screens/LoginScreen'
import ApplyLeaveForm from '../screens/ApplyLeaveForm'
import MyMaterialBottomNavigator from './MyMaterialBottomNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function MyStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='loginScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="homeScreen" component={MyMaterialBottomNavigator} />
            <Stack.Screen name="applyLeaveForm" component={ApplyLeaveForm} />
        </Stack.Navigator>
    )
}