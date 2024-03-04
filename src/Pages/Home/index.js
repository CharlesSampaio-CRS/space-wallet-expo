import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => { // Removi o async da arrow function
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await AsyncStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/internal/balance', {
          params: {
            account: 20829,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZXhwIjoxNzA5NTk2MjAzfQ.Mcm-q4fGK8ld1KTqUOPxRCsjFzPltIPWbhUBQhPxtHc'
          },
          headers: {
            'accept': 'application/json',
            'Authorization': `${access_token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {!data ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.amount}>{data.amount}</Text>
          <Text style={styles.currency}>{data.currency}</Text>
          {data.datetime.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.exchange}>{item.exchange}</Text>
              <Text style={styles.total}>{item.total}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  symbol: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 16,
  },
  exchange: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'right',
  },
});

export default Home;