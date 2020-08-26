import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default () => {

  const [orderStatus, setOrderStatus] = useState('feito');

  useEffect(() => {
    // Pedindo Permissão de notificação
    const requestNotifPermission = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Permissão', authStatus);
    }
    requestNotifPermission();

    // Recebendo notificação foreground (app aberto)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Recebido no foreground', remoteMessage);

      if(remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.orderTitle}>Pedido #1234</Text>
      <Text>Status:</Text>
      <Text style={styles.orderStatusText}>
        {orderStatus == 'feito' && 'Seu pedido foi feito'}
        {orderStatus == 'aceito' && 'Seu pedido está sendo preparado'}
        {orderStatus == 'enviado' && 'Seu pedido saiu para entrega'}
        {orderStatus == 'entregue' && 'Seu pedido foi entregue com sucesso'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  orderStatusText: {
    fontSize: 17,
  },
});