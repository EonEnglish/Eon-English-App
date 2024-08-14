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
    <Container style={styles.container}>
      <InfoCard
        title="About"
        titleStyle={styles.title}
        text={aboutText}
        textStyle={styles.text}
        footerStyle={styles.footer}
      />
    </Container>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    fontWeight: 500,
  },
  footer: {
    marginTop: 0,
  },
});
