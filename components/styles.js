import styled from "styled-components";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
  primary: "#144B38",
  secondary: "#ffffff",
  black: "#000000",
  grey: "#999595",
  greyText: "#4A4949",
  blue: "#1F51FF",
};

const { primary, secondary, black, grey, greyText, blue } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%
    align-items: center;
`;

export const InnerContainerLogin = styled.View`
    padding-top: ${StatusBarHeight}px;
    flex: 1;
    width: 100%
    align-items: center;
`;

export const LoginIntro = styled.View`
  flex: 0.5;
  padding: 16px;
  backgroundcolor: "transparent";
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  margin: auto;
  border-color: ${secondary};
`;

export const ProfileImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const PageLogo = styled.Image`
  width: 180px;
  height: 130px;
  margin-top: 60px;
`;

export const PageTitle = styled.Text`
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: ${secondary};
  padding-top: 16px;

  ${(props) =>
    props.profile &&
    `
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 36px;
        color: ${primary};
    `}
`;

export const PageTitleReset = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${primary};
  padding-top: 16px;
  margin-top: 150px;
  margin-left: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${secondary};

  ${(props) =>
    props.profile &&
    `
        margin-bottom: 5px;
        font-weight: normal;
        color: ${black}
    `}
`;

export const SubtitleReset = styled.Text`
  font-size: 14px;
  margin-top: 14px;
  margin-left: 22px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${secondary};
`;

export const SubtitleReset1 = styled.Text`
  font-size: 14px;
  margin-left: 22px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${secondary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledFormAreaReset = styled.View`
  width: 90%;
  margin-left: 20px;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${grey};
  padding: 15px;
  padding-left: 55px;
  border-radius: 10px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${black};
`;

export const StyledInputLabel = styled.Text`
  color: ${secondary};
  font-size: 16px;
  text-align: left;
  margin-bottom: 8px;
`;

export const StyledTextMeterCapturingInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  margin-left: 16px;
  width: 100%;
  color: ${black};
`;

export const StyledInputMeterCapturingLabel = styled.Text`
  color: ${black};
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 8px;
  margin-left: 16px;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 42px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${primary};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-vertical: 5px;
  margin-top: 14px;
  height: 55px;
`;

export const StyledButton2 = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${primary};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-vertical: 5px;
  margin-top: 14px;
  margin-left: 16px;
  margin-right: 16px;
  height: 50px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${secondary};
  font-size: 18px;
  margin-bottom: 5px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${secondary};
`;

export const Line = styled.Text`
  height: 1px;
  width: 100px;
  background-color: ${black};
  margin-vertical: 10px;
`;

export const ShadeCover = styled.View`
  postion: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${secondary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${blue};
  font-size: 15px;
  margin-left: 5px;
`;

export const AppBackground = styled.ImageBackground.attrs({
  source: require("./../assets/image_bg.png"),
})`
  flex: 1;
  align-item: center;
  jutify-content: center;
`;

export const ProfileContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;
