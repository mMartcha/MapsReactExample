import { Image, Pressable, Text, View } from "react-native";
import MapView, { Callout, MapMarker, Marker, Polygon, Polyline, Region } from "react-native-maps";
import { styles } from "./styles";
import { useRef, useState } from "react";
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

export default function App() {

    const [clickedMarker, setClickedMarker] = useState<any>()

    const [modalVisible, setModalVisible] = useState(false)

    const [selectedMarker, setSelectedMarker] = useState<Ponto>()

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
      
    return(
        <View style={styles.container}>

            <View style={{paddingBottom:20, alignItems:'center'}}>
                <Pressable style={{ backgroundColor:'red', borderRadius:8, padding:6}} onPress={ focusMap}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Press</Text>
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
            onPress={(cord) => setClickedMarker(cord)}
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
            
                     
               
            </MapView>
        </View>
    )
}