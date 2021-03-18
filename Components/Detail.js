import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ArrayTool, storeService } from "../fBase";

const Detail = ({ route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const collegeData = route.params;

  const onSendMsgBtnClick = async () => {
    await storeService
      .collection("colleges")
      .doc(collegeData.id)
      .update({ comments: ArrayTool.arrayUnion(message) });
    setMessage("");
  };
  return (
    <View>
      <TextInput
        placeholder={"Message"}
        onChange={(e) => setMessage(e.target.value)}
        required={true}
        value={message}
      />
      <Button title={"Write"} onPress={onSendMsgBtnClick} />
    </View>
  );
};

export default Detail;
