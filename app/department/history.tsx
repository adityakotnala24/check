import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSession } from '@/providers/auth/SessionProvider';
import { URLs, horizontalScale, moderateScale } from '@/utils';
import { ThemedText } from '@/components/ThemedText';

const History = () => {
  const { session }: { session?: string | null; } = useSession();
  const { token } = JSON.parse(session || '{}');
  const [reports, setReports] = useState<{ groundwater: any[]; spring: any[]; watershed: any[] }>({ groundwater: [], spring: [], watershed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URLs.baseUrl}history.php?auth_token=${token}`);        
        const data = await response.json();
        
        setReports(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderTable = (title: string, data: any[]) => (
    <>
      <Text style={styles.tableTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <ThemedText style={styles.tblText}>{item.groundwater_name || item.watershed_name || item.spring_name}</ThemedText>
          <ThemedText style={styles.tblText}>{item.mobile_number}</ThemedText>
          <ThemedText style={styles.tblText}>{item.created_at}</ThemedText>
        </View>
      ))}
    </>
  );

  return (
    <ScrollView style={styles.container}>
      {renderTable('Groundwater Recharge Reports', reports.groundwater)}
      {renderTable('Spring Rejuvination Reports', reports.spring)}
      {renderTable('Stream Treatment / Rejuvation Reports', reports.watershed)}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    gap: horizontalScale(20)
  },
  tblText: {
    fontSize: moderateScale(12)
  }
});
