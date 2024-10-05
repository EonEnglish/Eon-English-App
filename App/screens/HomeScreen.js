import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { getDocs, collection } from '@firebase/firestore';
import { db } from "../firebase";
import Container from '../components/Container';
import InfoCard from '../components/InfoCard';

const HomeScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsExist, setAnnouncementsExist] = useState(true);
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const homePageCollection = await getDocs(collection(db, "Home Page"));
        if (homePageCollection.empty) {
          console.log('No documents found in the Home Page collection.');
          setAnnouncementsExist(false);
          return;
        }
        const announcementDoc = homePageCollection.docs.find(doc => doc.id === 'Announcement');
        if (!announcementDoc) {
          setAnnouncementsExist(false);
          return;
        }
        const subCollection = await getDocs(collection(announcementDoc.ref, 'Collection'));
        const announcementData = subCollection.docs.map(doc => doc.data());
        if (announcementData.length === 0) {
          setAnnouncementsExist(false);
        } else {
          setAnnouncements(announcementData);
          setAnnouncementsExist(true);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncementsExist(false);
      }
    };
    fetchHome();
  }, []);
  if (announcements.length === 0 && announcementsExist) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <Container>
        <InfoCard
          title='Welcome to Season 16!'
          titleStyle={styles.subtitle}
          containerStyle={styles.subtitleContainer}
        />
        {announcementsExist ? (
          announcements.map((announcement, index) => (
            <InfoCard
              key={index}
              title={announcement.title}
              titleStyle={styles.announcementTitle}
              text={announcement.announcement}
              footer={announcement.date}
              footerStyle={styles.announcementFooter}
            />
          ))
        ) : (
          <Text style={styles.noAnnouncementText}>No announcement for now</Text>
        )}
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  subtitleContainer: {
    alignItems: 'center',
    backgroundColor: '#8D56FF',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -30,
  },
  noAnnouncementText: {
    fontSize: 20,
  },
  announcementFooter: {
    marginTop: 10,
  },
  announcementTitle: {
    marginBottom: 10,
  },
});
