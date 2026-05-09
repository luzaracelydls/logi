import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, hasMissingFirebaseConfig } from './src/firebase';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hasMissingFirebaseConfig) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  const handleLogout = async () => {
    setError('');
    try {
      await signOut(auth);
    } catch (logoutError) {
      setError(logoutError.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (hasMissingFirebaseConfig) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Firebase setup required</Text>
        <Text style={styles.message}>
          Add your EXPO_PUBLIC_FIREBASE_* values to a local environment file.
        </Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.message}>{user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Firebase Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: '#b91c1c',
    fontSize: 12,
  },
});
