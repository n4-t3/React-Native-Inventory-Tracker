import { StyleSheet, Pressable, View, Alert } from 'react-native';
import StyledText from './styledText.component';
import colors from '../colors';
import { deleteCategories,fetchCategories } from '../storage/categoriesDB';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useState } from 'react';
import DataContext from '../context/categoriesContextProvider';
import EditCategory from './editCategory.component';

const Categories = ({data,onClick}) =>{
    const {categories,setCategories} = useContext(DataContext)
    const [modalVisible,setModalVisible] = useState(false)

    const handleCategory = ()=>{
        onClick()
    }
    const handleEdit = ()=>{
        setModalVisible(true)
        console.log('edit')
    }
    const handleDelete = ()=>{
        Alert.alert(
            "Confirm",
            `Are you sure you want to delete ${data.Title}`,
            [
                {
                    text: "Yes",
                    onPress: async() => {
                        deleteCategories(data.id)
                        const updatedData = await fetchCategories()
                        setCategories(updatedData)
                    },
                    style: "cancel",
                },
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancelled"),
                    style: "cancel",
                },
            ],
            {
              cancelable: true,
            }
        )
    }
    return (
        <>
        <EditCategory modalVisible = {modalVisible} setModalVisible={setModalVisible} data={data}/>
        <View style={styles.container}>
            <View>
                <Pressable  
                    android_ripple={{color:colors.ripple}}
                    style={styles.pressStyle}
                    onPress={handleCategory}>
                    <StyledText type="small">{data.Title}</StyledText>
                </Pressable >
            </View>
            <View style={styles.row}>
                <View>
                    <Pressable  
                        android_ripple={{color:colors.ripple}}
                        style={styles.pressStyle}
                        onPress={handleEdit}>
                        <MaterialCommunityIcons name="file-edit-outline" color={colors.edit} size={15} />
                    </Pressable >
                </View>
                <View>
                    <Pressable  
                        android_ripple={{color:colors.ripple}}
                        style={styles.pressStyle}
                        onPress={handleDelete}>
                        <MaterialCommunityIcons name="delete-outline" color={colors.delete} size={15} />
                    </Pressable >
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor:colors.secondaryBackground,
        marginTop:10,
        marginBottom:10,
        borderRadius:10,
    },
    row:{
        flexDirection: "row",
        justifyContent:"space-around",
    },
    pressStyle: {
        borderRadius:10,
        margin:5,
        padding:20,
    },
});

export default Categories