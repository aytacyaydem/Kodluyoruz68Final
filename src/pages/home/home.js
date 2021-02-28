import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
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
  },[resultMeals])

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
    return <Text>{item.strMeal}</Text>;
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
        data={resultMeals.meals}
        renderItem={renderMeal}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;
