import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.contenedorSeguro}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera */}
        <View style={[styles.cabecera, { paddingTop: insets.top > 0 ? insets.top + 16 : 24 }]}>
          <Text style={styles.tituloCabecera}>Explorar</Text>
          <Text style={styles.subtituloCabecera}>
            Sección de proyectos y detalles.
          </Text>
        </View>

        {/* Lista Estática de Detalles / Proyectos */}
        <View style={styles.seccion}>
          <View style={styles.tarjetaSimple}>
            <Text style={styles.tituloTarjeta}>🌱 AgroSena Connect</Text>
            <Text style={styles.descripcionTarjeta}>
              Aplicación móvil para la gestión agrícola.
            </Text>
          </View>

          <View style={styles.tarjetaSimple}>
            <Text style={styles.tituloTarjeta}>📦 ADSO Inventory QR</Text>
            <Text style={styles.descripcionTarjeta}>
              Control de inventario mediante escaneo de código QR.
            </Text>
          </View>

          <View style={styles.tarjetaSimple}>
            <Text style={styles.tituloTarjeta}>🎓 EduSena Hub</Text>
            <Text style={styles.descripcionTarjeta}>
              Portal de aprendizaje interactivo para estudiantes.
            </Text>
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
  cabecera: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tituloCabecera: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtituloCabecera: {
    fontSize: 14,
    color: '#94A3B8',
  },
  seccion: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  tarjetaSimple: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tituloTarjeta: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  descripcionTarjeta: {
    fontSize: 13,
    color: '#64748B',
  },
});
