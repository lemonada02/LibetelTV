import { Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'

import { Calendar, LocaleConfig } from 'react-native-calendars'
import { add, format, sub, parse } from 'date-fns'

import { supabase } from '../shared/supabase'
import Card from '../shared/card'

LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ],
    monthNamesShort: [
        'Ene.',
        'Feb.',
        'Mar.',
        'Abr.',
        'May.',
        'Jun.',
        'Jul.',
        'Ago.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dic.',
    ],
    dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
    ],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'es';

type Event = {
    id: number;
    fecha: Date;
    titulo: string;
    hora: string;
    noticia: number;
}

export default function Agenda() {

    const [data, setData] = useState<Event[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('agenda')
                .select('*')
                .eq('fecha', format(selectedDate, 'yyyy-MM-dd'))
                .order('hora')
            if (error) {
                console.error('Error al obtener datos:', error)
            } else {
                setData(data)
            }
        }
        fetchEvents()
    }, [selectedDate])

    return (
        <View>
            <Calendar
                minDate={format(sub(new Date(), { days: 4 }), 'yyyy-MM-dd')}
                maxDate={format(add(new Date(), { weeks: 1 }), 'yyyy-MM-dd')}

                onDayPress={(day: { dateString: React.SetStateAction<string> }) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#00a0e6' }
                }}
                theme={{
                    monthTextColor: '#00a0e6',
                    monthTextFontSize: 22,
                    textMonthFontWeight: 'bold',
                    arrowColor: '#00a0e6',
                }}
            />
            <View style={{ alignItems: 'center', marginTop: 20, height: 350 }}>
                <Card>
                    <FlatList style={{ marginTop: 10 }} data={data} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                        <View>
                            {item.noticia ? (
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Link href={`/noticia/${item.noticia}`} style={{ width: 200 }}>
                                        <Text style={{ fontSize: 18, color: "#00a0e6", textAlign: "justify" }}>• {(item.titulo).charAt(0).toUpperCase() + (item.titulo).slice(1)}</Text>
                                    </Link>
                                    {item.hora != null && <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15 }}>{format(parse(item.hora, 'HH:mm:ss', new Date()), 'HH:mm')}</Text>}
                                </View>
                            ) : (
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ width: 200, fontSize: 18, textAlign: "justify" }}>• {(item.titulo).charAt(0).toUpperCase() + (item.titulo).slice(1)}</Text>
                                    {item.hora != null && <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5 }}>{format(parse(item.hora, 'HH:mm:ss', new Date()), 'HH:mm')}</Text>}
                                </View>
                            )}
                            <View style={{ width: "100%", borderColor: 'grey', borderWidth: 0.5, borderRadius: 3, marginTop: 5, marginBottom: 8 }}></View>
                        </View>
                    )} />
                </Card>
            </View >
        </View >
    )
}