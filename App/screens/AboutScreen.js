import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../components/Container';
import InfoCard from '../components/InfoCard';

const AboutScreen = () => {
  const aboutText = 
    "Eon English is a non-profit organization that teaches kids from China and Spanish-speaking countries " +
    "English. We aim to provide this opportunity to kids who don’t have enough access to English learning " +
    "material. Through this program, students get to learn how to speak native English and about Western " +
    "culture.";

  return (
    <Container style={styles.aboutContainer}>
      <InfoCard
        title="About"
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
