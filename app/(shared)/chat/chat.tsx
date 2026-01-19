import ChatHeader from "@/components/ChatHeader";
import TrackingCard from "@/components/TrackingCard";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "driver";
  timestamp: string;
  isButton?: boolean;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, I'm FitBot! 👋 I'm your personal sport assistant. How can I help you?",
      sender: "driver",
      timestamp: "Wed 8:21 AM",
    },
    {
      id: "2",
      text: "Show me other options",
      sender: "driver",
      timestamp: "Wed 8:21 AM",
      isButton: true,
    },
    {
      id: "3",
      text: "Ok, how about these?",
      sender: "driver",
      timestamp: "Wed 8:22 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      // Simulate driver response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message! I will respond shortly.",
          sender: "driver",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `Shared ${action}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#d3e6ff38]" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <ChatHeader />

        {/* Tracking Card */}
        <TrackingCard />

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          {messages.map((message, index) => {
            const showTimestamp =
              index === 0 ||
              messages[index - 1].timestamp !== message.timestamp;

            return (
              <View key={message.id}>
                {showTimestamp && (
                  <Text className="text-center text-gray-500 text-xs mb-3">
                    {message.timestamp}
                  </Text>
                )}

                {message.sender === "driver" ? (
                  <View className="flex-row mb-4">
                    <View className="w-8 h-8 rounded-full bg-gray-200 mr-2">
                      <Image
                        source={{ uri: "https://i.pravatar.cc/100?img=12" }}
                        className="w-8 h-8 rounded-full"
                      />
                    </View>
                    {message.isButton ? (
                      <TouchableOpacity className="bg-blue-500 rounded-3xl px-6 py-3 max-w-[80%]">
                        <Text className="text-white font-medium">
                          {message.text}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View className="bg-gray-100 rounded-3xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <Text className="text-gray-800 font-sf-pro-semibold">
                          {message.text}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="flex-row justify-end mb-4">
                    <View className="bg-blue-500 rounded-3xl rounded-tr-none px-4 py-3 max-w-[80%]">
                      <Text className="text-white">{message.text}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Input Section */}
        <View className="bg-[#d3e6ff38] px-4 py-1.5 flex-row items-center gap-3 border-t border-gray-100">
          <TouchableOpacity
            onPress={() => setShowQuickActions(!showQuickActions)}
          >
            <Ionicons
              name={showQuickActions ? "close" : "add"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <View className="flex-1 bg-white rounded-full px-3">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message"
              placeholderTextColor="#9CA3AF"
              className="font-sf-pro-regular text-base"
              multiline
              maxLength={500}
              onFocus={() => setShowQuickActions(false)}
            />
          </View>

          {/* Change from camera icon to send button based on input */}
          <TouchableOpacity onPress={handleSend}>
            {inputText.trim() ? (
              <Ionicons name="send" size={24} color="#3B82F6" />
            ) : (
              <Ionicons name="camera-outline" size={24} color="#000" />
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Actions - Shows when plus is pressed */}
        {showQuickActions && (
          <View className="bg-white px-4 py-3 flex-row gap-4 border-t border-gray-100">
            <TouchableOpacity
              onPress={() => {
                handleQuickAction("Photo");
                setShowQuickActions(false);
              }}
              className="items-center"
            >
              <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="images" size={24} color="#3B82F6" />
              </View>
              <Text className="text-xs text-gray-600">Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleQuickAction("Camera");
                setShowQuickActions(false);
              }}
              className="items-center"
            >
              <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="camera" size={24} color="#3B82F6" />
              </View>
              <Text className="text-xs text-gray-600">Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleQuickAction("Location");
                setShowQuickActions(false);
              }}
              className="items-center"
            >
              <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="location" size={24} color="#3B82F6" />
              </View>
              <Text className="text-xs text-gray-600">Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
