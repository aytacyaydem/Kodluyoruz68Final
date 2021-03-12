import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, Dimensions} from 'react-native';
import useApi from '../../hooks/useApi';
import {CategoryButton, Suggestion} from '../../components';

const HomeScreen = () => {
  const {result, loading, error, useRequest} = useApi();
  const {
    result: resultMeals,
    loading: loadingMeals,
    error: errorMeals,
    useRequest: requestMeals,
  } = useApi();
  const [selectedCategory, setSelectedCategory] = useState({
    idCategory: '1',
    strCategory: 'Beef',
  });

  function getMealsByCategory() {
    requestMeals(`filter.php?c=${selectedCategory.strCategory}`, 'GET');
  }

  useEffect(() => {
    //Tüm ürün kategorileri burada çekilir. useRequest custom hook'tan gelen fonksiyondur.
    useRequest('categories.php', 'GET');
  }, []);

  useEffect(() => {
    console.log(resultMeals);
  }, [resultMeals]);

  //Eğer bir kategori seçiliyse seçilen kategorideki ürünleri getirir. Her kategori değiştiğinde yeniden tetiklenir.
  useEffect(() => {
    if (selectedCategory) {
      getMealsByCategory();
    }
  }, [selectedCategory]);

  //Her kategori seçimi yapıldığında kategori burada set edilir.
  function onSelect(item) {
    setSelectedCategory(item);
  }
  //En üstteki butonlarımızı bu fonksiyonda Render ediyoruz.
  function renderItem({item}) {
    return (
      <CategoryButton
        title={item.strCategory}
        onSelect={() => onSelect(item)}
        selected={
          selectedCategory?.idCategory === item.idCategory ? true : false
        }
      />
    );
  }
  //Yemekleri bu fonksiyon ile Render ediyoruz.
  function renderMeal({item}) {
    return (
      <View
        style={{
          width: Dimensions.get('window').width / 2.8,
          flex: 1,
          backgroundColor: '#eee',
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 5,
          elevation: 5,
          padding: 5,
          margin: 10,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.strMealThumb}}
          style={{
            height: 70,
            width: 70,
            resizeMode: 'center',
            borderRadius: 90,
          }}
        />
        <Text>{item.strMeal} </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={result.categories}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Suggestion />
      <FlatList
        numColumns={2}
        data={resultMeals.meals}
        renderItem={renderMeal}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;
