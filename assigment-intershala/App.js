import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const UserScreen = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        'https://random-data-api.com/api/users/random_user?size=80'
      );
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  const user = userData[index];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      <Text style={styles.username}>@{user.username}</Text>

      <View style={styles.detailsContainer}>
        {renderDetail("ID", user.id)}
        {renderDetail("UID", user.uid)}
        {renderDetail("Email", user.email)}
        {renderDetail("Password", user.password)}
        {renderDetail("Gender", user.gender)}
        {renderDetail("Phone", user.phone_number)}
        {renderDetail("Date of Birth", user.date_of_birth)}
        {renderDetail("Employment", `${user.employment.title} (${user.employment.key_skill})`)}
        {renderDetail("Address", `${user.address.city}, ${user.address.state}, ${user.address.country}`)}
        {renderDetail("Credit Card", user.credit_card.cc_number)}
        {renderDetail("Subscription", `${user.subscription.plan}, ${user.subscription.status}, ${user.subscription.payment_method}, ${user.subscription.term}`)}
      </View>

      <View style={styles.buttonContainer}>
        {index > 0 && (
          <TouchableOpacity style={styles.button} onPress={() => setIndex(index - 1)}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {index < userData.length - 1 && (
          <TouchableOpacity style={styles.button} onPress={() => setIndex(index + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const renderDetail = (label, value) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.detail}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6200ea',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  detail: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
