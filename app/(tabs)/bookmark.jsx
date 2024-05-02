import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'

const Bookmark = () => {
    return (
        <>
            <SafeAreaView className=" bg-primary h-full">
                <Text className="text-2xl text-white font-psemibold px-4 my-6">Bookmark</Text>
            </SafeAreaView>
            <StatusBar backgroundColor='#161622'
                style='light'
            />
        </>
    );
};

export default Bookmark;