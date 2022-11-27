import { StyleSheet, Pressable, View } from 'react-native';
import StyledText from './styledText.component';
import colors from '../colors';

const Categories = ({data,onClick}) =>{
    const handlePress = ()=>{
        onClick()
    }
    return (
        <View style={styles.size}>
            <Pressable  
                android_ripple={{color:colors.ripple}}
                style={styles.pressStyle}
                onPress={handlePress}>
                <StyledText type="small">{data.Title}</StyledText>
            </Pressable >
        </View>
    )
}

const styles = StyleSheet.create({
    pressStyle: {
        backgroundColor:colors.secondaryBackground,
        borderRadius:10,
        margin:5,
        padding:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    size:{
        flex:1,
        width:'20%'
    }
 });

export default Categories