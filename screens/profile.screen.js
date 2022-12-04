import { useEffect,useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import colors from '../colors';
import StyledText from '../components/styledText.component';
import { createInventoryTable, fetchInventory } from '../storage/inventoryDB';
import { createCategoriesTable, fetchCategories } from '../storage/categoriesDB'

// TODO: Data refetch on page load

const ProfileScreen = (props) =>{
    const [categoryLength,setCategoryLength] = useState(0)
    const [inventoryLength,setInventoryLength] = useState(0)

    useEffect(()=>{
        const fetchData = async ()=>{
            await createCategoriesTable()
            const categories = await fetchCategories()
            setCategoryLength(categories.length)

            await createInventoryTable()
            const inventories = await fetchInventory()
            setInventoryLength(inventories.length)
        }
        fetchData()
    },[categoryLength,inventoryLength])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.margin}>
                <StyledText color={colors.fontColor} type="large">
                    Total Categories: {categoryLength}
                </StyledText>
            </View>
            <StyledText color={colors.fontColor} type="large">
                Total Inventories: {inventoryLength}
            </StyledText>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor:colors.primaryBackground,
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
    },
    margin:{
        marginBottom:20,
        marginTop:20
    }
});

export default ProfileScreen