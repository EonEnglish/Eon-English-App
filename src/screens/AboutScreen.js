import { StyleSheet, Linking } from "react-native";
import Container from "../components/Container";
import InfoCard from "../components/InfoCard";
import { useTranslation } from "react-i18next";
import ProfileButton from "../components/profileButton";

const openFindUsSite = () => {
  const findUsUrl = "https://www.eonenglish.org";
  return Linking.openURL(findUsUrl);
};

const openGetInvolvedSite = () => {
  const getInvolvedUrl = "https://www.eonenglish.org/chinese";
  return Linking.openURL(getInvolvedUrl);
};

export const AboutScreen = () => {
  const { t } = useTranslation();
  const aboutText =
    t("about.aboutText1") + t("about.aboutText2") + t("about.aboutText3");
  // "English. We aim to provide this opportunity to kids who don’t have enough access to English learning " +
  // "material. Through this program, students get to learn how to speak native English and about Western " +
  // "culture.";

  return (
    <Container style={styles.aboutContainer}>
      <InfoCard
        title={t("about.aboutTitle")}
        titleStyle={styles.aboutTitle}
        text={aboutText}
        textStyle={styles.aboutText}
      />
      <ProfileButton
        text={t("profile.findUs")}
        onPress={() => openFindUsSite()}
        style={styles.findUsButton}
        styleText={{ color: "white", fontWeight: 800 }}
      />
      <ProfileButton
        text={t("profile.getInvolved")}
        onPress={() => openGetInvolvedSite()}
        style={styles.getInvolvedButton}
        styleText={{ color: "white", fontWeight: 800 }}
      />
    </Container>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  aboutContainer: {
    justifyContent: "center",
  },
  aboutTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  aboutText: {
    fontWeight: 500,
    textAlign: "center",
  },
  findUsButton: {
    backgroundColor: "#007BFF",
  },
  getInvolvedButton: {
    backgroundColor: "#007BFF",
  },
});
