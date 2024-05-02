import { View, Text, ScrollView, Image, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { StatusBar } from 'expo-status-bar'

import { getCurrentUser, signIn } from '../../lib/appwrite';
const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill in all the fields")

        }
        setIsSubmitting(true)
        try {
            await signIn(form.email, form.password)

            const result = await getCurrentUser()
            setUser(result)
            setIsLogged(true)
            router.replace("/home")

        } catch (error) {
            Alert.alert("Error", error.message)
        }
        finally {
            setIsSubmitting(false)
        }

    }
    return (
        <SafeAreaView className="bg-primary h-full">

            <ScrollView>
                <View className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[34px]"
                    />
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Log in to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton title="Sing In"
                        handlePress={submit}
                        containerStyles='mt-7 '
                        isLoading={isSubmitting}
                    />
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign up
                        </Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622'
                style='light'
            />
        </SafeAreaView>
    )
}

export default SignIn