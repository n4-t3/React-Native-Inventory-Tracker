import { StyleSheet, Pressable } from 'react-native';
import StyledText from './styledText.component';
import colors from '../colors';

const Button = ({value,type}) =>{
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
        console.log(e)
    }
    return (
        <Pressable  
            android_ripple={{color:ripple}}
            style={{backgroundColor:color ,...styles.pressStyle}}
            onPress={handlePress}>
            <StyledText type="small">{value}</StyledText>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    pressStyle: {
        borderRadius:10,
        margin:5,
        padding:20,
        overflow:'hidden'
    },
 });

export default Button