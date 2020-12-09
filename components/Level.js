import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
export default ({level, setLevels, setIsOpenLevel}) => {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState([])
  const [blocked, setBlocked] = useState(false)
  const [life, setLife] = useState(3)
  const handeSetLevels = (isComplite) => {
    setLevels(prev => {
      const elem = prev.find(e => e.id === level.id)
      elem.isComplite = isComplite ? true : elem.isComplite
      return [...prev]
    })
    setIsOpenLevel(false)
  }
  const openCard = (id) =>{
    setImages(prev =>{
      const elem = prev.find(elem => elem.id === id)
      elem.isPressed = true
      return [...prev]
    })
    const elem = images.find(elem => elem.id === id)
    if(!elem.isComplite){
      setSelected(prev =>{
        if(prev.length === 1 && prev[0].id === elem.id){
          return prev
        }
        const newArr = [...prev, elem]
        if(newArr.length === 2){
          setBlocked(true)
          setTimeout(() =>{
            if(newArr[0].url === newArr[1].url){
              setImages(prev =>{
                newArr.forEach(e =>{
                  const image = prev.find(image => image.id === e.id)
                  image.isComplite = true
                })
                return [...prev]
              })
              const isComplite = images.find(e => e.isComplite === false)
              if(!isComplite){
                handeSetLevels(true)
              }
              setSelected([])
            }else{
              if(life - 1 === 0){
                handeSetLevels(false)
                return
              }
              setLife(prev => {
                if(prev - 1 === 0){
                  setImages(prev =>{
                    prev.forEach((elem) => {
                      elem.isPressed = false
                      elem.isComplite = false
                    })
                    return [...prev]
                  })
                  return 3
                }
                return --prev
              })
              setSelected([])
              setImages(prev =>{
                prev.forEach((elem) => {
                  if(!elem.isComplite){
                    elem.isPressed = false
                  }
                })
                return [...prev]
              })
            }
            setBlocked(false)
          }, 1000)
        }
        return newArr
      })
    }
  }
  const shuffle = (arr) =>{
    arr.sort(() => Math.random() - 0.5 )
  }
  useEffect(() => {
    setBlocked(true)
    setImages(prev =>{
      shuffle(level.images)
      level.images.forEach((elem, i) => {
        prev.push({
          id: i + 1, 
          url: elem,
          isPressed: true,
          isComplite: false,
        })
      })
      return [...prev]
    })
    setTimeout(() =>{
      setImages(prev =>{
        prev.forEach((elem) => {
          elem.isPressed = false
        })
        return [...prev]
      })
      setBlocked(false)
    }, 3000)
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.text}>life: {life}</Text>
      <View style={styles.imagesWrapper}>
        {images.map((image) => {
          return(
            <TouchableOpacity activeOpacity={image.isComplite ? 1 : 0.5}  key={image.id} onPress={() => !blocked && openCard(image.id)}>
              <View 
                style={{
                  ...styles.imageWrapper, 
                  backgroundColor: image.isComplite ? '#006600' : '#262626',
                  width: level.size * 100,
                  height: level.size * 100,
                }}
              >
                {image.isPressed &&
                <Image
                  style={styles.image}
                  source={{uri: image.url}}
                />
                }
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
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
});
