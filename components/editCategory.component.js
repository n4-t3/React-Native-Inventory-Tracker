import { StyleSheet, View, Modal, Alert, Text, TextInput } from 'react-native';
import Button from './button.component';
import colors from '../colors';
import { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { updateCategories,fetchCategories } from '../storage/categoriesDB';
import DataContext from '../context/categoriesContextProvider';

const width = Dimensions.get('window').width

const EditCategory = ({modalVisible,setModalVisible,data}) =>{
    const {categories,setCategories} = useContext(DataContext)
    const [updateCategoryData,setUpdateCategoryData] = useState("")
    const inputHandler = (e)=>{
        setUpdateCategoryData(e)
    }
    const submitHandler = async ()=>{
        if(updateCategoryData.length>0){
            await updateCategories(data.id,updateCategoryData)
            const updatedData = await fetchCategories()
            setCategories(updatedData)
            setUpdateCategoryData("")
        }else{
            Alert.alert(
                "Empty Field",
                `Can't update ${data.Title} with empty field`,
                [
                    {
                        text: "Ok",
                        style: "cancel",
                    },
                ],
                {
                  cancelable: true,
                }
            )
        }
        setModalVisible(!modalVisible)
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            statusBarTranslucent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Edit Category Name</Text>
                    <TextInput placeholderTextColor= {colors.fontColor} placeholder={` Edit ${data.Title}`} style={styles.inputArea} onChangeText={inputHandler} keyboardType="default" autoCapitalize="none" autoCorrect={false} multiline= {false} onSubmitEditing={submitHandler} value={updateCategoryData}/>
                    <Button value="Edit" type={"primary"} onClick={submitHandler}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(32, 32, 50, 0.75)',
      },
      inputArea:{
        backgroundColor: colors.secondaryBackground,
        padding: 20,
        color:colors.fontColor,
        width:width-30
      },
      modalView: {
        margin: 10,
        backgroundColor: colors.primaryBackground,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: colors.ripple,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        textAlign: "center",
        color: colors.fontColor,
        marginBottom: 10,
      }
});

export default EditCategory