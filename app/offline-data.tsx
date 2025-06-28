import React, { useEffect, useState } from 'react';
import { uploadFormToServer } from '../utils/uploadFormData';
import { getPendingForms, deleteForm } from '../components/database/database';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';

interface OfflineFormItem {
  id: number;
  formData: string;
}

const OfflineFormsScreen = () => {
  const [offlineForms, setOfflineForms] = useState<OfflineFormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchOfflineForms();
  }, []);

  const fetchOfflineForms = async () => {
    try {
      setLoading(true);
      const forms = await getPendingForms();
      console.log('====================================');
      console.log(forms);
      console.log('====================================');
      setOfflineForms(forms as any);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryUpload = async (item: OfflineFormItem) => {
    setUploadingId(item.id);
    try {
      const data = JSON.parse(item.formData);
      const success = await uploadFormToServer(data);
      if (success) {
        await deleteForm(item.id);
        fetchOfflineForms();
        alert('Upload successful');
      } else {
        alert('Upload failed');
      }
    } catch (e) {
      console.error('Retry Upload Error:', e);
      alert('Upload error');
    } finally {
      setUploadingId(null);
    }
  };

  const renderItem = ({ item }: { item: OfflineFormItem; }) => {
    const data = JSON.parse(item.formData);
    return (
      <View style={styles.card}>
        <ScrollView horizontal>
          <View style={styles.table}>
            {Object.entries(data).map(([key, value]) => (
              <View style={styles.row} key={key}>
                <Text style={styles.cellKey}>{key}</Text>
                <Text style={styles.cellValue}>{value?.toString().slice(0, 50)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRetryUpload(item)}
          disabled={uploadingId === item.id}
        >
          <Text style={styles.buttonText}>
            {uploadingId === item.id ? 'Uploading...' : 'Retry Upload'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Offline Saved Forms</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : offlineForms.length === 0 ? (
        <Text style={styles.emptyText}>No offline forms found.</Text>
      ) : (
        <FlatList
          data={offlineForms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default OfflineFormsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  cellKey: {
    flex: 1,
    fontWeight: '600',
    color: '#444',
  },
  cellValue: {
    flex: 2,
    color: '#666',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 60,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
