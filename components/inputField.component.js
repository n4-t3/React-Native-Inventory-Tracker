import { StyleSheet, TextInput } from 'react-native';
import colors from '../colors';
const InputField = (props) =>{
    const inputHandler = () =>{

    }

    const submitHandler = () => {

    }
    return (
        <TextInput placeholderTextColor= {colors.fontColor} placeholder=" Search Inventory" style={styles.inputArea} onChangeText={inputHandler} keyboradType="default" autoCapitalize="none" autoCorrect={false} multiline= {false} onSubmitEditing={submitHandler}/>
    )
}

const styles = StyleSheet.create({
    inputArea: {
        flex: 1,
        backgroundColor:colors.secondaryBackground,
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        padding:10,
        color:colors.fontColor
    },
});

export default InputField