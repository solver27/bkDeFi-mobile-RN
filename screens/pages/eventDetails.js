import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {eventData} from '../constant/eventData';
import clockImg from '../../assets/img/icons/clock.png';
import addonsImg from '../../assets/img/avatars/avatar5.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import {
  getEventCardById,
  getCollectionById,
  getLatestEventCards,
  getBuyState,
} from '../helper/event';
import Countdown from 'react-countdown';
import likeImg from '../../assets/img/icons/like-empty.png';
import config from '../helper/config';

export const EventDetailsScreen = ({route}) => {
  const id = route.params.item.id;
  const tempData = route.params.item;
  const [isSold, setSold] = useState(false);
  const [addons, setAddons] = useState([]);
  const [addonPrice, setAddonPrice] = useState(0);
  const [collectionName, setCollectionName] = useState();
  const [latestEvents, setLatestEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isAddonModalVisible, setAddonModalVisible] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventCard, setEventCard] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);

  const toggleModal = () => {
    console.log('This is Modal');
    setModalVisible(!isModalVisible);
  };

  const toggleAddonModal = item => {
    console.log('This is Addon Modal', item);
    setSelectedAddon(item);
    setAddonModalVisible(!isAddonModalVisible);
  };

  const CompletionList = () => <Text style={styles.text1}>Event Started</Text>;

  const pad = (num, size = 2) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  };

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      return <CompletionList />;
    } else {
      return (
        <Text style={styles.text1}>
          {days} days {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </Text>
      );
    }
  };

  const EventCountDown = ({date}) => {
    const d = new Date(date);
    return <Countdown date={d} renderer={renderer} />;
  };

  useEffect(() => {
    setCurrentEvent(eventData.find(item => id == item.id));

    getEventCardById(id).then(res => {
      console.log('EventCardById', res);
      if (res.success) {
        setEventCard(res.eventcard);
        if (res.eventcard.total_tickets === res.eventcard.buy_count) {
          setSold(true);
        }
        const _addons =
          res.eventcard.addons === '' ? [] : JSON.parse(res.eventcard.addons);
        setAddons(_addons);
        let _addonPrice = 0;
        _addons.forEach(addon => {
          _addonPrice += Number(addon.price);
        });
        setAddonPrice(_addonPrice);
        console.log('Before setting colle.name', res.eventcard.collection);
        getCollectionById(res.eventcard.collection).then(result => {
          if (res.success) {
            setCollectionName(res.collection.name);
          }
        });
      }
    });

    getLatestEventCards().then(res => {
      if (res.success) {
        setLatestEvents(res.eventcards);
      }
    });

    getBuyState(id)
      .then(res => {
        if (res.success) {
          console.log('Already bought');
          // setSold(true);
        } else {
          console.log('You can buy');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  return (
    <ScrollView style={styles.container}>
      {tempData && (
        <View>
          <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                tempData.picture_large,
            }}
            style={styles.eventImg}
          />
          <View style={styles.flexRow}>
            <Text style={styles.name}>{tempData.name}</Text>
            <View style={styles.rowCenter}>
              <Image source={likeImg} style={styles.likedImg} />
              <Text style={styles.followers}>358</Text>
            </View>
          </View>
          <Text style={styles.description}>{tempData.venue_description}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>Creator</Text>
              <View style={styles.rowCenter}>
                <Text style={styles.infoText}>{tempData.creator.name}</Text>
                <Image source={badgeMark} style={styles.badgeMark} />
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Location</Text>
              <Text style={styles.infoText}>{tempData.location}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>Date</Text>
              <Text style={styles.infoText}>
                {new Date(tempData.date).toISOString().toString().split('T')[0]}
              </Text>
            </View>
            <View>
              <Text style={styles.text2}>Time</Text>
              <Text style={styles.infoText}>
                {new Date(tempData.date).toISOString().toString().split('T')[1]}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>Collection</Text>
              <View style={styles.rowCenter}>
                <Image source={addonsImg} style={styles.avatarImg} />
                <Text style={styles.infoText}>{collectionName}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Addons</Text>
              {addons &&
                addons.map(item => {
                  let addonImg;
                  switch (item.icon) {
                    case '/img/avatars/avatar.jpg':
                      addonImg = require('../../assets/img/avatars/avatar.jpg');
                      break;
                    case '/img/avatars/avatar1.jpg':
                      addonImg = require('../../assets/img/avatars/avatar2.jpg');
                      break;
                    case '/img/avatars/avatar2.jpg':
                      addonImg = require('../../assets/img/avatars/avatar2.jpg');
                      break;
                    case '/img/avatars/avatar3.jpg':
                      addonImg = require('../../assets/img/avatars/avatar3.jpg');
                      break;
                    case '/img/avatars/avatar4.jpg':
                      addonImg = require('../../assets/img/avatars/avatar4.jpg');
                      break;
                    case '/img/avatars/avatar5.jpg':
                      addonImg = require('../../assets/img/avatars/avatar5.jpg');
                      break;
                    case '/img/avatars/avatar6.jpg':
                      addonImg = require('../../assets/img/avatars/avatar6.jpg');
                      break;
                    case '/img/avatars/avatar7.jpg':
                      addonImg = require('../../assets/img/avatars/avatar7.jpg');
                  }
                  return (
                    <TouchableOpacity onPress={() => toggleAddonModal(item)}>
                      <Image source={addonImg} style={styles.avatarImg} />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
          <Modal
            isVisible={isAddonModalVisible}
            onBackdropPress={() => setAddonModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <View>
                  <Text style={styles.modalTxt}>
                    Name: {selectedAddon?.name}
                  </Text>
                  <Text style={styles.modalTxt}>
                    Description: {selectedAddon?.description}
                  </Text>
                  <Text style={styles.modalTxt}>
                    Price: {selectedAddon?.price + ' €'}
                  </Text>
                </View>
                <TouchableOpacity onPress={toggleAddonModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.divider} />
          <View style={styles.eventCounter}>
            <View style={styles.rowCenter}>
              <Image source={clockImg} />
              <Text style={styles.evStartTxt}>Event starts in</Text>
            </View>
            <View style={styles.counterContainer}>
              <EventCountDown date={new Date(tempData.date).toISOString()} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.flexRow}>
            <Text style={styles.remainTickets}>
              {tempData.total_tickets - tempData.buy_count} tickets left
            </Text>
            <Text style={styles.priceText}>{tempData.price} €</Text>
          </View>
          <View style={styles.divider} />
          {tempData.total_tickets - tempData.buy_count === 0 ? (
            <View style={styles.buyContainer}>
              <View style={styles.rowCenter}>
                <Text style={styles.counterText}>-</Text>
                <Text style={styles.counterText}>{ticketAmount}</Text>
                <Text style={styles.counterText}>+</Text>
              </View>
              <TouchableOpacity style={styles.soldButton}>
                <Text style={styles.text3}>Sold out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buyContainer}>
              <View style={styles.rowCenter}>
                <Text
                  style={styles.counterText}
                  onPress={() => {
                    if (ticketAmount < 1) {
                      return;
                    }
                    setTicketAmount(ticketAmount - 1);
                  }}>
                  -
                </Text>
                <Text style={styles.counterText}>{ticketAmount}</Text>
                <Text
                  style={styles.counterText}
                  onPress={() => {
                    if (
                      ticketAmount ===
                      tempData.total_tickets - tempData.buy_count
                    ) {
                      return;
                    }
                    setTicketAmount(ticketAmount + 1);
                  }}>
                  +
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy Ticket</Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Proceed to Pay</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Pay with PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy with crypto: BSC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy with Crypto: NEAR</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    overflow: 'hidden',
    padding: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventImg: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 24,
    color: '#fff',
    fontWeight: '700',
  },
  likedImg: {
    marginRight: 10,
  },
  followers: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'right',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
  },
  halfWidth: {
    width: '50%',
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    borderColor: '#6a4dfd',
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  remainTickets: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  evStartTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 0,
    marginLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoText: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginRight: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  eventCounter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  counterContainer: {
    minWidth: 210,
    marginTop: 20,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingVertical: 11.5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 10,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 1,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buyContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  avatarImg: {
    position: 'relative',
    width: 32,
    height: 32,
    borderColor: '#6164ff',
    marginRight: 10,
    borderRadius: 16,
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
    letterSpacing: 1.6,
  },
  button: {
    flex: 1,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    marginLeft: 20,
  },
  modalContainer: {
    backgroundColor: '#14142f',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#887bff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  modalTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  modalClose: {
    color: '#fff',
    width: 25,
    margin: 0,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
  },
  payButton: {
    marginTop: 30,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
  soldButton: {
    flex: 1,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd44',
    borderRadius: 4,
    marginLeft: 20,
  },
});
