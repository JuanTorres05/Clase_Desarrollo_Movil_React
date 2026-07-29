import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface Project {
  id: string;
  title: string;
  category: 'Mobile' | 'Web' | 'Backend' | 'UI/UX';
  description: string;
  tech: string[];
  status: 'Finalizado' | 'En Desarrollo' | 'En Producción';
  stars: number;
  icon: string;
  color: string;
}

const CATEGORIES = ['Todos', 'Mobile', 'Web', 'Backend', 'UI/UX'];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AgroSena Connect',
    category: 'Mobile',
    description: 'Aplicación móvil de comercio justo que conecta directamente a campesinos productores con compradores finales.',
    tech: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB'],
    status: 'En Producción',
    stars: 28,
    icon: '🌱',
    color: '#059669',
  },
  {
    id: '2',
    title: 'ADSO Inventory QR',
    category: 'Mobile',
    description: 'Sistema de control e inspección de equipos tecnológicos del SENA utilizando escaneo rápido de códigos QR.',
    tech: ['React Native', 'TypeScript', 'Expo Camera', 'Firebase'],
    status: 'Finalizado',
    stars: 19,
    icon: '📦',
    color: '#2563EB',
  },
  {
    id: '3',
    title: 'EduSena Learning Hub',
    category: 'Web',
    description: 'Plataforma educativa con micro-cursos interactivos, foros de discusión y cuestionarios para aprendices ADSO.',
    tech: ['Next.js', 'React', 'TailwindCSS', 'PostgreSQL'],
    status: 'Finalizado',
    stars: 42,
    icon: '🎓',
    color: '#7C3AED',
  },
  {
    id: '4',
    title: 'DevMetrics API Gateway',
    category: 'Backend',
    description: 'Microservicio backend para medir rendimiento de código, métricas de despliegue y telemetría de apps móviles.',
    tech: ['Node.js', 'TypeScript', 'Docker', 'Redis'],
    status: 'En Desarrollo',
    stars: 15,
    icon: '⚡',
    color: '#D97706',
  },
  {
    id: '5',
    title: 'SENA Design System UI',
    category: 'UI/UX',
    description: 'Librería de componentes UI reutilizables y guía de estilos accesible pensada para aplicaciones web y móviles SENA.',
    tech: ['Figma', 'React Native', 'Storybook'],
    status: 'En Producción',
    stars: 34,
    icon: '🎨',
    color: '#EC4899',
  },
];

