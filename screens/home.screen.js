import { StyleSheet, View, ScrollView } from 'react-native';
import colors from '../colors';
import StyledText from '../components/styledText.component';
import Categories from '../components/categories.component';
import InputField from '../components/inputField.component';
import { useContext } from 'react';
import DataContext from '../context/categoriesContextProvider';

const HomeScreen = ({ navigation }) =>{
    const {categories} = useContext(DataContext)
    console.log(categories)
    return (
        <View style={styles.container}>
            <StyledText color={colors.fontColor} type="large">
                Find the things you didn't know you had
            </StyledText>
            <InputField/>
            <ScrollView style={styles.scrollView}>
                {categories ? categories.map((element)=>{
                    console.log(element);
                    return(
                        <Categories key={element.id} data={element} onClick={()=> navigation.navigate("Category",{data: element})} />
                    )
                }): null}
            </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.primaryBackground,
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
    },
    scrollView:{
        flex: 1,
        flexGrow: 1,
    },
});

export default HomeScreen