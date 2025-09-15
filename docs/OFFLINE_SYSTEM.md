# Offline System Documentation

A comprehensive offline detection and management system for the WorqBox Expo application.

## Features

- **Real-time Network Detection**: Monitors network connectivity and internet reachability
- **Offline Data Caching**: Uses Expo Secure Store for offline data management
- **Visual Indicators**: Multiple UI components to inform users about offline status
- **Context-based Management**: React Context for global network state
- **Automatic Retry**: Built-in retry functionality for network operations

## Components

### 1. useNetworkStatus Hook

Basic network detection hook using `@react-native-community/netinfo`:

```tsx
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const MyComponent = () => {
  const { isOnline, isOffline, type, isLoading } = useNetworkStatus();
  
  return (
    <Text>Status: {isOnline ? 'Online' : 'Offline'}</Text>
  );
};
```

### 2. NetworkProvider Context

Global network state management with offline data capabilities:

```tsx
import { useNetwork } from '../contexts/NetworkContext';

const MyComponent = () => {
  const { 
    isOnline, 
    retryConnection, 
    getOfflineData, 
    setOfflineData 
  } = useNetwork();
  
  // Save data for offline use
  await setOfflineData('my_key', data);
  
  // Retrieve offline data
  const cachedData = await getOfflineData('my_key');
};
```

### 3. UI Components

#### OfflineNotification
Sliding notification that appears when offline:

```tsx
import { OfflineNotification } from '../components/ui/OfflineNotification';

<OfflineNotification 
  position="top" 
  message="You are offline"
/>
```

#### NetworkStatusBanner
Full-width banner with retry functionality:

```tsx
import { NetworkStatusBanner } from '../components/ui/NetworkStatusBanner';

<NetworkStatusBanner 
  onRetry={() => retryConnection()}
  showConnectionType={true}
/>
```

#### GlobalOfflineIndicator
Global indicator that can be placed at app level:

```tsx
import { GlobalOfflineIndicator } from '../components/ui/GlobalOfflineIndicator';

<GlobalOfflineIndicator 
  variant="notification" 
  position="top"
  showRetryButton={true}
/>
```

## Integration

### App-Level Integration

The system is already integrated into `_layout.tsx`:

```tsx
<NetworkProvider>
  <ACLProvider>
    <ThemeProvider>
      {/* Your app content */}
      <GlobalOfflineIndicator variant="notification" position="top" />
    </ThemeProvider>
  </ACLProvider>
</NetworkProvider>
```

### API Integration

Integrate with your API calls for automatic offline handling:

```tsx
const fetchData = async () => {
  const { isOnline, getOfflineData, setOfflineData } = useNetwork();
  
  if (isOnline) {
    try {
      const response = await api.getData();
      // Cache successful response
      await setOfflineData('api_data', response);
      return response;
    } catch (error) {
      // Fallback to cached data on error
      return await getOfflineData('api_data');
    }
  } else {
    // Use cached data when offline
    return await getOfflineData('api_data');
  }
};
```

## Configuration

### Network Status Properties

```typescript
interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
  isWifiEnabled: boolean | null;
  isOnline: boolean;
  isOffline: boolean;
  isLoading: boolean;
}
```

### Offline Data Methods

```typescript
interface NetworkContextType {
  // Network status
  isOnline: boolean;
  isOffline: boolean;
  
  // Offline data management
  getOfflineData: <T>(key: string) => Promise<T | null>;
  setOfflineData: <T>(key: string, data: T) => Promise<void>;
  clearOfflineData: (key: string) => Promise<void>;
  
  // Connection retry
  retryConnection: () => void;
}
```

## Best Practices

### 1. Cache Critical Data

Always cache essential data when online:

```tsx
// Cache user profile
await setOfflineData('user_profile', userProfile);

// Cache dashboard data
await setOfflineData('dashboard_data', dashboardData);
```

### 2. Graceful Degradation

Provide offline alternatives for online-only features:

```tsx
{isOnline ? (
  <SyncButton onPress={syncData} />
) : (
  <Text>Sync available when online</Text>
)}
```

### 3. User Feedback

Always inform users about offline status:

```tsx
{isOffline && (
  <Banner message="You're offline. Some features may not work." />
)}
```

### 4. Retry Mechanisms

Implement retry logic for failed operations:

```tsx
const handleRetry = () => {
  if (isOnline) {
    // Retry failed operations
    retryFailedRequests();
  }
};
```

## Customization

### Custom Offline Messages

```tsx
<OfflineNotification 
  message="No internet connection. Check your network settings."
  position="bottom"
/>
```

### Custom Styling

```tsx
<NetworkStatusBanner 
  onRetry={handleRetry}
  showConnectionType={true}
  // Custom styling can be added via props or theme
/>
```

### Conditional Rendering

```tsx
<Permission permission="sync.data">
  {isOnline ? (
    <SyncDataButton />
  ) : (
    <OfflineModeIndicator />
  )}
</Permission>
```

## Testing

### Simulate Offline Mode

1. **iOS Simulator**: Device > Network Link Conditioner > 100% Loss
2. **Android Emulator**: Extended Controls > Cellular > Data Status: Denied
3. **Physical Device**: Turn off WiFi and mobile data

### Test Scenarios

- App launch while offline
- Network loss during app usage
- Network restoration after being offline
- Offline data persistence across app restarts
- API failures and fallbacks

## Troubleshooting

### Common Issues

1. **Network detection not working**: Ensure `@react-native-community/netinfo` is properly installed
2. **Offline data not persisting**: Check Expo Secure Store permissions
3. **UI not updating**: Verify NetworkProvider is at the correct level in component tree

### Debug Mode

Enable network logging for debugging:

```tsx
const { isOnline, type } = useNetworkStatus();
console.log('Network Status:', { isOnline, type });
```

## Dependencies

- `@react-native-community/netinfo`: Network detection
- `expo-secure-store`: Offline data storage (already included)
- React Context API: State management
- React Native Animated: UI animations
