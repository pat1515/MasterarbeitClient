import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Text, View } from 'react-native';


export default function RESTScreen() {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);


    async function datenHolen() {
        setLoading(true);
        
        const start = Date.now();

        // Deklarationen
        var autorListe = [];    // Liste an Autoren
        var liste = [];         // Diese Liste wird später im GUI angezeigt
        var buchDaten = { };    // Objekt für Buch
        var index = 0;          // Hilfsvariable

        // Zuerst die Autoren holen und im Array speichern
        try {
            let response = await fetch(
                'https://masterarbeitRestServer.azurewebsites.net/api/autoren/erste/100');
            let json = await response.json();
            autorListe = json;                     
        } catch (error) {
            console.error(error);
        }

        // Für jeden Autor müssen Buch-Daten geholt werden
        for (var autor of autorListe) {

            // Für jeden Link in den BuchLinks
            for (var link of autor.buchLinks) {

                // Request an die REST API                
                try {
                    let response = await fetch(link);
                    let json = await response.json();
                    buchDaten = json;                     
                } catch (error) {
                    console.error(error);
                }               
                
                // Eintrag für die Liste, welche im GUI angezeigt wird
                var eintrag = {  
                    id: index,
                    vorname: autor.vorname,
                    nachname: autor.nachname,
                    titel: buchDaten.titel
                };              
                            
                // Eintrag der Liste hinzufügen    
                liste.push(eintrag);        
                index = index + 1;
            }            
        }

        const ende = Date.now();
        const millis = {ende}.ende - {start}.start;
        Alert.alert('Laufzeit', {millis}.millis + " ms");

        setData(liste);
        setLoading(false);
    };
  
    return (         
        <View style={{ flex: 1, padding: 24, marginTop: 30 }}>

            <Button
                title="Daten holen"
                onPress = { () => {
                    datenHolen();
                }}
            />

            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({id}, index) => id.toString()}
                    renderItem={({item}) => (
                        <Text>"{item.titel}" von {item.vorname} {item.nachname}</Text>
                    )}
                />
            )}
        </View>
    ); 
}


