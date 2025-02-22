import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function JourneyLogScreen() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    origin: '',
    destination: '',
    startKm: '',
    endKm: '',
    observations: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentEntry(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEntry = () => {
    const { origin, destination, startKm, endKm } = currentEntry;
    if (!origin || !destination || !startKm || !endKm) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    if (parseFloat(endKm) <= parseFloat(startKm)) {
      Alert.alert('Erro', 'Quilometragem final deve ser maior que a inicial');
      return false;
    }
    return true;
  };

  const addEntry = () => {
    if (!validateEntry()) return;

    const newEntry = {
      ...currentEntry,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      totalKm: (parseFloat(currentEntry.endKm) - parseFloat(currentEntry.startKm)).toFixed(1)
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry({
      origin: '',
      destination: '',
      startKm: '',
      endKm: '',
      observations: ''
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Origem *</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.origin}
            onChangeText={(text) => handleInputChange('origin', text)}
            placeholder="Local de origem"
          />

          <Text style={styles.label}>Destino *</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.destination}
            onChangeText={(text) => handleInputChange('destination', text)}
            placeholder="Local de destino"
          />

          <Text style={styles.label}>Km Inicial *</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.startKm}
            onChangeText={(text) => handleInputChange('startKm', text)}
            placeholder="0"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Km Final *</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.endKm}
            onChangeText={(text) => handleInputChange('endKm', text)}
            placeholder="0"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentEntry.observations}
            onChangeText={(text) => handleInputChange('observations', text)}
            placeholder="Observações adicionais"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.addButton} onPress={addEntry}>
            <Text style={styles.addButtonText}>Registrar Viagem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.entriesList}>
          <Text style={styles.entriesTitle}>Registros</Text>
          {entries.map((entry) => (
            <View key={entry.id} style={styles.entryItem}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <View style={styles.entryRow}>
                <Text style={styles.entryLabel}>Origem:</Text>
                <Text style={styles.entryText}>{entry.origin}</Text>
              </View>
              <View style={styles.entryRow}>
                <Text style={styles.entryLabel}>Destino:</Text>
                <Text style={styles.entryText}>{entry.destination}</Text>
              </View>
              <View style={styles.entryRow}>
                <Text style={styles.entryLabel}>Distância:</Text>
                <Text style={styles.entryText}>{entry.totalKm} km</Text>
              </View>
              {entry.observations ? (
                <View style={styles.entryRow}>
                  <Text style={styles.entryLabel}>Obs:</Text>
                  <Text style={styles.entryText}>{entry.observations}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entriesList: {
    padding: 16,
  },
  entriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  entryItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  entryDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  entryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  entryText: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
});