import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Registro de uma fonte personalizada
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// Componente PDF personalizado
const CustomPDFDocument = ({ texto }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>Documento de Paciente</Text>
      <Text style={styles.text}>{texto}</Text>
      <Text style={styles.pageNumber} render={({ pageNumber }) => `Página ${pageNumber}`} fixed />
    </Page>
  </Document>
);

// Componente PDF personalizado
const CustomPDF2Document = ({ texto }) => (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Atestado do Paciente</Text>
        <Text style={styles.text}>{texto}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Página ${pageNumber}`} fixed />
      </Page>
    </Document>
  );

export default function PatientDocuments({ auth, errors }) {
  const [encaminhamentos, setEncaminhamentos] = useState('Eu, Psicóloga (nome) encaminho o paciente (nome) para...');
  const [atestados, setAtestados] = useState('Psicólogo(a)(nome) O paciente (nome) esteve em consulta comigo durante o horario ()');
  

  return (
    <AuthenticatedLayout auth={auth} errors={errors}>
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Documentos de pacientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Encaminhamentos</h2>
          <textarea value={encaminhamentos} onChange={(e) => setEncaminhamentos(e.target.value)} className="w-full px-3 py-2 text-base leading-6 text-gray-700 border rounded-lg focus:outline-none focus:ring" rows="10"></textarea>
          <PDFDownloadLink document={<CustomPDFDocument texto={encaminhamentos} />} fileName="Encaminhamentos.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Carregando...' : 'Exportar Encaminhamentos')}
          </PDFDownloadLink>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Atestados de Atendimento</h2>
          <textarea value={atestados} onChange={(e) => setAtestados(e.target.value)} className="w-full px-3 py-2 text-base leading-6 text-gray-700 border rounded-lg focus:outline-none focus:ring" rows="10"></textarea>
          <PDFDownloadLink document={<CustomPDF2Document texto={atestados} />} fileName="Atestados.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Carregando...' : 'Exportar Atestados')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
