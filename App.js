import WelcomeScreen from "./screens/Welcome";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";
import Plan from "./screens/Plan";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import '@ionic/react/css/core.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MyHealth"
          component={WelcomeScreen}
          options={{headerTitleAlign: 'center'}}
        />
        <Stack.Screen 
          name="Register"
          component={SignUp}
          options={{headerTitleAlign: 'center'}}
        />
        <Stack.Screen 
          name="Home"
          component={Home}
          headerleft={null}
          options={{headerLeft: null, headerTitleAlign: 'center'}}
        />
        <Stack.Screen 
          name="Diet Plan"
          component={Plan}
          headerleft={null}
          options={{headerLeft: null, headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
