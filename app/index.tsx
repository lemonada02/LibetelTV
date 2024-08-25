import { View, Image, TouchableOpacity, Linking, Animated, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import Card from '../shared/card'
import { Link } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { supabase } from '../shared/supabase';

export default function index() {

  const opacityValueNoticias = useRef(new Animated.Value(1)).current;
  const opacityValueAgenda = useRef(new Animated.Value(1)).current;
  const opacityValueDirecto = useRef(new Animated.Value(1)).current;
  const opacityValue24H = useRef(new Animated.Value(1)).current;

  const scaleValueNoticias = useRef(new Animated.Value(1)).current;
  const scaleValueAgenda = useRef(new Animated.Value(1)).current;
  const scaleValueDirecto = useRef(new Animated.Value(1)).current;
  const scaleValue24H = useRef(new Animated.Value(1)).current;

  const handlePressIn = (scaleValue: Animated.Value | Animated.ValueXY, opacityValue: Animated.Value | Animated.ValueXY) => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  const handlePressOut = (scaleValue: Animated.Value | Animated.ValueXY, opacityValue: Animated.Value | Animated.ValueXY) => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const [directo, setDirecto] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchDirecto = async () => {
      const { data, error } = await supabase
        .from("directos")
        .select("enlace")
      if (error) {
        console.error(error);
      }
      if (data) {
        if (data.length === 1) {
          setDirecto(true);
          setUrl(data[0].enlace.trim());
        }
        else {
          setDirecto(false)
        };
      }
    };
    fetchDirecto();

    const intervalId = setInterval(fetchDirecto, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
  }, [opacity, directo]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between", alignItems: 'center' }}>
      <Link href="/Noticias" style={{ marginTop: 20 }} onPressIn={() => handlePressIn(scaleValueNoticias, opacityValueNoticias)} onPressOut={() => handlePressOut(scaleValueNoticias, opacityValueNoticias)}>
        <Animated.View style={{ transform: [{ scale: scaleValueNoticias }], opacity: opacityValueNoticias }}>
          <Card>
            <Image source={require("../assets/noticias.png")} resizeMode='contain' style={{ width: 120, height: 120 }} />
          </Card>
        </Animated.View>
      </Link>

      <View style={{ width: "85%", borderColor: 'grey', borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}></View>

      <Link href="/Agenda" onPressIn={() => handlePressIn(scaleValueAgenda, opacityValueAgenda)} onPressOut={() => handlePressOut(scaleValueAgenda, opacityValueAgenda)}>
        <Animated.View style={{ transform: [{ scale: scaleValueAgenda }], opacity: opacityValueAgenda }}>
          <Card>
            <Image source={require("../assets/agenda.png")} resizeMode='contain' style={{ width: 120, height: 120 }} />
          </Card>
        </Animated.View>
      </Link>

      <View style={{ width: "85%", borderColor: 'grey', borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}></View>

      {directo ? (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginRight: 7.5 }} onPress={() => Linking.openURL(url)} onPressIn={() => handlePressIn(scaleValueDirecto, opacityValueDirecto)} onPressOut={() => handlePressOut(scaleValueDirecto, opacityValueDirecto)}>
            <Animated.View style={{ transform: [{ scale: scaleValueDirecto }], opacity: opacityValueDirecto }}>
              <Card width='150'>
                <Image source={require("../assets/directo.png")} resizeMode='contain' style={{ width: 110, height: 110 }} />
                <Animated.Text style={[{ color: "red", fontSize: 18, fontWeight: "bold", textAlign: 'center' }, { opacity }]}>
                  ¡En Directo!
                </Animated.Text>
              </Card>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 7.5 }} onPress={() => Linking.openURL("https://www.youtube.com/live/QMGFTYNIf4Q")} onPressIn={() => handlePressIn(scaleValue24H, opacityValue24H)} onPressOut={() => handlePressOut(scaleValue24H, opacityValue24H)}>
            <Animated.View style={{ transform: [{ scale: scaleValue24H }], opacity: opacityValue24H }}>
              <Card width='150'>
                <Image source={require("../assets/24h.png")} resizeMode='contain' style={{ width: 110, height: 110 }} />
                <Animated.Text style={[{ color: "red", fontSize: 18, fontWeight: "bold", textAlign: 'center' }, { opacity }]}>
                  ¡24 horas!
                </Animated.Text>
              </Card>
            </Animated.View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/live/QMGFTYNIf4Q")} onPressIn={() => handlePressIn(scaleValue24H, opacityValue24H)} onPressOut={() => handlePressOut(scaleValue24H, opacityValue24H)}>
          <Animated.View style={{ transform: [{ scale: scaleValue24H }], opacity: opacityValue24H }}>
            <Card>
              <Image source={require("../assets/24h.png")} resizeMode='contain' style={{ width: 120, height: 120, marginLeft: 40 }} />
              <Animated.Text style={[{ color: "red", fontSize: 18, fontWeight: "bold", }, { opacity }]}>
                ¡Nueva Emisión 24 horas!
              </Animated.Text>
            </Card>
          </Animated.View>
        </TouchableOpacity>
      )
      }


      <View style={{ backgroundColor: "#00a0e6", }}>
        <View style={{ marginBottom: 15, marginTop: 20, marginHorizontal: 100, flexDirection: "row", }}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/libetel_comunicaciones/")}>
            <Image source={require('../assets/ig.jpeg')} style={{ width: 45, height: 45, borderRadius: 25, marginRight: 35, resizeMode: "contain" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/profile.php?id=100054461079666&locale=es_ES")}>
            <Image source={require('../assets/fb.png')} style={{ width: 45, height: 45, borderRadius: 25, marginRight: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.tiktok.com/@libeteltv")}>
            <Image source={require('../assets/tiktok.png')} style={{ width: 45, height: 45, borderRadius: 25, marginRight: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/@LIBETELTV")}>
            <Image source={require('../assets/yt.jpeg')} style={{ width: 45, height: 45, borderRadius: 25 }} />
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => Linking.openURL("mailto:libeteltv@libetel.es")}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "flex-start" }}>
            <MaterialIcons name="outgoing-mail" size={30} color="#333" />
            <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 15, fontWeight: 'bold', color: "#333", marginLeft: 5, marginTop: 2 }}>Pulsa para Contactarnos!!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View >
  )
}