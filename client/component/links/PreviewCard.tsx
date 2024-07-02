import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { OgObject, ImageObject } from 'open-graph-scraper/dist/lib/types'




type propsFromPostLinks = {
    urlPreview: OgObject
}




const PreviewCard: React.FC<propsFromPostLinks> = ({ urlPreview }) => {

    const { ogTitle, ogDescription } = urlPreview

    const { ogImage } = urlPreview

    const { url } = ogImage<ImageObject[]>


    return (
        <View
            style={{
                backgroundColor: "#fff",
                width: 928,
                height: 280,
                borderRadius: 14,
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                marginBottom: 20
            }}
        >
            {ogImage && (<Image
                style={{
                    height: 708,
                    width: 1008,
                    borderTopRightRadius: 14,
                    borderTopLeftRadius: 14,
                }}
                source={{ uri: url }}
            />)}

            <TouchableOpacity>
                <View style={{ padding: 5, height: 50 }}>
                    <Text style={{ fontWeight: "medium", paddingTop: 5, paddingBottom: 5 }}>{ogTitle}</Text>
                    <Text>{ogDescription}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default PreviewCard