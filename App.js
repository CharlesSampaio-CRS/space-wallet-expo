import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import History from './src/Pages/History/index'
import Home from './src/Pages/Home/index'
import Login from './src/Pages/Login'
import Register from './src/Pages/Register'

export const AuthContext = React.createContext()
const Drawer = createDrawerNavigator()

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken')
      } catch (e) {
        throw e
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
    
        try {
            console.log(data)
          const response = await axios.post('http://127.0.0.1:8000/public/login', data, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
    
          const access_token = response.data.access_token
          await AsyncStorage.setItem('access_token', access_token)
        } catch (error) {
          console.error(error);
        }

        dispatch({ type: 'SIGN_IN', token: access_token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
    
        try {
            console.log(data)
          const response = await axios.post('http://127.0.0.1:8000/public/register', data, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error(error);
        }
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {
            state.userToken ? (
              <>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Notifications" component={History} />
              </>
            ) : (
              <>
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Register" component={Register} />
              </>
            )
          }
          
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}