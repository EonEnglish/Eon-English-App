import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";

const LANGUAGES = [];

export const LanguageSelector = ({
  label,
  value,
  onValueChange,
  languages = LANGUAGES,
  excludeValue,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { t } = useTranslation();
  const { displayLanguage, nativeLanguage } = useLanguage();

  // Determine which language to use for displaying names
  const displayInLanguage =
    displayLanguage === "native" ? nativeLanguage : value || "en";

  const selectedLanguage = languages.find((lang) => lang.code === value);

  // Filter out excluded language if specified
  const availableLanguages = languages.filter(
    (lang) => lang.code !== excludeValue,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        {selectedLanguage ? (
          <View style={styles.selectedLanguage}>
            <Text style={styles.flag}>{selectedLanguage.flag}</Text>
            <Text style={styles.languageName}>
              {selectedLanguage.name[displayInLanguage]}
            </Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>{t("language.select")}</Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("language.selectLanguage")}
            </Text>

            <ScrollView style={styles.languageList}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    value === language.code && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onValueChange(language.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text
                    style={[
                      styles.languageOptionText,
                      value === language.code && styles.selectedOptionText,
                    ]}
                  >
                    {language.name[displayInLanguage]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

LanguageSelector.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  languages: PropTypes.array,
  excludeValue: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectedLanguage: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    color: "#999",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  languageList: {
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#f0f8ff",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default LanguageSelector;
