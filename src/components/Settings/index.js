import React, {useState} from 'react';
import {View, Image, Text, Pressable, TextInput, Alert} from 'react-native';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import {bindActionCreators} from 'redux';

import styles from './styles';
import Layout from '../Layout';
import {updateProfile} from '../../state/Users/actions';

const Settings = (props) => {
  const {navigation, currentUser, actions} = props;
  const [mobile, handleMobileNo] = useState(currentUser.mobile);
  const [name, handleName] = useState(currentUser.name);
  const [password, handlePassword] = useState(currentUser.password);
  const [img, handleUserImg] = useState(currentUser.img);
  const {gender} = currentUser;
  const handleGo = () => {
    const user = {name, password, img};
    if (user.name.trim().length > 0 && user.password.trim().length > 2) {
      database()
        .ref(`/users/${mobile}`)
        .update(user)
        .then(() => {
          actions.updateProfile(user);
          Alert.alert('Successful', 'Profile Updated Successfully');
          navigation.goBack();
        });
    } else {
      Alert.alert(
        'Please fill the details',
        'Mobile number and user name are compulsory to add. Password must be greater then 3 digits',
      );
    }
  };

  return (
    <Layout title="Settings" navigation={navigation} isBack={true}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          {isEqual(img, '') ? (
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.bubbleText}>
                  {currentUser.name[0].toUpperCase()}
                </Text>
              </View>
            </View>
          ) : (
            <Image source={{uri: img}} style={styles.userImg} />
          )}
          <MaterialIcons name="mode-edit" style={styles.imgIcon} />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={handleName}
        />
        <TextInput
          editable={false}
          maxLength={10}
          style={styles.input}
          placeholder="Enter Your Mobile Number"
          value={mobile}
          onChangeText={handleMobileNo}
        />
        <TextInput
          secureTextEntry
          maxLength={10}
          style={styles.input}
          placeholder="Enter Password (min length 3)"
          value={password}
          onChangeText={handlePassword}
        />
        <View style={[styles.input, styles.genderView]}>
          <Text>Gender: {gender}</Text>
        </View>
        <Pressable style={styles.btn} onPress={handleGo}>
          <Text style={styles.btnText}>Update Profile</Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateProfile}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
