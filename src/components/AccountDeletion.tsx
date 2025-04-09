import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, StyleSheet, Alert } from 'react-native';
import { BUTTON_COLOR, LIGHT_BLACK, LIGHT_GRAY, RED, WHITE } from '../utils/colors';

const AccountDeletion = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmDelete = async () => {
    setModalVisible(false);
    try {
      const supported = await Linking.canOpenURL(
        'mailto:navedahmed040@gmail.com?subject=Account Deletion Request&body=Please delete my account and associated data.'
      );
      if (supported) {
        await Linking.openURL(
          'mailto:navedahmed040@gmail.com?subject=Account Deletion Request&body=Please delete my account and associated data.'
        );
      } else {
        Alert.alert('Error', 'No email client found on this device.');
      }
    } catch (error) {
      console.error('Error opening email client:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* RED Bold Deletion Text */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.deleteText}>Request Account Deletion</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to request deletion of your account and all data?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountDeletion;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  deleteText: {
    color: RED,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: LIGHT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: WHITE,
    width: '85%',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: LIGHT_GRAY,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: RED,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: WHITE,
    fontWeight: '600',
  },
  confirmText: {
    color: WHITE,
    fontWeight: '600',
  },
});
