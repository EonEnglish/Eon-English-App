import { React, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const ScheduleScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weChatID, setWeChatID] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [userLessonSelect, setUserLessonSelect] = useState('');
  const [userTypeSelect, setUserTypeSelect] = useState('');
  const [userScheduleSelect, setUserScheduleSelect] = useState('');
  const [schedule, setSchedule] = useState([]);
  const types = [{ key: '1', value: 'Homework Help' }, { key: '2', value: 'Interview' }];

  const lessons = [
    { key: '1', value: 'Lesson 1: Where are you going?' },
    { key: '2', value: 'Lesson 2: Time for School' },
    { key: '3', value: 'Lesson 3: Sports' },
    { key: '4', value: 'Lesson 4: Music and Art' },
    { key: '5', value: 'Lesson 5: Home' },
    { key: '6', value: 'Lesson 6: Meals' },
    { key: '7', value: 'Lesson 7: Fast Food' },
    { key: '8', value: 'Lesson 8: Review' },
    { key: '9', value: 'Lesson 9: Nature' },
    { key: '10', value: 'Lesson 10: Animals' },
    { key: '11', value: 'Lesson 11: Shopping' },
    { key: '12', value: 'Lesson 12: Birthdays' },
    { key: '13', value: 'Lesson 13: Holidays' },
    { key: '14', value: 'Lesson 14: Review' },
  ];

  // retriving info from google sheets
  useEffect(() => {
    const sheetId = '1wngAL_hQHF5ZSbBCxN4HFoOdF1i6C5cCUCiu3axBL-4';
    const sheetKey = 'AIzaSyDzPg7CNDgNARxvCj6gJiTkF_kyDYCszCI';
    const sheetRange = 'InterviewSheet';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetRange)}?key=${sheetKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { values } = data;
        const newCoachData = values.slice(1);
        const newCoachDataFiltered = newCoachData.map((item, index) => {

          // splitting times
          const time = `${item[2]}`;
          const timeParts = time.split(/[: ]/);
          const timeHours = timeParts[0];
          const timeMinutes = timeParts[1];
          const timePeriod = timeParts[3];

          // splitting duration
          const duration = `${item[3]}`;
          const durationParts = duration.split(/[: ]/);

          // time lapse
          const timeLapseHours = parseFloat(durationParts[0]) + parseFloat(timeParts[0]);
          const timeLapseMinutes = `${parseFloat(durationParts[1]) + parseFloat(timeParts[1])}`;
          const timeLapse = timeLapseMinutes <= 1 ? `${timeLapseHours}:${0}${0}` : `${timeLapseHours}:${timeLapseMinutes}`;

          return {
            key: (index + 1).toString(),
            value: `From ${timeHours}:${timeMinutes} to ${timeLapse} ${timePeriod}`
          };
        });

        // display times
        setSchedule(newCoachDataFiltered);
      })
      .catch((error) => console.error("Bad request:", error));
  }, []);


  const handleSubmit = () => {
    const appScriptCode = 'https://script.google.com/home/projects/13zUV6K4gwUteE-Sx5sElf9af0yxVWFgCkOyZLZ7WjVAWcy3UBr-FQslA/edit'; // source code URL
    const appScriptURL = "https://script.google.com/macros/s/AKfycbztbgwE-w-2IkH-zj1jzAYckwnHmcQNMVdtnd9Ds65aoaUXFukq2xkqe8zBtiyshGRu/exec";

    const formScheduleData = {
      Name: name,
      Email: email,
      WeChat: weChatID,
      Type: types[userTypeSelect - 1].value,
      SelectedTime: schedule[userScheduleSelect - 1].value,
      AdditionalNotes: userMessage,
    };

    fetch(appScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(formScheduleData).toString()
    })
      .then((response) => console.log('Submission complete!'))
      .catch((error) => console.error(error));
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
      <View>
        <Text style={styles.title}>Schedule</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first & last name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>WeChat ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter WeChat ID"
          onChangeText={setWeChatID}
          value={weChatID}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>How can we assist you?</Text>
        <SelectList
          data={types}
          setSelected={setUserTypeSelect}
          placeholder='Select type'
          boxStyles={styles.input}
          dropdownStyles={styles.input}
          dropdownItemStyles={styles.dropdownInput}
        />
      </View>
      {userTypeSelect === types[0].key &&
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Specify which lesson</Text>
          <SelectList
            data={lessons}
            setSelected={setUserLessonSelect}
            placeholder='Select lesson'
            boxStyles={styles.input}
            dropdownStyles={styles.input}
            dropdownItemStyles={styles.dropdownInput}
          />
        </View>
      }
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Choose a schedule</Text>
        <SelectList
          data={schedule}
          setSelected={setUserScheduleSelect}
          placeholder='Select available time'
          boxStyles={styles.input}
          dropdownStyles={styles.input}
          dropdownItemStyles={styles.dropdownInput}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          multiline={true}
          placeholder="Write any additional information (optional)"
          onChangeText={setUserMessage}
          value={userMessage}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
};

export default ScheduleScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: '#8E8E8F',
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
    gap: 5,
  },
  timeInputGroup: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  label: {
    color: '#8E8E8F',
    fontWeight: '700',
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 5,
    padding: 13,
    fontSize: 14,
    borderWidth: 3,
    borderColor: '#CCCCCC',
  },
  dropdownInput: {
    color: '#000000',
  },
  messageInput: {
    height: 100,
  },
  buttonContainer: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});