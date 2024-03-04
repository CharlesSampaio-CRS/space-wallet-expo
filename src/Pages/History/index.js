import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import axios from 'axios';

const Home = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/internal/balance/history', {
            params: {
              account: 20829,
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZXhwIjoxNzA5NTk2MjAzfQ.Mcm-q4fGK8ld1KTqUOPxRCsjFzPltIPWbhUBQhPxtHc'
            },
            headers: {
              'accept': 'application/json'
            },
          });
        setAccount(response.data.account);
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const contentInset = { top: 20, bottom: 20 };
  const data = balance.map((item) => item.amount);
  const labels = balance.map((item) => item.updated);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saldo da Conta {account}</Text>
        <Text style={styles.subtitle}></Text>
      </View>
      <View style={styles.chartContainer}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `R$${value.toFixed(2)}`}
        />
        <View style={styles.chartBody}>
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={data}
            contentInset={contentInset}
            svg={{ stroke: '#007AFF' }}
            curve={shape.curveNatural}
          >
            <Grid svg={{ strokeOpacity: 0.4, strokeDasharray: '5, 5' }} />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: 18 }}
            data={data}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 250,
    padding: 16,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
  },
  chartBody: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;