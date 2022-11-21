import { StyleSheet, Text, View } from 'react-native';

const StyledText = (props) =>{
    let size = ""
    if(props.type == "large"){
        size = 30
    }else if(props.type == "medium") {
        size = 24
    }else if(props.type == "small"){
        size = 15
    }
    return (
        <View style={styles.container}>
            <Text 
            style={{color: props.color ? props.color : "#FFF", fontSize:size}}>
                {props.children}
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