import * as Network from 'expo-network';

export const isOnline = async (): Promise<boolean> => {
  const status = await Network.getNetworkStateAsync();
  
  return (status.isConnected && status.isInternetReachable) === true ?? false;
};