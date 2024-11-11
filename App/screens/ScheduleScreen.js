import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Container from '../components/Container';
import InputField from '../components/inputField';
import Dropdown from '../components/dropdown';
import { useNavigation } from '@react-navigation/native';

function countOccurrences(str, char) {
    return [...str].reduce((count, currentChar) =>
        currentChar === char ? count + 1 : count, 0);
}

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
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

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
    const misc = `ey=`;
    const linkID = '1wngAL_hQHF5ZSbBCxN4HFoOdF1i6C5cCUCiu3axBL-4';
    const linkAcess = 'AIzaSyDzPg7CNDgNARxvCj6gJiTkF_kyDYCszCI';
    const sheetRange = 'InterviewSheet';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${linkID}/values/${encodeURIComponent(sheetRange)}?k${misc}${linkAcess}`;

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
    // source code URL: 'https://script.google.com/home/projects/13zUV6K4gwUteE-Sx5sElf9af0yxVWFgCkOyZLZ7WjVAWcy3UBr-FQslA/edit';
    const appScriptURL = "https://script.google.com/macros/s/AKfycbztbgwE-w-2IkH-zj1jzAYckwnHmcQNMVdtnd9Ds65aoaUXFukq2xkqe8zBtiyshGRu/exec";

    const newErrors = {};

    // Define errors
    newErrors.name = [
        {condition: name.length == 0, result: 'Name is required'},
        {condition: name.length > 50, result: 'Field cannot be longer than 50 characters'}
    ];
    newErrors.email = [
        {condition: email.length == 0, result: 'Email is required'},
        {condition: email.length > 50, result: 'Field cannot be longer than 50 characters'},
        {condition: !(email.includes('@') && email.includes('.', email.indexOf('@'))), result: 'Email must be in the following format: example@mail.com'},
        {condition: countOccurrences(email, '@') > 1, result: 'Email cannot contain more than one @'},
        {condition: email[email.length-1] == '.', result: 'Email cannot end in a .'},
        {condition: email.indexOf('.', email.indexOf('@')) == email.indexOf('@') + 1, result: 'There must be at least one character between @ and .'}
    ];
    newErrors.weChatID = [
        {condition: weChatID.length == 0, result: 'WeChat ID is required'},
        {condition: weChatID.length < 3, result: 'WeChat ID must be longer than 3 characters'},
        {condition: weChatID.length > 20, result: 'WeChat ID cannot be longer than 20 characters'}
    ];
    newErrors.types = [
        {condition: !userTypeSelect, result: 'This field is required'}
    ];
    newErrors.schedule = [
        {condition: !userScheduleSelect, result: 'This field is required'}
    ];
    newErrors.lessons = [
        {condition: !userLessonSelect && userTypeSelect == types[0].key, result: 'This field is required'}
    ];

    for (const field in newErrors) {
        for (const error in newErrors[field]) {
            if (newErrors[field][error].condition) {
                setErrors(newErrors);
                return;
            }
        };
    };

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
      .then((response) => {
        Alert.alert('Sent!', 'The form has been sent.', [
            {text: 'OK', onPress: () => {
                navigation.navigate('Home');
            }}
        ]);
      })
      .catch((error) => Alert.alert('Failed', 'The form has not been sent.', {text: 'OK'}));
  };


  return (
    <ScrollView>
      <Container>
        <InputField
          title={"Name:"}
          placeholderText={"Enter your first & last name"}
          value={name}
          conditions={errors.name}
          onChangeText={setName}
        />
        <InputField
          title={"Email:"}
          placeholderText={"Enter your email"}
          value={email}
          conditions={errors.email}
          onChangeText={setEmail}
        />
        <InputField
          title={"WeChat ID:"}
          placeholderText={"Enter WeChat ID"}
          value={weChatID}
          conditions={errors.weChatID}
          onChangeText={setWeChatID}
        />
        <Dropdown
          title={"How can we assist you?"}
          placeholderText={"Select type"}
          setSelected={setUserTypeSelect}
          conditions={errors.types}
          data={types}
        />
        {userTypeSelect === types[0].key &&
          <Dropdown
            title={"Specify which lesson"}
            placeholderText={"Select lesson"}
            setSelected={setUserLessonSelect}
            conditions={errors.lessons}
            data={lessons}
          />
        }
        <Dropdown
          title={"Choose a schedule"}
          placeholderText={"Select available time"}
          setSelected={setUserScheduleSelect}
          conditions={errors.schedule}
          data={schedule}
        />
        <InputField
          title={"Additional Notes"}
          placeholderText={"Write any additional information (optional)"}
          value={userMessage}
          onChangeText={setUserMessage}
          style={styles.messageInput}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  )
};

export default ScheduleScreen

const styles = StyleSheet.create({
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