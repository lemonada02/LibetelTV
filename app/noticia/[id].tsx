import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { supabase } from '../../shared/supabase';

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: Date;
  destacado: boolean;
  imagen: string;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Noticia>();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('noticias')
          .select('*')
          .eq('id', id);

        if (error) {
          console.error('Error al obtener datos:', error);
        } else {
          setData(data[0]);
        }
      } catch (error) {
        console.error('Error inesperado:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <View style={{ padding: 10 }}>
      {data ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>{data.titulo}</Text>
          <View style={{ width: "80%", borderColor: 'grey', borderWidth: 0.5, borderRadius: 3, marginBottom: 6 }}></View>
          {data.imagen ? (
            <Image source={{ uri: data.imagen }} style={{ height: 200, width: "100%", marginTop: 15, resizeMode: 'contain' }} />
          ) : (
            <Text style={{margin: 10}}>Imagen no disponible</Text>
          )}
          <ScrollView style={{ width: "100%" }}>
            <Text style={{ marginHorizontal: 10, fontSize: 18, marginTop: 30, textAlign:'justify' }}>{data.contenido}</Text>
          </ScrollView>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