const CERTIFICATIONS = [
  {
    id: 'c1',
    title: 'Tecnólogo en ADSO',
    issuer: 'SENA Colombia',
    year: '2026',
    icon: '📜',
  },
  {
    id: 'c2',
    title: 'React Native Mobile Specialist',
    issuer: 'Meta & Expo Certified',
    year: '2025',
    icon: '⚛️',
  },
  {
    id: 'c3',
    title: 'Scrum Developer Certified (SDC)',
    issuer: 'Scrum Study',
    year: '2025',
    icon: '🚀',
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'Todos' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleProjectPress = (project: Project) => {
    Alert.alert(
      `${project.icon} ${project.title}`,
      `Estado: ${project.status}\n\nCategoría: ${project.category}\n\nDescripción: ${project.description}\n\nTecnologías: ${project.tech.join(', ')}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: '⭐ Dar Estrella',
          onPress: () =>
            Alert.alert('¡Gracias!', `Has apoyado el proyecto ${project.title}.`),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.contenedorSeguro}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera Principal */}
        <View style={[styles.cabecera, { paddingTop: insets.top > 0 ? insets.top + 16 : 24 }]}>
          <View style={styles.badgeBanner}>
            <Text style={styles.textoBadgeBanner}>PORTAFOLIO & PROYECTOS</Text>
          </View>
          <Text style={styles.tituloCabecera}>Explorar Ecosistema ADSO</Text>
          <Text style={styles.subtituloCabecera}>
            Descubre los proyectos, arquitecturas y certificaciones desarrolladas durante la formación.
          </Text>

          {/* Buscador */}
          <View style={styles.contenedorBuscador}>
            <Text style={styles.iconoBuscador}>🔍</Text>
            <TextInput
              style={styles.inputBuscador}
              placeholder="Buscar proyectos, tecnologías..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.textoLimpiar}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categorías / Filtros */}
        <View style={styles.seccionFiltros}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollFiltros}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.chipFiltro,
                    isSelected && styles.chipFiltroActivo,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.textoChipFiltro,
                      isSelected && styles.textoChipFiltroActivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Lista de Proyectos */}
        <View style={styles.seccion}>
          <View style={styles.headerSeccion}>
            <Text style={styles.tituloSeccion}>PROYECTOS DESTACADOS</Text>
            <Text style={styles.conteoProyectos}>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'resultado' : 'resultados'}
            </Text>
          </View>

          {filteredProjects.length === 0 ? (
            <View style={styles.contenedorVacio}>
              <Text style={styles.emojiVacio}>🔎</Text>
              <Text style={styles.tituloVacio}>No se encontraron proyectos</Text>
              <Text style={styles.subtituloVacio}>
                Intenta buscar con otros términos o selecciona la categoría &quot;Todos&quot;.
              </Text>
            </View>
          ) : (
            filteredProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.tarjetaProyecto}
                activeOpacity={0.85}
                onPress={() => handleProjectPress(project)}
              >
                {/* Header de la tarjeta */}
                <View style={styles.headerTarjeta}>
                  <View style={styles.contenedorIconoProyecto}>
                    <Text style={styles.iconoProyecto}>{project.icon}</Text>
                  </View>
                  <View style={styles.infoTituloProyecto}>
                    <Text style={styles.nombreProyecto}>{project.title}</Text>
                    <View style={styles.badgeCategoria}>
                      <Text style={styles.textoCategoria}>{project.category}</Text>
                    </View>
                  </View>
                  <View style={styles.contenedorEstrellas}>
                    <Text style={styles.textoEstrellas}>⭐ {project.stars}</Text>
                  </View>
                </View>

                {/* Descripción */}
                <Text style={styles.descripcionProyecto} numberOfLines={2}>
                  {project.description}
                </Text>

                {/* Chips de Tecnologías */}
                <View style={styles.contenedorTech}>
                  {project.tech.map((t, idx) => (
                    <View key={idx} style={styles.chipTech}>
                      <Text style={styles.textoChipTech}>{t}</Text>
                    </View>
                  ))}
                </View>

                {/* Footer de la tarjeta */}
                <View style={styles.footerTarjeta}>
                  <View
                    style={[
                      styles.badgeEstado,
                      project.status === 'En Producción'
                        ? styles.estadoProd
                        : project.status === 'Finalizado'
                        ? styles.estadoFin
                        : styles.estadoDev,
                    ]}
                  >
                    <View style={styles.puntoEstado} />
                    <Text style={styles.textoEstado}>{project.status}</Text>
                  </View>

                  <Text style={styles.textoVerMas}>Ver detalles →</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Sección: Certificaciones & Logros */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>CERTIFICACIONES & LOGROS</Text>
          {CERTIFICATIONS.map((cert) => (
            <View key={cert.id} style={styles.tarjetaCertificado}>
              <View style={styles.iconoCertificado}>
                <Text style={{ fontSize: 24 }}>{cert.icon}</Text>
              </View>
              <View style={styles.textosCertificado}>
                <Text style={styles.tituloCertificado}>{cert.title}</Text>
                <Text style={styles.emisorCertificado}>
                  {cert.issuer} • {cert.year}
                </Text>
              </View>
              <View style={styles.badgeVerificado}>
                <Text style={styles.textoVerificado}>✓ Verificado</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Banner de Contacto Rapido */}
        <View style={styles.bannerContacto}>
          <Text style={styles.tituloBannerContacto}>💡 ¿Tienes una idea o proyecto?</Text>
          <Text style={styles.subtituloBannerContacto}>
            Trabajemos juntos para llevar tus aplicaciones móviles y web al siguiente nivel.
          </Text>
          <TouchableOpacity
            style={styles.botonContactoBanner}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert(
                'Contacto Directo',
                'Puedes comunicarte vía correo a: juan.torres@soy.sena.edu.co'
              )
            }
          >
            <Text style={styles.textoBotonContactoBanner}>✉️ Contactar Desarrollador</Text>
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
  // Cabecera Principal
  cabecera: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  badgeBanner: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 12,
  },
  textoBadgeBanner: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tituloCabecera: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtituloCabecera: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 20,
  },
  // Buscador
  contenedorBuscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconoBuscador: {
    fontSize: 16,
    marginRight: 10,
  },
  inputBuscador: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  textoLimpiar: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    padding: 4,
  },
  // Filtros
  seccionFiltros: {
    marginTop: 16,
  },
  scrollFiltros: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chipFiltro: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipFiltroActivo: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  textoChipFiltro: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  textoChipFiltroActivo: {
    color: '#FFFFFF',
  },
  // Secciones
  seccion: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  headerSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tituloSeccion: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginLeft: 2,
  },
  conteoProyectos: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  // Tarjetas de Proyecto
  tarjetaProyecto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  headerTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contenedorIconoProyecto: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconoProyecto: {
    fontSize: 22,
  },
  infoTituloProyecto: {
    flex: 1,
  },
  nombreProyecto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  badgeCategoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 2,
  },
  textoCategoria: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  contenedorEstrellas: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  textoEstrellas: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  descripcionProyecto: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  contenedorTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  chipTech: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  textoChipTech: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  footerTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  badgeEstado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
  },
  puntoEstado: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  estadoProd: {
    backgroundColor: '#D1FAE5',
  },
  estadoFin: {
    backgroundColor: '#DBEAFE',
  },
  estadoDev: {
    backgroundColor: '#FEF3C7',
  },
  textoEstado: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  textoVerMas: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  // Vacio
  contenedorVacio: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emojiVacio: {
    fontSize: 40,
    marginBottom: 10,
  },
  tituloVacio: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtituloVacio: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
  // Certificados
  tarjetaCertificado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconoCertificado: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textosCertificado: {
    flex: 1,
  },
  tituloCertificado: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  emisorCertificado: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badgeVerificado: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  textoVerificado: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  // Banner de contacto
  bannerContacto: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 24,
    padding: 20,
  },
  tituloBannerContacto: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtituloBannerContacto: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 16,
  },
  botonContactoBanner: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  textoBotonContactoBanner: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
