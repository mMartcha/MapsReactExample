import { Image, Pressable, Text, View } from "react-native";
import MapView, { Callout, LatLng, MapMarker, Marker, Polygon, Polyline, Region } from "react-native-maps";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/Modal";

type Ponto = {
  nome: string;
  descricao: string;
  id: string;
  coordenadas: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

type marcador = 
  {
      latitude: number
      longitude: number
  }

  


export default function App() {

    const [clickedMarker, setClickedMarker] = useState<any>([])

    const [modalVisible, setModalVisible] = useState(false)

    const [selectedMarker, setSelectedMarker] = useState<Ponto>()

    const [distanciaEmMetros, setDistanciaEmMetros] = useState<number[]>([0])

    const [distanciaFinal, setDistanciaFinal] = useState<number>(0)

    const mapRef = useRef<any>()

    const initialRegion = {
        latitude:-28.474652, 
        longitude:-52.815206,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    }

    const focusMap = () => {
        mapRef.current?.animateToRegion(initialRegion)
    }

    function onMarkerClick(marker: Ponto){
      setSelectedMarker(marker)
      setModalVisible(true)
      console.log(marker)
      mapRef.current?.animateCamera({
        center: { latitude:marker?.coordenadas.latitude, longitude: marker?.coordenadas.longitude},
        zoom: 19,
      }, { duration: 2000 });
    }

    function onCloseModalZoomOut(){
      setModalVisible(false)
      mapRef.current?.animateCamera({
        center: {latitude: initialRegion.latitude, longitude:initialRegion.longitude},
        zoom: 16,
      }, { duration: 1000 });
    }

   

     function calcularDistancia(coord1: marcador, coord2: marcador) {
      const R = 6371000;
      const toRad = (graus: number) => (graus * Math.PI) / 180;
    
      const dLat = toRad(coord2.latitude - coord1.latitude);
      const dLon = toRad(coord2.longitude - coord1.longitude);
    
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      const dist = R * c 

      setDistanciaFinal(dist)

      console.log(dist.toFixed(1) + ' METROS')
      console.log(distanciaFinal.toFixed(1) + ' distancia final')
    
    }
    
      const lugaresImportantes = [
        {
          nome: "PontoUm",
          descricao: "PontoUmDesc",
          id:'1',
          coordenadas: {
            latitude: -28.472021,
            longitude: -52.814701,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoDois",
          descricao: "PontoDoisDesc",
          id:'2',
          coordenadas: {
            latitude: -28.473709,
            longitude: -52.814991,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "Associação",
          descricao: "Palestras.",
          id:'3',
          coordenadas: {
            latitude: -28.476016,
            longitude: -52.817033,
            latitudeDelta:0.01,
            longitudeDelta:0.01

          },
        },
        {
          nome: "PontoTres",
          descricao: "PontoTresDesc",
          id:'4',
          coordenadas: {
            latitude: -28.479369,           
            longitude: -52.815446,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoQuatro",
          descricao: "PontoQuatroDesc",
          id:'5',
          coordenadas: {
            latitude: -28.474851,          
            longitude: -52.817930,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoCinco",
          descricao: "PontoCincoDesc",
          id:'6',
          coordenadas: {
            latitude: -28.474204,        
            longitude: -52.818511,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoSeis",
          descricao: "PontoSeisDesc.",
          id:'7',
          coordenadas: {
            latitude: -28.473784,       
            longitude: -52.816914,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoSete",
          descricao: "PontoSeteDesc.",
          id:'8',
          coordenadas: {
            latitude: -28.472689,        
            longitude: -52.816372,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoOito",
          descricao: "PontoOitoDesc.",
          id:'9',
          coordenadas: {
            latitude: -28.473036,       
            longitude: -52.814999,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoNove",
          descricao: "PontoNoveDesc.",
          id:'10',
          coordenadas: {
            latitude: -28.472847,       
            longitude: -52.814130,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
      ];

      let cordenada1: marcador
      let cordenada2: marcador

      const clickedMarkerLength = clickedMarker.length

      if(clickedMarkerLength === 2){
        cordenada1 = clickedMarker[0]
        cordenada2 = clickedMarker[1]
      }
      else if(clickedMarkerLength > 2){
        cordenada1 = clickedMarker[clickedMarkerLength - 2]
        cordenada2 = clickedMarker[clickedMarkerLength - 1]
      }
      
      
      useEffect(()=>{
        if(clickedMarkerLength >= 2){
            calcularDistancia(cordenada1, cordenada2)
            }
            },[clickedMarkerLength])

      function limpar(){
        setClickedMarker([])
        setDistanciaFinal(0)
        setDistanciaEmMetros([])
      }


    return(
        <View style={styles.container}>

            <View style={{paddingBottom:20, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>
                <Pressable style={{ backgroundColor:'red', borderRadius:8, padding:6}} onPress={ () => console.log(clickedMarker)}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Press</Text>
                </Pressable>

                <Pressable style={{ backgroundColor:'red', borderRadius:8, padding:6}} onPress={() => limpar()}>
                  <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Limpar Lista</Text>
                </Pressable>

            </View>

                <Modal
                    id={selectedMarker?.id}
                    isOpen={modalVisible}
                    style={{zIndex:1, top:100}}
                  >
                  <View style={{backgroundColor:'white', width:200, height:120,
                              justifyContent:'center', alignItems:'center',
                              borderRadius:8, alignSelf:'center', top:250
                              }}>
                      <Text style={{fontSize:20}}>
                        {selectedMarker?.nome}
                      </Text>

                      <Pressable onPress={() =>onCloseModalZoomOut()}>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'red'}}>
                          FECHA
                        </Text>
                      </Pressable>

                  </View>


                </Modal>

          <MapView style={styles.map}
            initialRegion={initialRegion}
            ref={mapRef}
            mapType="satellite"
            onPress={(cord) => {    
              let coordenadas = cord.nativeEvent.coordinate
              setClickedMarker((prev: any) => [ ...prev, coordenadas])
            }}
            >
            {lugaresImportantes.map((marker, index)=>
                    <Marker
                        key={index}
                        coordinate={marker.coordenadas}  
                        onPress={() => onMarkerClick(marker)}
                        >
                    </Marker>
                )}

                <Polygon
                strokeColor="red"
                strokeWidth={2}
                  coordinates={[
                    {
                      latitude:-28.470762,
                      longitude:-52.814283
                    },
                    {
                      latitude:-28.473077,
                      longitude:-52.813597
                    },
                    {
                      latitude:-28.473172, 
                      longitude:-52.812208
                    },
                    {
                      latitude:-28.484037,
                      longitude:-52.814229
                    },
                    {
                      latitude:-28.482911,
                      longitude:-52.818884
                    },
                    {
                      latitude:-28.477757,
                      longitude:-52.818159
                    },
                    {
                      latitude:-28.475323,
                      longitude:-52.820498
                    }

                  ]}                
                />

                <Polyline
                  coordinates={clickedMarker}
                  strokeColor="red"
                  strokeWidth={3}
                />
              

            </MapView>
        </View>
    )
}