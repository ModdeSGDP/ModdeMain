"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect, useCallback } from "react"

export const useAsyncStorage = () => {
  const [isLoading, setIsLoading] = useState(true)

  const storeData = useCallback(async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.error("Error storing data:", e)
    }
  }, [])

  const getData = useCallback(async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error("Error retrieving data:", e)
      return null
    }
  }, [])

  const removeData = useCallback(async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error("Error removing data:", e)
    }
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return { storeData, getData, removeData, isLoading }
}