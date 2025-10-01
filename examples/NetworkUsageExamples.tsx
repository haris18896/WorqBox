import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalOfflineIndicator } from "../components/ui/OfflineIndicators/GlobalOfflineIndicator";
import { NetworkStatusBanner } from "../components/ui/OfflineIndicators/NetworkStatusBanner";
import { OfflineNotification } from "../components/ui/OfflineIndicators/OfflineNotification";
import { useNetwork } from "../contexts/NetworkContext";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

// Example 1: Basic Network Status Display
const NetworkStatusDisplay = () => {
  const { isOnline, isOffline, type, isLoading } = useNetworkStatus();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Network Status</Text>
      <Text style={styles.info}>
        Status: {isLoading ? "Loading..." : isOnline ? "Online" : "Offline"}
      </Text>
      <Text style={styles.info}>Connection Type: {type || "Unknown"}</Text>
      <View
        style={[
          styles.indicator,
          { backgroundColor: isOnline ? "#4CAF50" : "#F44336" },
        ]}
      />
    </View>
  );
};

// Example 2: Using Network Context for Offline Data
const OfflineDataExample = () => {
  const { isOnline, getOfflineData, setOfflineData } = useNetwork();
  const [cachedData, setCachedData] = useState<string | null>(null);

  const saveDataOffline = async () => {
    const data = `Cached at ${new Date().toLocaleTimeString()}`;
    await setOfflineData("example_data", data);
    Alert.alert("Success", "Data saved for offline use");
  };

  const loadOfflineData = async () => {
    const data = await getOfflineData<string>("example_data");
    setCachedData(data);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Offline Data Management</Text>
      <Text style={styles.info}>
        Network: {isOnline ? "Online" : "Offline"}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Save Data Offline" onPress={saveDataOffline} />
        <Button title="Load Offline Data" onPress={loadOfflineData} />
      </View>

      {cachedData && (
        <Text style={styles.cachedData}>Cached: {cachedData}</Text>
      )}
    </View>
  );
};

// Example 3: Different Offline Indicators
const OfflineIndicatorExamples = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Offline Indicators</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={showBanner ? "Hide Banner" : "Show Banner"}
          onPress={() => setShowBanner(!showBanner)}
        />
        <Button
          title={showNotification ? "Hide Notification" : "Show Notification"}
          onPress={() => setShowNotification(!showNotification)}
        />
      </View>

      {showBanner && (
        <NetworkStatusBanner
          onRetry={() => Alert.alert("Retry", "Checking connection...")}
          showConnectionType={true}
        />
      )}

      {showNotification && (
        <OfflineNotification
          showWhenOffline={true}
          position="top"
          message="Custom offline message"
        />
      )}
    </View>
  );
};

// Example 4: Conditional Rendering Based on Network Status
const ConditionalNetworkContent = () => {
  const { isOnline, isOffline } = useNetwork();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Conditional Content</Text>

      {isOnline && (
        <View style={styles.onlineContent}>
          <Text style={styles.onlineText}>✓ Online Features Available</Text>
          <Button
            title="Sync Data"
            onPress={() => Alert.alert("Syncing", "Data synchronized")}
          />
          <Button
            title="Upload Files"
            onPress={() => Alert.alert("Upload", "Files uploaded")}
          />
        </View>
      )}

      {isOffline && (
        <View style={styles.offlineContent}>
          <Text style={styles.offlineText}>⚠ Offline Mode</Text>
          <Text style={styles.info}>Some features are not available</Text>
          <Button
            title="View Cached Data"
            onPress={() => Alert.alert("Cache", "Showing cached data")}
          />
        </View>
      )}
    </View>
  );
};

// Example 5: API Call with Offline Handling
const OfflineApiExample = () => {
  const { isOnline, setOfflineData, getOfflineData } = useNetwork();
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    if (isOnline) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const apiData = `API Data: ${new Date().toLocaleTimeString()}`;
        setData(apiData);

        // Cache for offline use
        await setOfflineData("api_data", apiData);

        Alert.alert("Success", "Data fetched and cached");
      } catch (error) {
        Alert.alert("Error", "Failed to fetch data");
      }
    } else {
      // Load from offline cache
      const cachedData = await getOfflineData<string>("api_data");
      if (cachedData) {
        setData(cachedData + " (Cached)");
        Alert.alert("Offline", "Showing cached data");
      } else {
        Alert.alert("No Data", "No cached data available");
      }
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>API with Offline Support</Text>

      <Button
        title={isLoading ? "Loading..." : "Fetch Data"}
        onPress={fetchData}
        disabled={isLoading}
      />

      {data && <Text style={styles.apiData}>{data}</Text>}

      <Text style={styles.info}>
        Status: {isOnline ? "Will fetch from API" : "Will use cached data"}
      </Text>
    </View>
  );
};

// Main Example Component
export const NetworkUsageExamples = () => (
  <View style={styles.container}>
    <GlobalOfflineIndicator variant="notification" position="top" />

    <ScrollView style={styles.scrollView}>
      <Text style={styles.header}>Network Status Examples</Text>

      <NetworkStatusDisplay />
      <OfflineDataExample />
      <OfflineIndicatorExamples />
      <ConditionalNetworkContent />
      <OfflineApiExample />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  cachedData: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  onlineContent: {
    padding: 12,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  onlineText: {
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 8,
  },
  offlineContent: {
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  offlineText: {
    color: "#FF9800",
    fontWeight: "600",
    marginBottom: 8,
  },
  apiData: {
    fontSize: 12,
    color: "#333",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#e3f2fd",
    borderRadius: 4,
    fontFamily: "monospace",
  },
});
