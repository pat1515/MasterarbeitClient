import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Text, View } from 'react-native';


export default function RESTScreen() {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const queryString = `
        {
            autoren(first:100) {
                vorname
                nachname
                buecher {
                    titel
                }
            }
        }
    `;

    async function datenHolen() {
        setLoading(true);
        
        const start = Date.now();

        // Deklarationen
        var liste = [];         // Diese Liste wird später im GUI angezeigt
        var graphQLdata = [];   // Response von der GraphQL API

        // Query an die API mit POST Request
        try {
            let response = await fetch(
                'https://masterarbeitgraphql.azurewebsites.net/graphql', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: queryString
                    })            
                });
            let json = await response.json();            
            graphQLdata = json.data.autoren;
        } catch (error) {
            console.error(error);
        }

        var index = 0;

        // Liste aufbereiten
        for (var autor of graphQLdata) {

            // Für jedes Buch in der Buchliste
            for (var buch of autor.buecher) {
                                    
                // Eintrag für die Liste, welche im GUI angezeigt wird
                var eintrag = {  
                    id: index,
                    vorname: autor.vorname,
                    nachname: autor.nachname,
                    titel: buch.titel
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


