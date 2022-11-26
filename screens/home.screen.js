import { StyleSheet, View, FlatList } from 'react-native';
import colors from '../colors';
import StyledText from '../components/styledText.component';
import Categories from '../components/categories.component';
import InputField from '../components/inputField.component';
import { useContext } from 'react';
import DataContext from '../context/categoriesContextProvider';

const HomeScreen = (props) =>{
    const {categories} = useContext(DataContext)
    return (
        <View style={styles.container}>
            <StyledText color={colors.fontColor} type="large">
                Find the things you didn't know you had
            </StyledText>
            <InputField/>
            <FlatList data={categories} renderItem={(itemData)=>{
                return(
                    <Categories key={itemData.index} data={itemData.item}/>
                )
            }} style={styles.row} numColumns={2}/>
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
    row:{
        flex: 1,
        flexGrow: 1,
    },
});

export default HomeScreen