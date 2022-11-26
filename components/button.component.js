import { StyleSheet, Pressable, View } from 'react-native';
import StyledText from './styledText.component';
import colors from '../colors';

const Button = ({value,type,onClick}) =>{
    let color  = ""
    let ripple = ""
    if(type=="primary"){
        color = colors.buttonPrimary
        ripple = colors.buttonPrimaryRipple
    }else if(type=="secondary"){
        color = colors.buttonSecondary
        ripple = colors.buttonSecondaryRipple
    }
    const handlePress = (e)=>{
        onClick()
    }
    return (
        <View style={styles.size}>
            <Pressable  
                android_ripple={{color:ripple}}
                style={{backgroundColor:color ,...styles.pressStyle}}
                onPress={handlePress}>
                <StyledText type="small">{value}</StyledText>
            </Pressable >
        </View>
    )
}

const styles = StyleSheet.create({
    pressStyle: {
        borderRadius:10,
        padding:20,
        overflow:'hidden',
        flexDirection:'row',
        justifyContent:'center'
    },
    size:{
        flex:1,
        width:'30%',
        marginTop:10,
        marginBottom:10,
    }
 });

export default Button