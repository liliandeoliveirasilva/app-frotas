import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

export default function ChecklistScreen() {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Nível de Óleo', checked: false },
    { id: 2, title: 'Nível de Água', checked: false },
    { id: 3, title: 'Pressão dos Pneus', checked: false },
    { id: 4, title: 'Freios', checked: false },
    { id: 5, title: 'Luzes', checked: false },
    { id: 6, title: 'Limpeza do Veículo', checked: false },
    { id: 7, title: 'Documentação', checked: false },
    { id: 8, title: 'Kit de Emergência', checked: false },
    { id: 9, title: 'Cinto de Segurança', checked: false },
    { id: 10, title: 'Retrovisores', checked: false },
  ]);

  const toggleItem = (id) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const calculateProgress = () => {
    const checkedItems = checklistItems.filter(item => item.checked).length;
    return (checkedItems / checklistItems.length) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progresso: {Math.round(calculateProgress())}%
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${calculateProgress()}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {checklistItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.checklistItem}
            onPress={() => toggleItem(item.id)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
            <Switch
              value={item.checked}
              onValueChange={() => toggleItem(item.id)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={item.checked ? '#2196F3' : '#f4f3f4'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.submitButton, 
          calculateProgress() === 100 ? styles.submitButtonEnabled : styles.submitButtonDisabled
        ]}
        disabled={calculateProgress() !== 100}
      >
        <Text style={styles.submitButtonText}>Finalizar Checklist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonEnabled: {
    backgroundColor: '#2196F3',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
