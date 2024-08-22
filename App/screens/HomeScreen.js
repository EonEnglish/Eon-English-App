import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
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
        const Collection = await getDocs(collection(db, "Home Page"));
        if (!Collection.empty) {
          Collection.forEach(async (doc) => {
            if (doc.id === 'Announcement') {
              const subCollection = await getDocs(collection(doc.ref, 'Collection'));
              try {
                const announcement = subCollection.docs.map(doc => doc.data());
                if (announcement.length === 0) {
                  setAnnouncementsExist(false);
                } else {
                  setAnnouncements(announcement);
                  setAnnouncementsExist(true);
                }
              } catch (error) {
                setAnnouncementsExist(false);
              }
            }
          });
        } else {
          console.log('No documents found in the Home Page collection.');
          setAnnouncementsExist(false);
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
        <View>
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
        </View>
      </Container>
    </ScrollView>
  )
}

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
    marginBottom: -20,
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