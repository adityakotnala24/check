import { Stack } from "expo-router";

const NavigationController = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerTitle: "Bhagirath"
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          headerTitle: "Report Water Source",
        }}
        name="report-source"
      />
      <Stack.Screen
        options={{
          headerTitle: "No Location Access",
        }}
        name="no-location"
      />
      <Stack.Screen
        options={{
          headerTitle: "Offline Data",
        }}
        name="offline-data"
      />
      <Stack.Screen
        options={{
          headerTitle: "Department Signup",
        }}
        name="department/signup"
      />
      <Stack.Screen
        options={{
          headerTitle: "Department login",
        }}
        name="department/login"
      />
      <Stack.Screen
        options={{
          headerTitle: "Department Dashboard",
          headerBackVisible: false
        }}
        name="department/dashboard"
      />
      <Stack.Screen
        options={{
          headerTitle: "Springs | Department",
          headerBackVisible: true
        }}
        name="department/springs"
      />
      <Stack.Screen
        options={{
          headerTitle: "Streamshed | Department",
          headerBackVisible: true
        }}
        name="department/streamshed"
      />
      <Stack.Screen
        options={{
          headerTitle: "Ground Water | Department",
          headerBackVisible: true
        }}
        name="department/groundwater"
      />
      <Stack.Screen
        options={{
          headerTitle: "History | Department",
          headerBackVisible: true
        }}
        name="department/history"
      />
    </Stack>
  );
};

export default NavigationController;