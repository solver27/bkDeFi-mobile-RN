import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';

import Toast from 'react-native-toast-message';

import imgAvatar from '../../assets/img/avatars/avatar.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import copyImg from '../../assets/img/icons/copy.png';
import editImg from '../../assets/img/icons/edit.png';
import uploadImg from '../../assets/img/icons/upload.png';
import CollectionCarousel from '../components/homePage/collectionCarousel';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const ProfileScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [focusedItem, setFocusedItem] = useState('');
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    website: '',
    walletAddress: '',
    backgroundImg: '',
    description: '',
    facebook: '',
    instagram: '',
    twitter: '',
    medium: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [validations, setValidations] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    website: '',
    walletAddress: '',
    backgroundImg: '',
    description: '',
    facebook: '',
    instagram: '',
    twitter: '',
    medium: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (prop, value) => {
    setValidations(prevState => ({...prevState, [prop]: ''}));
    setValues({...values, [prop]: value});
  };

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('ResponseImage', response);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleChooseBackgroundPhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('ResponseImage', response);
      if (response) {
        setBackgroundPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, {userId: '123'}),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  const copyToClipboard = key => {
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'You can paste these characters...  👋',
    });
    if (key === 'wallet') {
      Clipboard.setString('XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh');
    } else {
      Clipboard.setString('https://bksbackstage.io');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            height: 224,
          }}>
          {backgroundPhoto ? (
            <Image source={{uri: backgroundPhoto.uri}} style={styles.backgroundImg} />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 50}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={styles.avatarDiv}>
              {photo ? (
                <Image source={{uri: photo.uri}} style={styles.avatarImg} />
              ) : (
                <Image source={imgAvatar} style={styles.avatarImg} />
              )}
              <View style={styles.editImgDiv}>
                <Image source={editImg} />
              </View>
            </TouchableOpacity>
            {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.text1}>Mislan</Text>
            <Image source={badgeMark} style={styles.badgeMark} />
          </View>
          <Text style={styles.idText}>@mislan</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={styles.subTitle}>Wallet</Text>
          <View style={styles.clipboardDiv}>
            <TextInput
              style={styles.input}
              editable={false}
              value="XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh"
            />
            <TouchableOpacity
              style={styles.copyImg}
              onPress={() => copyToClipboard('wallet')}>
              <Image source={copyImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>Links</Text>
          <View style={styles.socialDiv}>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={globalImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={telegramImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={mediumImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={twitterImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={facebookImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={instagramImg} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: '#fff',
              fontWeight: '700',
              letterSpacing: 1.02,
              marginVertical: 30,
            }}>
            Profile Settings
          </Text>
          {/* General Settings */}
          <View>
            {/* separate title View */}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: 'rgba(255, 255, 255, 0.66)',
                  textTransform: 'uppercase',
                  marginRight: 10,
                }}>
                General
              </Text>
              <View
                style={{height: 0.5, backgroundColor: '#fff', flex: 1}}></View>
            </View>
            {/* General Forms */}
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Name</Text>
              <TextInput
                onFocus={() => setFocusedItem('nameInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'nameInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.name}
                autoCapitalize="none"
                onChangeText={val => handleChange('name', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Email</Text>
              <TextInput
                onFocus={() => setFocusedItem('emailInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'emailInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.email}
                autoCapitalize="none"
                onChangeText={val => handleChange('email', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Email required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Mobile Number</Text>
              <TextInput
                onFocus={() => setFocusedItem('mobileInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'mobileInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.mobileNumber}
                autoCapitalize="none"
                onChangeText={val => handleChange('mobileNumber', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Website</Text>
              <TextInput
                onFocus={() => setFocusedItem('websiteInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'websiteInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.website}
                autoCapitalize="none"
                onChangeText={val => handleChange('website', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>BSC Wallet Address</Text>
              <TextInput
                onFocus={() => setFocusedItem('walletInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'walletInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.walletAddress}
                autoCapitalize="none"
                onChangeText={val => handleChange('walletAddress', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Background Image</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={handleChooseBackgroundPhoto}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 44,
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    marginTop: 10,
                    width: '100%',
                    borderRadius: 4,
                  }}>
                  <Image source={uploadImg} />
                  <Text
                    style={{
                      color: '#fff',
                      textTransform: 'uppercase',
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      letterSpacing: 1.15,
                    }}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
              </View>
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Description</Text>
              <TextInput
                onFocus={() => setFocusedItem('DescriptionInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'DescriptionInput'
                    ? {
                        ...styles.inputOnFocus,
                        height: 88,
                        fontSize: 14,
                        fontWeight: '400',
                        padding: 15,
                      }
                    : {
                        ...styles.input,
                        height: 88,
                        fontSize: 14,
                        fontWeight: '400',
                        padding: 15,
                      }
                }
                value={values.description}
                multiline
                numberOfLines={4}
                autoCapitalize="none"
                onChangeText={val => handleChange('description', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('Save General settings...')}>
              <Text style={styles.text3}>Save</Text>
            </TouchableOpacity>
          </View>
          {/* Social Media */}
          <View>
            {/* separate title View */}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: 'rgba(255, 255, 255, 0.66)',
                  textTransform: 'uppercase',
                  marginRight: 10,
                }}>
                Social Media
              </Text>
              <View
                style={{height: 0.5, backgroundColor: '#fff', flex: 1}}></View>
            </View>
            {/* General Forms */}
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Name</Text>
              <TextInput
                onFocus={() => setFocusedItem('FacebookInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'FacebookInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.facebook}
                autoCapitalize="none"
                onChangeText={val => handleChange('facebook', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Instagram</Text>
              <TextInput
                onFocus={() => setFocusedItem('InstagramInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'InstagramInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.instagram}
                autoCapitalize="none"
                onChangeText={val => handleChange('instagram', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Email required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Twitter</Text>
              <TextInput
                onFocus={() => setFocusedItem('TwitterInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'TwitterInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.twitter}
                autoCapitalize="none"
                onChangeText={val => handleChange('twitter', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Medium</Text>
              <TextInput
                onFocus={() => setFocusedItem('MediumInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'MediumInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.medium}
                autoCapitalize="none"
                onChangeText={val => handleChange('medium', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('Save Social Media...')}>
              <Text style={styles.text3}>Save</Text>
            </TouchableOpacity>
          </View>
          {/* Change Password */}
          <View>
            {/* separate title View */}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: 'rgba(255, 255, 255, 0.66)',
                  textTransform: 'uppercase',
                  marginRight: 10,
                }}>
                Change Password
              </Text>
              <View
                style={{height: 0.5, backgroundColor: '#fff', flex: 1}}></View>
            </View>
            {/* Change Password Forms */}
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Old Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('oldPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'oldPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.oldPassword}
                autoCapitalize="none"
                onChangeText={val => handleChange('oldPassword', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>New Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('newPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'newPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.newPassword}
                autoCapitalize="none"
                onChangeText={val => handleChange('newPassword', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Email required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View style={{position: 'relative', width: '100%'}}>
              <Text style={styles.subTitle}>Confirm Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('confirmPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'confirmPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={values.confirmPassword}
                autoCapitalize="none"
                onChangeText={val => handleChange('confirmPassword', val)}
              />
              {validations.name == 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('Change Password...')}>
              <Text style={styles.text3}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  avatarDiv: {
    position: 'relative',
    width: 140,
    height: 140,
    marginTop: -70,
    marginBottom: 30,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    borderColor: '#ee4f77',
    borderWidth: 3,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  clipboardDiv: {
    position: 'relative',
  },
  editImgDiv: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6a4dfd',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  copyImg: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  input: {
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 10,
    padding: 8,
    paddingRight: 50,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  inputOnFocus: {
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    marginTop: 10,
    width: '100%',
    height: 44,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontSize: 14,
    fontWeight: '600',
    color: '#b00020',
  },
  text1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
  },
  text31: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text3: {
    color: 'rgba(255, 255, 255, 0.33)',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  idText: {
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
    letterSpacing: 1.2,
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    height: 44,
    backgroundColor: 'rgba(106, 77, 253, 0.33)',
    borderRadius: 4,
    marginTop: 30,
    marginBottom: 50,
  },
  button1: {
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    marginTop: 30,
    marginBottom: 50,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
  },
  followDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginTop: 40,
    marginBottom: 40,
  },
});
