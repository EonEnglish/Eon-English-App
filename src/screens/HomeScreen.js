import { collection, getDocs } from "@firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Container from "../components/Container";
import InfoCard from "../components/InfoCard";
import { Loading } from "../components/Loading";
import { db } from "../services/firebase";

export const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (announcements.length) {
      return;
    }

    const fetchHome = async () => {
      try {
        const announcementSnap = await getDocs(
          collection(db, "Home Page", "Announcement", "Collection"),
        );
        if (announcementSnap.empty) {
          return;
        }

        const announcementData = announcementSnap.docs.map((doc) => doc.data());
        setAnnouncements([...announcementData]);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchHome().finally(() => {
      setLoading(false);
    });
  }, [isFocused, announcements]);

  return (
    <Loading isLoading={isLoading}>
      <ScrollView>
        <Container>
          <InfoCard
            title="Welcome to Season 16!"
            titleStyle={styles.subtitle}
            containerStyle={styles.subtitleContainer}
          />
          {announcements.length ? (
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
            <Text style={styles.noAnnouncementText}>
              No announcement for now
            </Text>
          )}
        </Container>
      </ScrollView>
    </Loading>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

export default HomeScreen;

const styles = StyleSheet.create({
  subtitleContainer: {
    alignItems: "center",
    backgroundColor: "#0782F9",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
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
