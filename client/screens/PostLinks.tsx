import { SafeAreaView, View, Text, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { viewHomeStyle, textScreenHome, textInputStyled } from './screenStyles/screenStyles'
import FooterTabs from '../component/nav/FooterTab'

import SubmitButton from '../component/auth/SubmitButton'
import PreviewCard from '../component/links/PreviewCard'
import ogs, { SuccessResult, ErrorResult } from "open-graph-scraper"
// import Options from "open-graph-scraper"
import urlRegex from 'url-regex'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

const PostLinks: React.FC = () => {

    const [link, setLink] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [urlPreview, setUrlPreview] = useState<OgObject | null>(null)


    // Function to grab the user input and
    // set the state
    const handleChange = async (text: string) => {
        try {

            setLoading(true);
            setLink(text);
            // The setTimeout takes 2 argument, the callback function
            //  and the duration
            setTimeout(() => {
                console.log("LINK PASTED BY USER =>", text);
            }, 1000)

            // Web scraping function, the video was broken
            // had to look it up in his github. Check out how to
            // use open graph web scraping client

            // Download npm i url-regex, open-graph-scraper --save
            if (urlRegex({ strict: false }).test(text)) {
                
                const Options = { url: text };
                const { result } = await ogs(Options) as SuccessResult | ErrorResult;

                if (result.success) {
                    setUrlPreview(result)
                } else {
                    setUrlPreview(null)
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    // Function to send to the backend
    const handleSubmit = async () => {
        console.log("title and link =>", title, link);
    }

    return (
        <SafeAreaView style={viewHomeStyle.container}>
            <ScrollView>
                <Text
                    style={textScreenHome.container}
                >
                    PASTE WEBSITE URL
                </Text>

                <TextInput
                    style={textInputStyled.container}
                    value={link}
                    onChangeText={text => handleChange(text)}
                    placeholder='Paste the url'
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={textInputStyled.container}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    placeholder='Give it a title'
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />

                {urlPreview && (<View style={{ marginTop: 30, alignItems: "center" }}>
                    <PreviewCard urlPreview={urlPreview} />
                </View>)}

                <View>
                    <SubmitButton
                        title='Submit'
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </View>


                <Text>
                    {
                        JSON.stringify(urlPreview, null, 4)
                    }
                </Text>

            </ScrollView>


            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterTabs />
            </View>
        </SafeAreaView>
    )
}

export default PostLinks

