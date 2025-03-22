import React, {useState} from 'react';
import UserInfoForm from './UserInfoForm';

const NameScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const inputs = [
    {
      placeholder: 'Full name',
      value: fullName,
      onChangeText: setFullName,
      iconName: 'person-outline',
    },
    {
      placeholder: 'Valid email',
      value: email,
      onChangeText: setEmail,
      iconName: 'mail-outline',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
    },
    {
      placeholder: 'Phone number',
      value: phoneNumber,
      onChangeText: setPhoneNumber,
      iconName: 'smartphone',
      keyboardType: 'phone-pad',
    },
  ];

  return (
    <UserInfoForm
      imageSource={require('../../assets/Img-1.png')}
      title="Introduce Yourself"
      subtitle="Let's make it happen."
      onNext={'Birth'}
      inputs={inputs}
    />
  );
};

export default NameScreen;
