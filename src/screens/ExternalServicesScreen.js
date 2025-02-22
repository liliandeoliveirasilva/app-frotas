import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function ExternalServicesScreen() {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState({
    serviceType: '',
    provider: '',
    cost: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setCurrentService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateService = () => {
    const { serviceType, provider, cost } = currentService;
    if (!serviceType || !provider || !cost) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    if (isNaN(parseFloat(cost)) || parseFloat(cost) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return false;
    }
    return true;
  };

  const addService = () => {
    if (!validateService()) return;

    const newService = {
      ...currentService,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      cost: parseFloat(currentService.cost)
    };

    setServices([newService, ...services]);
    setCurrentService({
      serviceType: '',
      provider: '',
      cost: '',
      description: ''
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Tipo de Serviço *</Text>
          <TextInput
            style={styles.input}
            value={currentService.serviceType}
            onChangeText={(text) => handleInputChange('serviceType', text)}
            placeholder="Ex: Troca de óleo, Revisão, etc."
          />

          <Text style={styles.label}>Prestador de Serviço *</Text>
          <TextInput
            style={styles.input}
            value={currentService.provider}
            onChangeText={(text) => handleInputChange('provider', text)}
            placeholder="Nome da oficina ou prestador"
          />

          <Text style={styles.label}>Custo (R$) *</Text>
          <TextInput
            style={styles.input}
            value={currentService.cost}
            onChangeText={(text) => handleInputChange('cost', text)}
            placeholder="0,00"
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentService.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Detalhes do serviço realizado"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.addButton} onPress={addService}>
            <Text style={styles.addButtonText}>Registrar Serviço</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesList}>
          <Text style={styles.servicesTitle}>Serviços Registrados</Text>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceItem}>
              <Text style={styles.serviceDate}>{service.date}</Text>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Tipo:</Text>
                <Text style={styles.serviceText}>{service.serviceType}</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Prestador:</Text>
                <Text style={styles.serviceText}>{service.provider}</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Custo:</Text>
                <Text style={styles.serviceCost}>R$ {service.cost.toFixed(2)}</Text>
              </View>
              {service.description ? (
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Descrição:</Text>
                  <Text style={styles.serviceText}>{service.description}</Text>
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
  servicesList: {
    padding: 16,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  serviceItem: {
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
  serviceDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  serviceLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  serviceText: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  serviceCost: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});