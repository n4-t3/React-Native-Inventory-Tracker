import { StyleSheet, ScrollView } from 'react-native';
import colors from '../colors';
import StyledText from '../components/styledText.component';
import Categories from '../components/categories.component';
import InputField from '../components/inputField.component';
import Button from '../components/button.component';
const HomeScreen = (props) =>{
    return (
        <ScrollView style={styles.container}>
            <StyledText color={colors.fontColor} type="large">
                Find the things you didn't know you had
            </StyledText>
            <InputField/>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndictor={false}
            style={styles.row}>
                    <Categories />
                    <Categories />
                    <Categories />
                    <Categories />
                    <Categories />
            </ScrollView>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.primaryBackground,
        paddingTop:50,
        paddingLeft:20,
    },
    row:{
        flexGrow: 0,
        marginTop:10,
        flexDirection:"row",
    }
});

export default HomeScreen