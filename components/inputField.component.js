import { StyleSheet, TextInput,View } from 'react-native';
import colors from '../colors';
import Button from './button.component';
import { useContext, useState } from 'react';
import DataContext from'../context/categoriesContextProvider'
import { insertCategories,fetchCategories } from '../storage/categoriesDB';

const InputField = (props) =>{
    const {categories,setCategories} = useContext(DataContext)
    const [inputData,setInputData]=useState(null)
    const inputHandler = (e) =>{
        setInputData(e)
    }

    const submitHandler = async () => {
        await insertCategories(inputData)
        const updatedCategories = await fetchCategories()
        setCategories(updatedCategories)
    }

    return (
        <View style={styles.row}>
            <TextInput placeholderTextColor= {colors.fontColor} placeholder=" Add Category" style={styles.inputArea} onChangeText={inputHandler} keyboradType="default" autoCapitalize="none" autoCorrect={false} multiline= {false} onSubmitEditing={submitHandler}/>
            <Button value={'Add'} type={"primary"} onClick={submitHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputArea: {
        flex:1,
        backgroundColor:colors.secondaryBackground,
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        marginRight:10,
        padding:20,
        color:colors.fontColor
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    }
});

export default InputField