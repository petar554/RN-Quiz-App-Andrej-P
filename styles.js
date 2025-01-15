import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },

  buttonContainer: {
    marginVertical: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",
  },

  row: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 5,
  },

  hover: {
    position: "absolute",
    bottom: 4,
    right: 2,
    paddingVertical: 6,
    paddingHorizontal: 6,
  }
});

export const cardColors = [
  {
    //pink
    light: "#EAB5D0",
    accent: "#E43A8A",
    dark: "#98245B",
    mid: "#E43A8A",
    disabled: "#F2D7E7"
  },

  {
    //teal
    light: "#B8DDE6",
    accent: "#1DB9DC",
    dark: "#02677E",
    mid: "#07A7CB",
    disabled: "#DBF0F5"
  },
 
  {
    //purple 
    light: "#B9C6EE",
    accent: "#5F62A9",
    dark: "#36387B",
    mid: "#5F62A9",
    disabled: "#DCE2F6"
  },
  
  {
    //yellow
    light: "#F6DCB6",
    accent: "#F9B21C",
    dark: "#946502",
    mid: "#F9B21C",
    disabled: "#FAF0E0"
  }
]

