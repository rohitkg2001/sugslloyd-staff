import * as Font from 'expo-font';

export default useFonts = async () =>
    await Font.loadAsync({
        lato_regular: require('../assets/fonts/lato_regular.ttf')
    });