import { StyleSheet, Pressable } from 'react-native';
import StyledText from './styledText.component';
import colors from '../colors';

const Categories = (props) =>{
    const handlePress = (e)=>{
        console.log(e)
    }
    return (
        <Pressable  
            android_ripple={{color:colors.ripple}}
            style={styles.pressStyle}
            onPress={handlePress}>
            <StyledText type="small">Categories</StyledText>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    pressStyle: {
        backgroundColor:colors.secondaryBackground,
        borderRadius:10,
        margin:5,
        padding:20,
    },
 });

export default Categories