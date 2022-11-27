import { Text } from "react-native"

const CategoryScreen = ({route,navigation})=>{
        console.log(route.params.data)
    return(
        <Text>category page</Text>
    )
}

export default CategoryScreen