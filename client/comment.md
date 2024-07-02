# The below is as a result of assigning a string to a setstate that is been passed as a props

```Typescript
 Type 'Dispatch<SetStateAction<string>>' is not assignable to type 'string'.
```

## And what worked for the interface where the setState is been received is the below

```Typescript
interface propsFromSignUp{
   name: string
    value: string
    setValue: React.Dispatch<string>
 }
```

```Typescript
  <Text>
        {JSON.stringify(
          {
            name,
            email,
            password,
          },
          null,
          4
        )}
      </Text>
```

## Interface

```Typescript
interface propsFromSignUp {
  name: string;
  value: string;
  setValue: React.Dispatch<string>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoCompleteType?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' | 'postal-code' | 'cc-number';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search';
  secureTextEntry?: boolean;
}
```

## StackNavigationProp is a type that represents the navigation prop passed to screen components within a stack navigator. This navigation prop includes methods and properties for navigating between screens within the same stack

### The StackNavigationProp type includes the following properties related to navigation

#### navigate: Navigates to a route in the same stack

#### push: Pushes a new route onto the stack

#### replace: Replaces the current route with a new one

#### goBack: Goes back to the previous screen in the stack

#### pop: Pops the current screen from the stack

#### popToTop: Pops all screens from the stack except the first one

#### addListener: Adds a listener for navigation events

#### removeListener: Removes a previously added listener

#### // console.log("NAVIGATION =>", navigation)

## After creating this

```Typescript
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>,
  
```

## you will have to pass navigation as props to the the route, Sign In and Sign Up.  To ensure TypeScript understands what the navigation prop should look like, you need to define the types properly

### Define the Root Stack Param List: This specifies the types of parameters expected by each route in your stack navigator

### Type the Navigation Props: Use the StackScreenProps type to define the navigation and route props for your screen components

### Implement the Screen Components: Define the screen components with the correct types for their props

```Typescript
// Define the RootStackParamList with all possible routes and their parameters
type RootStackParamList = {
  SignUp: undefined; // SignUp screen expects no parameters
  SignIn: undefined; // SignIn screen expects no parameters
};

```

## Use the rootstackparamlist where you navigation container is used

```Typescript
const Stack = createNativeStackNavigator<RootStackParamList>();

This is the Index/App component
```

### Define the screen component with proper type by using rootstackparamlist and stackscreen

### StackScreenProps is a utility type provided by React Navigation that combines both the navigation and route props for a screen in a stack navigator. This helps to ensure that your screen components are correctly typed and can access navigation methods and route parameters

#### When you define a screen in a stack navigator, React Navigation provides two props to the screen component

#### 1> navigation prop: Allows you to navigate between different  #### screens

#### 2> route prop: Contains information about the current route,  #### including any parameters passed to it

#### StackScreenProps helps to type these props correctly based on your navigation structure. It ensures that TypeScript knows what methods and properties are available on the navigation and route props for a specific screen

#### Define the Root Stack Param List: This specifies all possible routes in your stack navigator and the parameters they expect

#### Use StackScreenProps: This utility type is used to type the props for each screen component

```Typescript
import { StackScreenProps } from "@react-navigation/stack";

// Define the RootStackParamList
type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

// Use StackScreenProps to get the type for the props of SignUp screen
type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {

```

## Checking Async Storage

```Typescript
  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem('@auth')
    console.log("FROM ASYNC STORAGE =>", data)
  }

  loadFromAsyncStorage();
```

### Manually adding axios header

```Javascript
 let token  = state && state.token ? state.token : "";

    // Send to backend for uploading to cloudinary
    const { data } = await axios.post('/upload-image', {
      image: base64Image
    }
    ,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
```

## Response

### 401 Unauthorized error

## Using Og web scraper with TS

```Javascript
 if (urlRegex({ strict: false }).test(text)) {
                ogs({ url: text }, (error, results, response) => {
                    console.log(error);
                    console.log(results);
                    console.log(response);

                    if (results.success) {
                        setUrlPreview(results)
                    }
                    setLoading(false)
                });
            } else {
                setLoading(false)
            }


// New method used in the PostLinks component
if (urlRegex({strict: false}).test(text)){
  // The options var take in the url to be scraped and it has been annotated
  // to the text variable that is a string
                const options: Options = { url: text };
                // The SuccessResult | ErrorResult is type of object with the 
                // below keys and values
                // type SuccessResult = {
                        // error: false;
                        // html: string;
                        // response: object;
                        // result: OgObject;
                        // }

                // type ErrorResult = {
                        // error: true;
                        // html: undefined;
                        // response: undefined;
                        // result: OgObject;
                      // }

                // The result key has been destructured from the SuccessResult | ErrorResult type
                const { result } = await ogs(options) as SuccessResult | ErrorResult;
                // The below if check, checks if the result returned from result
                // is a success
                if (result.success) {
                  // And then the setState urlPreview is used 
                    setUrlPreview(result)
                } else {
                setLoading(false)
            }
}


```

### Property 'urlPreview' is missing in type '{}' but required in type 'propsFromPostLinks'.ts(2741)

### PreviewCard.tsx(6, 5): 'urlPreview' is declared here

#### <PreviewCard {...urlPreview} />

### So the value in urlPreview is from the key result

### in the ""type SuccessResult or ErrorResult"" object

```JSON
{
  "ogTitle": "Example Page",
  "ogType": "website",
  "ogUrl": "https://example.com",
  "ogDescription": "This is an example page for demonstration purposes.",
  "ogImage": {
    "url": "https://example.com/image.jpg",
    "width": 1200,
    "height": 630,
    "type": "image/jpeg"
  },
  "ogVideo": {
    "url": "https://example.com/video.mp4",
    "width": 1280,
    "height": 720,
    "type": "video/mp4"
  },
  "ogAudio": "https://example.com/audio.mp3",
  "ogLocale": "en_US",
  "ogSiteName": "Example Site"
}

```
