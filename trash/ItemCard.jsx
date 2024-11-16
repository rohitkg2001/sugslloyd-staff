import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function ItemCard({ item }) {
    const [uri, setUri] = useState('../../assets/img15.png')
    return (
        <View>
            <Text>ItemCard</Text>
            <Image source={{ uri: item.url }} height={40} width={40} />
        </View>
    )
}