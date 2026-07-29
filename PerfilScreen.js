import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.contenedorSeguro}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera / Banner */}
        <View style={[styles.bannerSuperior, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
          <Text style={styles.textoInsignia}>PERFIL</Text>
        </View>

        {/* Tarjeta Simplificada de Perfil */}
        <View style={styles.tarjetaPerfil}>
          <View style={styles.contenedorFoto}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/7b/b2/7b/7bb27b0bf3e0de884be1b2f29da218bb.jpg',
              }}
              style={styles.fotoPerfil}
            />
          </View>

          {/* Nombre */}
          <Text style={styles.nombreUsuario}>Juan Torres</Text>

          {/* Correo */}
          <View style={styles.contenedorCorreo}>
            <Text style={styles.labelCorreo}>Correo electrónico:</Text>
            <Text style={styles.valorCorreo}>juan.torres@soy.sena.edu.co</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorSeguro: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bannerSuperior: {
    backgroundColor: '#0F172A',
    height: 120,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textoInsignia: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tarjetaPerfil: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -45,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contenedorFoto: {
    marginBottom: 16,
  },
  fotoPerfil: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#2563EB',
  },
  nombreUsuario: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  contenedorCorreo: {
    backgroundColor: '#F1F5F9',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  labelCorreo: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  valorCorreo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
});
