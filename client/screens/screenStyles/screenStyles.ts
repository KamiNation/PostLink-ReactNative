import { StyleSheet } from "react-native";

// Sign up component styles starts here




// Style for first view in signup component
export const mainScrollView = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export const mainView = StyleSheet.create({
  container: {
    marginVertical: 100,
  },
});





// Style for TextInput view
export const inputView = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
});

export const textInputStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "green",
    marginBottom: 30,
  },
});

export const textOpacity = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 24,
  },
});




// Style for text "Signup Form"
export const styleText = StyleSheet.create({
  container: {
    fontSize: 30,
    color: "green",
    // flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export const textSubmit = StyleSheet.create({
  container: {
    fontWeight: "bold",
    color: "green",
    fontSize: 19,
    justifyContent: "center",
    textAlign: "center",
  },
});


export const alreadyJoined = StyleSheet.create({
  container:{
    fontSize: 18,
    textAlign: "center"
  }
})


export const signInText = StyleSheet.create({
  container: {
    color: "green"
  }
})


export const forgetPass = StyleSheet.create({
  container:{
    fontSize: 18,
    textAlign: "center",
    color: "blue",
    marginTop: 10
  }
})
// Sign up component styles ends here







// CircleImage style for image
export const photoImageStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginVertical: 50,
    borderRadius: 50,
  }
});

export const circleImageView = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  }
});
// 



// Footer tabs styles
export const viewFooterTabsStyle = StyleSheet.create({
  container:{
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "space-between"
  }
})

// Home style
export const viewHomeStyle = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: "space-between"
  }
}) 


// text screen style for all screen
export const textScreenHome = StyleSheet.create({
  container: {
    paddingTop: 30,
    fontWeight: "light",
    flex: 1,
    textAlign: "center"
  }
})

// text input style for postLinks
export const textInputStyled = StyleSheet.create({
  container: {
    borderColor: "green",
    borderWidth: 1,
    height: 50,
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 30,
    padding: 15
  }
})