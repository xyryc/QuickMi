import { ImageBackground } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import ButtonSecondary from "./ButtonSecondary";

const WalletCard = ({ handleWithdraw }: any) => {
  return (
    <View className=" mt-2.5">
      {/* card image */}
      <ImageBackground
        source={require("@/assets/images/wallet-card.png")}
        contentFit="contain"
        style={{ width: "100%", height: 180 }}
        className="items-center justify-center "
      >
        <View className="flex-1 justify-center">
          <View className="flex-row items-center justify-between pr-2 pl-5">
            <View>
              <Text className="text-white text-2xl font-sf-pro-medium">
                Available Balance{" "}
              </Text>
              <Text className="text-white text-5xl font-sf-pro-semibold mt-2">
                $ 2652
              </Text>
            </View>
            <View>
              {/* buttons */}
              <ButtonSecondary
                title={"Deposits"}
                className={"px-8"}
                onPress={handleWithdraw}
              />
              <ButtonSecondary
                title={"Withdraw"}
                className={"px-8 mt-2"}
                onPress={handleWithdraw}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WalletCard;
