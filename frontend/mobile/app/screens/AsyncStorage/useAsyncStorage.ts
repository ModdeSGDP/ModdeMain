"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"

export const useAsyncStorage = () => {
  const [isLoading, setIsLoading] = useState(true)

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.error("Error storing data:", e)
    }
  }

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error("Error retrieving data:", e)
      return null
    }
  }

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error("Error removing data:", e)
    }
  }

  useEffect(() => {
    // You might want to add loading logic here if needed.
    setIsLoading(false)
  }, [])

  return { storeData, getData, removeData, isLoading }
}

