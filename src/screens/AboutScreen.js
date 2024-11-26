import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../components/Container';
import InfoCard from '../components/InfoCard';
import { useTranslation } from "react-i18next";

const AboutScreen = () => {
  const { t } = useTranslation();
  const something = t("profile.saveChanges");
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
    </Container>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  aboutContainer: {
    justifyContent: 'center',
  },
  aboutTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  aboutText: {
    fontWeight: 500,
    textAlign: 'center',
  },
});
