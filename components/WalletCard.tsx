import { ImageBackground } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import ButtonSecondary from "./ButtonSecondary";

interface WalletCardProps {
  handleWithdraw?: () => void;
  handleDeposit?: () => void;
  showWithdraw?: boolean;
}

const WalletCard = ({
  handleWithdraw,
  handleDeposit,
  showWithdraw = true,
}: WalletCardProps) => {
  return (
    <View className="mt-2.5">
      {/* card image */}
      <ImageBackground
        source={require("@/assets/images/wallet-card.png")}
        contentFit="fill"
        style={{ width: "100%", height: 180 }}
        className="items-center justify-center"
      >
        <View className="flex-1 justify-center">
          <View className="flex-row items-center justify-center gap-3">
            <View>
              <Text className="text-white text-2xl font-sf-pro-medium">
                Available Balance{" "}
              </Text>
              <Text className="text-white text-5xl font-sf-pro-semibold mt-2">
                ₦2652
              </Text>
            </View>

            <View>
              {/* buttons */}
              <ButtonSecondary
                className="px-8"
                title="Deposit"
                onPress={handleDeposit || handleWithdraw}
              />

              {showWithdraw ? (
                <ButtonSecondary
                  title="Withdraw"
                  className="mt-2 px-8"
                  onPress={handleWithdraw}
                />
              ) : null}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WalletCard;
