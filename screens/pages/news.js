import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ArticleCard} from '../components/newsPage/articleCard';
import config from '../helper/config';

export const NewsScreen = ({navigation}) => {
  const [categoryList, setCategoryList] = useState([
    {
      id: 0,
      title: 'All',
    },
    {
      id: 1,
      title: 'News',
    },
    {
      id: 2,
      title: 'Category1',
    },
    {
      id: 3,
      title: 'Category2',
    },
    {
      id: 4,
      title: 'Category3',
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    console.log('GetArticles Function...', articles);
    axios
      .get(config.API_BASE_URL + '/api/article')
      .then(function (response) {
        console.log('Response Data: ', response.data.articles[6].image);
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        console.log('Response Data: ', response);
      })
      .finally(function () {
        console.log('arrived there');
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <View style={{backgroundColor: '#14142f', marginBottom: 50}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {categoryList &&
            categoryList.map(item => (
              <TouchableOpacity
                style={styles.categoryTitle}
                onPress={() => setCurrentCategory(item.id)}>
                <Text
                  style={
                    item.id === currentCategory
                      ? styles.categoryActive
                      : styles.categoryItem
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <ScrollView>
        <View style={styles.articleContainer}>
          {articles &&
            articles.map(item => <ArticleCard item={item} key={item.id} />)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {flexDirection: 'row', marginBottom: 25, marginTop: 10},
  categoryTitle: {
    alignItems: 'flex-start',
    marginLeft: 10,
    height: 24,
    justifyContent: 'center',
  },
  categoryItem: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryActive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    backgroundColor: '#6a4dfd',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  articleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
