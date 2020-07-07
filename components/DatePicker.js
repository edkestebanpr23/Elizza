import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { main as color } from "../data/colors";
import { DatePicker as dic } from "../data/languague";

const DatePicker = ({ onSelectDate, iLang }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onSelectDate(selectedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(!show);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      {/* <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          textColor={color.grad[5]}
        />
      )}
      <View>
        <Button onPress={showDatepicker} title={ show ? dic.hidde[iLang] : dic.show[iLang] } />
      </View>
    </View>
  );
};

export default DatePicker;