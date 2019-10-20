/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'

const W_Base_id = '6E400001-B5A3-F393-­E0A9-­E50E24DCCA9E';

class App extends React.Component {
  device;
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    console.log('constr');
  }

  scann = async () => {
    console.log('scann');
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TravelSax') {
        console.log('connection to device');
        this.manager.stopDeviceScan();

        device.connect()
          .then(device => {
            console.log(`connected to ${device.name}`);
            console.log(`device id: ${device.id}`);
            console.log(`device uuid: ${device.serviceUUIDs}`);
            this.device = device;
            return device.discoverAllServicesAndCharacteristics()
            // .then(() => { console.log('connected') })
            // .catch(error => console.log(error))
            // this.device = device;
            // device.writeCharacteristicWithResponseForService(
            //   "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
            //   "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
            //   'aGVsbG8=',
            // ).then(response => {
            //   console.log('sent', response);
            // })
            //   .catch(error => {
            //     console.log(error);
            //   })
          })
          .catch(error => {
            console.log(error);
          })
        // Proceed with connection.
        // device
        //   .connect()
        //   .then(device => {
        //     this.device = device;
        //     return device.discoverAllServicesAndCharacteristics();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      }
    });
  };
  stopScan = () => {
    console.log('stopScan');
    this.manager.stopDeviceScan();
  };

  write = () => {
    // console.log(this.device.id);
    console.log(base64.encode('hola guillem'))
    this.manager.writeCharacteristicWithResponseForDevice(
      this.device.id,
      "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
      "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
      base64.encode('hola guillem'), // value
    )
      .then(() => {
        console.log('send');
      })
      .catch(error => {
        console.log(error);
      })
  }
  cancelConnection = () => {
    this.manager.cancelDeviceConnection('E4:E6:44:20:19:55')
  }

  render() {
    return (
      <View>
        <Button onPress={this.scann} title="Scan" />
        <Button onPress={this.stopScan} title="Stop" />
        <Button onPress={this.write} title="Write" />
        <Button onPress={this.cancelConnection} title="Cancel" />
      </View>
    );
  }
}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
