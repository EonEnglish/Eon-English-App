// screens/ProfileScreen.js
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import ProfileButton from "../components/profileButton";
import Container from "../components/Container";
import LanguageSelector from "../components/LanguageSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../components/i18n/config";
import { useLanguage } from "../components/LanguageContext";
import { RadioButton } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [deletingAccount, setDeletingAccount] = useState(false);
  const { t } = useTranslation();
  const {
    nativeLanguage,
    targetLanguage,
    displayLanguage,
    updateLanguagePreferences,
  } = useLanguage();

  const [tempNative, setTempNative] = useState(nativeLanguage);
  const [tempTarget, setTempTarget] = useState(targetLanguage);
  const [tempDisplay, setTempDisplay] = useState(displayLanguage);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login", { manualLogOut: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: handleDeleteAccount },
      ],
      { cancelable: false },
    );
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    if (user) {
      setDeletingAccount(true);
      user
        .delete()
        .then(() => {
          setDeletingAccount(false);
          Alert.alert("Success", "Account successfully deleted");
          navigation.replace("Login");
        })
        .catch((error) => {
          setDeletingAccount(false);
          Alert.alert("Error", error.message);
        });
    } else {
      Alert.alert("Error", "No user is currently authenticated");
    }
  };

  const saveLanguagePreferences = async () => {
    if (!tempNative || !tempTarget) {
      Alert.alert(t("common.error"), t("profile.selectBothLanguages"));
      return;
    }

    const success = await updateLanguagePreferences(
      tempNative,
      tempTarget,
      tempDisplay,
    );

    if (success) {
      Alert.alert(t("profile.success"), t("profile.languagePreferencesSaved"));
    } else {
      Alert.alert(t("common.error"), t("profile.failedToSave"));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Container style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.languageSection}>
              <LanguageSelector
                label={t("profile.nativeLanguage")}
                value={tempNative}
                onValueChange={setTempNative}
                languages={LANGUAGES}
              />
              <LanguageSelector
                label={t("profile.targetLanguage")}
                value={tempTarget}
                onValueChange={setTempTarget}
                languages={LANGUAGES}
                excludeValue={tempNative}
              />
              <View style={styles.displayPreference}>
                <Text style={styles.label}>{t("profile.displayLanguage")}</Text>
                <RadioButton.Group
                  onValueChange={(value) => setTempDisplay(value)}
                  value={tempDisplay}
                >
                  <View style={styles.radioOption}>
                    <RadioButton.Item
                      label={t("profile.nativeLanguage")}
                      value="native"
                    />
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton.Item
                      label={t("profile.targetLanguage")}
                      value="target"
                    />
                  </View>
                </RadioButton.Group>
              </View>
              <ProfileButton
                text={t("profile.saveChanges")}
                onPress={saveLanguagePreferences}
                style={styles.saveButton}
              />
            </View>
            <ProfileButton
              text={t("profile.about")}
              onPress={() => navigation.navigate("AboutScreenStack")}
              style={styles.aboutButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
            <ProfileButton
              text={t("profile.getInvolved")}
              style={styles.getInvolvedButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
            <ProfileButton
              text={t("profile.findUs")}
              style={styles.findUsButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
            <ProfileButton
              text={t("profile.resetPassword")}
              onPress={() => navigation.navigate("PasswordResetScreenStack")}
              style={styles.resetPasswordButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
            <ProfileButton
              text={t("profile.logOut")}
              onPress={handleSignOut}
              style={styles.logOutButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
            <ProfileButton
              text={t("profile.deleteAccount")}
              onPress={confirmDeleteAccount}
              style={styles.deleteAccountButton}
              styleText={{ color: "white", fontWeight: 800 }}
            />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  languageSection: {
    marginBottom: 20,
    width: "100%",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  aboutButton: {
    backgroundColor: "#2e2e2e",
  },
  getInvolvedButton: {
    backgroundColor: "#2e2e2e",
  },
  findUsButton: {
    backgroundColor: "#2e2e2e",
  },
  resetPasswordButton: {
    backgroundColor: "#9f47fc",
  },
  logOutButton: {
    backgroundColor: "#007BFF",
  },
  deleteAccountButton: {
    backgroundColor: "#fa4343",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },
  displayPreference: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginVertical: 5,
  },
  toggleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
