import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Create a configuration object with your API key
  const configuration = new Configuration({
    apiKey: "YOUR API KEY HERE",
  });

  // Create an instance of the API class
  const openai = new OpenAIApi(configuration);

  // Call the API to generate n images from a prompt
  const generateImage = async () => {
    setLoading(true);
    try {
      const res = await openai.createImage({
        prompt: text,
        n: 1,
        size: "512x512",
      });
      setLoading(false);
      setResult(res.data.data[0].url);
    } catch (error) {
      setLoading(false);
      console.error(`Error generating image: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.title}>
          Give a detailed description of what you want to create.
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setText(text)}
          placeholder="Describe your idea"
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={4}
        />

        {/* Show loading indicator while generating image */}
        {loading ? <ActivityIndicator color={"white"} /> : <></>}

        {/* Show image if generated */}
        {result.length > 0 ? (
          <Image style={styles.image} source={{ uri: result }} />
        ) : (
          <></>
        )}

        <TouchableOpacity
          title="Generate Image"
          onPress={generateImage}
          disabled={loading}
        >
          <Text style={styles.text}>Generate new Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  textInput: {
    color: "#fff",
    backgroundColor: "transparent",
    padding: 20,
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 350,
    alignSelf: "center",
    marginTop: 40,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 40,
  },
});
