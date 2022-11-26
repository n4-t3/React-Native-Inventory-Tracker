import { StyleSheet, Text, View } from 'react-native';

const StyledText = ({type,color,children}) =>{
    let size = ""
    if(type == "large"){
        size = 30
    }else if(type == "medium") {
        size = 24
    }else if(type == "small"){
        size = 15
    }
    return (
        <View style={styles.container}>
            <Text 
            style={{color: color ? color : "#FFF", fontSize:size}}>
                {children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent:'center',
        justifyContent: 'center',
    },
 });

export default StyledText