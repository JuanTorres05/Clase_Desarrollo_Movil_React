import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const [likesCount, setLikesCount] = useState(48);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiado, setCopiado] = useState(null);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  const handleCopiar = (tipo, valor) => {
    setCopiado(tipo);
    Alert.alert('Copiado', `El ${tipo} (${valor}) fue seleccionado.`);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <SafeAreaView style={styles.contenedorSeguro}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Cabecera Superior */}
        <View style={[styles.bannerSuperior, { paddingTop: insets.top > 0 ? insets.top + 8 : 16, height: 140 + (insets.top > 0 ? insets.top : 0) }]}>
          <View style={styles.insigniaBanner}>
            <Text style={styles.textoInsignia}>PERFIL PROFESIONAL • SENA ADSO</Text>
          </View>
        </View>

        {/* Tarjeta Principal de Usuario */}
        <View style={styles.tarjetaPrincipal}>
          {/* Avatar con Indicador de Estado Online */}
          <View style={styles.contenedorFoto}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/7b/b2/7b/7bb27b0bf3e0de884be1b2f29da218bb.jpg',
              }}
              style={styles.fotoPerfil}
            />
            <View style={styles.indicadorEstado} />
          </View>

          {/* Nombre y Cargo */}
          <Text style={styles.nombreUsuario}>Juan Torres</Text>
          <View style={styles.badgeCargo}>
            <Text style={styles.textoCargo}>⚡ Desarrollador Full-Stack Mobile</Text>
          </View>
          <Text style={styles.ubicacion}>📍 Bogotá, Colombia • SENA ADSO</Text>

          {/* Botón de Like / Recomendación interactiva */}
          <TouchableOpacity
            style={[styles.botonRecomendar, hasLiked && styles.botonRecomendarActivo]}
            activeOpacity={0.8}
            onPress={handleLike}
          >
            <Text style={[styles.textoRecomendar, hasLiked && styles.textoRecomendarActivo]}>
              {hasLiked ? '❤️ Recomendado' : '🤍 Recomendar Perfil'} ({likesCount})
            </Text>
          </TouchableOpacity>

          {/* Barra de Estadísticas */}
          <View style={styles.contenedorEstadisticas}>
            <View style={styles.itemEstadistica}>
              <Text style={styles.valorEstadistica}>14</Text>
              <Text style={styles.labelEstadistica}>Proyectos</Text>
            </View>
            <View style={styles.divisorEstadistica} />
            <View style={styles.itemEstadistica}>
              <Text style={styles.valorEstadistica}>4.9 ⭐</Text>
              <Text style={styles.labelEstadistica}>Promedio</Text>
            </View>
            <View style={styles.divisorEstadistica} />
            <View style={styles.itemEstadistica}>
              <Text style={styles.valorEstadistica}>350+</Text>
              <Text style={styles.labelEstadistica}>Commits</Text>
            </View>
          </View>
        </View>

        {/* Sección: Información de Contacto */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>INFORMACIÓN DE CONTACTO</Text>

          <View style={styles.tarjetaInfo}>
            <TouchableOpacity
              style={styles.filaContacto}
              activeOpacity={0.7}
              onPress={() => handleCopiar('Correo', 'juan.torres@soy.sena.edu.co')}
            >
              <View style={styles.iconoContenedor}>
                <Text style={styles.iconoEmoji}>📧</Text>
              </View>
              <View style={styles.textosContacto}>
                <Text style={styles.labelContacto}>Correo Electrónico</Text>
                <Text style={styles.valorContacto}>juan.torres@soy.sena.edu.co</Text>
              </View>
              {copiado === 'Correo' && <Text style={styles.badgeCopiado}>Copiado</Text>}
            </TouchableOpacity>

            <View style={styles.lineaSeparadora} />

            <TouchableOpacity
              style={styles.filaContacto}
              activeOpacity={0.7}
              onPress={() => handleCopiar('Teléfono', '+57 300 987 6543')}
            >
              <View style={styles.iconoContenedor}>
                <Text style={styles.iconoEmoji}>📱</Text>
              </View>
              <View style={styles.textosContacto}>
                <Text style={styles.labelContacto}>Teléfono / WhatsApp</Text>
                <Text style={styles.valorContacto}>+57 300 987 6543</Text>
              </View>
              {copiado === 'Teléfono' && <Text style={styles.badgeCopiado}>Copiado</Text>}
            </TouchableOpacity>

            <View style={styles.lineaSeparadora} />

            <View style={styles.filaContacto}>
              <View style={styles.iconoContenedor}>
                <Text style={styles.iconoEmoji}>🎓</Text>
              </View>
              <View style={styles.textosContacto}>
                <Text style={styles.labelContacto}>Formación Académica</Text>
                <Text style={styles.valorContacto}>SENA - Tecnólogo en ADSO</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sección: Habilidades Técnicas Categorizadas */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>HABILIDADES TÉCNICAS</Text>

          <View style={styles.grupoHabilidades}>
            <Text style={styles.subtituloHabilidades}>📱 Desarrollo Móvil</Text>
            <View style={styles.contenedorHabilidades}>
              <View style={styles.chipHabilidadDestacada}>
                <Text style={styles.textoChipDestacado}>React Native</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>Expo CLI</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>Expo Router</Text>
              </View>
            </View>
          </View>

          <View style={styles.grupoHabilidades}>
            <Text style={styles.subtituloHabilidades}>🌐 Web & Frontend</Text>
            <View style={styles.contenedorHabilidades}>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>JavaScript (ES6+)</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>TypeScript</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>HTML5 & CSS3</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>Next.js</Text>
              </View>
            </View>
          </View>

          <View style={styles.grupoHabilidades}>
            <Text style={styles.subtituloHabilidades}>⚙️ Backend & Herramientas</Text>
            <View style={styles.contenedorHabilidades}>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>Node.js</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>Git & GitHub</Text>
              </View>
              <View style={styles.chipHabilidad}>
                <Text style={styles.textoChip}>REST APIs</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Botones de Acción */}
        <View style={styles.contenedorBotones}>
          <TouchableOpacity
            style={styles.botonPrimario}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert('Editar Perfil', 'Modo de edición activado para Juan Torres.')
            }
          >
            <Text style={styles.textoBotonPrimario}>✏️ Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSecundario}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert(
                'Compartir',
                'Hoja de Vida y Perfil copiado al portapapeles con éxito.'
              )
            }
          >
            <Text style={styles.textoBotonSecundario}>📤 Compartir Hoja de Vida</Text>
          </TouchableOpacity>
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
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  insigniaBanner: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  textoInsignia: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tarjetaPrincipal: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contenedorFoto: {
    position: 'relative',
    marginTop: -12,
    marginBottom: 12,
  },
  fotoPerfil: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  indicadorEstado: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  nombreUsuario: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  badgeCargo: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 4,
  },
  textoCargo: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  ubicacion: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 14,
  },
  botonRecomendar: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  botonRecomendarActivo: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  textoRecomendar: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  textoRecomendarActivo: {
    color: '#EF4444',
  },
  contenedorEstadisticas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemEstadistica: {
    alignItems: 'center',
    flex: 1,
  },
  valorEstadistica: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  labelEstadistica: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  divisorEstadistica: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  seccion: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  tituloSeccion: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  tarjetaInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  filaContacto: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  iconoContenedor: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconoEmoji: {
    fontSize: 20,
  },
  textosContacto: {
    flex: 1,
  },
  labelContacto: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  valorContacto: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    marginTop: 1,
  },
  badgeCopiado: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '700',
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  lineaSeparadora: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  grupoHabilidades: {
    marginBottom: 12,
  },
  subtituloHabilidades: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    marginLeft: 2,
  },
  contenedorHabilidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipHabilidadDestacada: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoChipDestacado: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  chipHabilidad: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoChip: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  contenedorBotones: {
    marginHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  botonPrimario: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  textoBotonPrimario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  botonSecundario: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  textoBotonSecundario: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
});
