import React from 'react'
import { View, Text,FlatList,Image } from 'react-native'
import {suggestion_list} from "../../styles/component_styles"
import useApi from "../../hooks/useApi"
import {SuggestionItem} from "../../components"

function Suggestion() {
    const {result,loading,error,useRequest} = useApi();
    React.useEffect(() => {
        /* Api haftanın tarifleri için 10 adet rastgele yemek vermediği için şu anda Deniz ürünlerini filtreleyip veren servisi 
        dummy data olarak kullanıyorum. Daha sonra bunu çözmeliyiz. 
        */
        useRequest("filter.php?c=Seafood","GET");
    },[])
    function renderItem ({item}) {
      return (
        <SuggestionItem imageURL={item.strMealThumb}/>
      )
    } 
    return (
        <View style={suggestion_list.container}>
            <Text style={suggestion_list.title}>Haftanın Tarifleri</Text>
            <View>
                <FlatList data={result.meals} renderItem={renderItem} keyExtractor={item => item.idMeal.toString()} horizontal showsHorizontalScrollIndicator={false}/>
            </View>
        </View>
    )
}

export {Suggestion}
