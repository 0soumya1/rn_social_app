import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {THEME_COLOR2} from '../utils/Colors';

const AddPost = () => {
  const ref = useRef();
  const [imageData, setImageData] = useState(null);
  const [caption, setcation] = useState('');

  const openCamera = async () => {
    const res = await launchCamera({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };
  const openGallery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.captionBox}
        onPress={() => {
          ref.current.focus();
        }}>
        <TextInput
          value={caption}
          onChangeText={txt => setcation(txt)}
          ref={ref}
          placeholder="Type caption here...."
          style={styles.input}
        />
      </TouchableOpacity>

      {imageData != null && (
        <View style={styles.selectedImageView}>
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.selectedImage}
          />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => {
              setImageData(null);
            }}>
            <Image
              source={require('../images/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[styles.pickerBtn, {marginTop: 50}]}
        onPress={() => {
          openCamera();
        }}>
        <Image source={require('../images/camera.png')} style={styles.icon} />
        <Text style={styles.pickerTitle}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.pickerBtn, {marginTop: 20}]}
        onPress={() => {
          openGallery();
        }}>
        <Image source={require('../images/gallery.png')} style={styles.icon} />
        <Text style={styles.pickerTitle}>Open Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
      disabled = {caption == '' && imageData == null ? true : false}
        style={[
          styles.postBtn,
          {
            backgroundColor:
              caption == '' && imageData == null ? '#f2f2f2' : THEME_COLOR2,
          },
        ]}>
        <Text style={styles.btnText}>Post Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  captionBox: {
    width: '94%',
    height: 130,
    borderWidth: 0.4,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#9e9e9e',
    padding: 10,
  },
  input: {
    width: '100%',
  },
  pickerBtn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: '#9e9e9e',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#9e9e9e',
  },
  pickerTitle: {
    marginLeft: 14,
    fontSize: 14,
  },
  selectedImageView: {
    width: '90%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeBtn: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  postBtn: {
    width: '90%',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnText:{
    fontSize:16,
    color:"white",
  }
});
