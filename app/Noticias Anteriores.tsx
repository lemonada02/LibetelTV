import { View, Text, FlatList, Image } from 'react-native'
import { Link } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { supabase } from '../shared/supabase';

type Noticia = {
    id: number;
    titulo: string;
    contenido: string;
    fecha: Date;
    imagen: string;
}

export default function NoticiasAnt() {

    const [data, setData] = useState<Noticia[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('noticias')
                    .select('*')
                    .lt('fecha', new Date().toISOString().split('T')[0])
                    .order('fecha', { ascending: false });

                if (error) {
                    console.error('Error al obtener datos:', error);
                } else {
                    setData(data);
                }
            } catch (error) {
                console.error('Error inesperado:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <View style={{ padding: 10 }}>
            <FlatList data={data} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                    <View style={{ backgroundColor: "#00a0e633", padding: 8, borderRadius: 12, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Link href={{ pathname: '/noticia/[id]', params: { id: item.id } }}>
                            <View style={{ justifyContent: 'center', width: 300, alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
                                    {item.titulo}
                                </Text>
                                {item.imagen != null && <Image source={{ uri: item.imagen }} style={{ height: 150, width: "100%", resizeMode: "contain" }} />}
                            </View>
                        </Link>
                    </View>

                    <View style={{ width: "100%", borderColor: 'grey', borderWidth: 0.5, borderRadius: 3, marginTop: 20 }}></View>
                </View>)}
            />
        </View>
    )
}