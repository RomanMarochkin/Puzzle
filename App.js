import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Level from './components/Level'

const url = {
  react: 'https://cdn.auth0.com/blog/react-js/react.png',
  angular: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/031/full/angular2.png',
  vue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
  scss: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1200px-Sass_Logo_Color.svg.png',
  html: 'https://cdn.iconscout.com/icon/free/png-256/html5-40-1175193.png',
  rx: 'https://dwglogo.com/wp-content/uploads/2017/05/RxJS_logo.png',
  gulp: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png',
  bootstrap: 'https://obscureproblemsandgotchas.com/wp-content/uploads/2018/06/bootstrap-stack-e1530246058846.png',
}

export default () => {
  const [isOpenLevel, setIsOpenLevel] = useState(false)
  const [levels, setLevels] = useState([
    {
      images: [url.react, url.react, url.react, url.react, url.angular, url.angular, url.angular, url.angular, url.vue, url.vue, url.vue, url.vue],
      id: 1,
      isComplite: false,
      size: 1,
    },
    {
      images: [url.scss, url.scss, url.scss, url.scss, url.react, url.react, url.react, url.react, url.angular, url.angular, url.angular, url.angular, url.vue, url.vue, url.vue, url.vue],
      id: 2,
      isComplite: false,
      size: 0.7,
    },
    {
      images: [url.scss, url.scss, url.react, url.react, url.angular, url.angular, url.vue, url.vue, url.html, url.html, url.rx, url.rx],
      id: 3,
      isComplite: false,
      size: 1,
    },
    {
      images: [url.bootstrap, url.bootstrap, url.gulp, url.gulp, url.scss, url.scss, url.react, url.react, url.angular, url.angular, url.vue, url.vue, url.html, url.html, url.rx, url.rx],
      id: 4,
      isComplite: false,
      size: 0.7,
    },
    {
      images: [url.bootstrap, url.bootstrap, url.bootstrap, url.bootstrap, url.gulp, url.gulp, url.gulp, url.gulp, url.scss, url.scss, url.scss, url.scss, url.rx, url.rx, url.vue, url.vue, url.vue, url.vue, url.rx, url.rx],
      id: 5,
      isComplite: false,
      size: 0.7,
    },
  ])
  const openLevel = (level) =>{
    setIsOpenLevel(level)
  }
  return (
    <View style={styles.container}>
      {!isOpenLevel ?
        <View style={styles.center}>
          <Text style={styles.text}>levels</Text>
          <View style={styles.imagesWrapper}>
            {levels.map((level) => {
              return(
                <TouchableOpacity activeOpacity={0.8}  key={level.id} onPress={() => openLevel(level)}>
                  <View style={{...styles.imageWrapper, backgroundColor: level.isComplite ? '#006600' : '#262626'}}>
                    <Text style={styles.text}>{level.id}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        :
        <Level level={isOpenLevel} setLevels={setLevels} setIsOpenLevel={setIsOpenLevel}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    margin: 10,
    borderRadius: 15,
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
  },
  center: {
    alignItems: 'center',
  },
});
