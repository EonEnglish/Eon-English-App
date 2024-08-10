import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { getDocs, collection } from '@firebase/firestore';
import { db } from "../firebase";
import Container from '../components/Container';

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
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Welcome to Season 16!</Text>
          </View>
        <View>
          <Text style={styles.announcement}>Announcement:</Text>
          {announcementsExist ? (
            announcements.map((announcement, index) => (
              <View key={index} style={styles.announcementContainer}>
                <View>
                  <Text style={styles.announcementTitleText}>{announcement.title}</Text>
                  <Text style={styles.announcementText}>{announcement.announcement}</Text>
                  <Text style={styles.announcementDateText}>Date: {announcement.date}</Text>
                </View>
              </View>
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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100, // Adds padding to the top to move everything down
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#8E8E8F',
  },
  subtitleContainer: {
    backgroundColor: '#8D56FF',
    paddingVertical: 20, // Increase the padding to make the box bigger
    paddingHorizontal: 100, // Increase the padding to make the box bigger
    borderRadius: 10,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 24, // Increase the font size to make the text bigger
    color: '#FFF',
  },
  textContainer: {
    alignItems: 'center',
    padding: 20,
  },
  announcementContainer: {
    //backgroundColor: '#1787A9', // original teal 
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20, // Add some bottom margin for separation
  },
  announcement: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center', // Center align the announcement text
  },
  announcementTitleText: {
    fontSize: 17,
    textAlign: "left",
    color: '#ffffff', // White color for the announcement text
    marginBottom: 5,
  },
  announcementText: {
    lineHeight: 22,
    fontSize: 15,
    textAlign: "left",
    color: '#ffffff', // White color for the announcement text
    fontWeight: '300', // Set a lighter weight, such as 300 for a skinnier appearance
  },
  announcementDateText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "right",
    fontStyle: 'italic',
    color: '#ffffff', // White color for the announcement text
  },
  noAnnouncementText: {
    fontSize: 20,
  },
  mission: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
});