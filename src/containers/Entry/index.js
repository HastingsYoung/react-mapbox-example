import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Map from '../Map';
import {Card, Button} from 'react-native-elements';
import CheckoutIcon from '../../assets/images/checkout.png';
import MapIcon from '../../assets/images/map.png';
import OrderIcon from '../../assets/images/order.png';
import ProfileIcon from '../../assets/images/profile.png';
import WishlistIcon from '../../assets/images/wishlist.png';
import WalletIcon from '../../assets/images/wallet.png';
import {COLORS, HEADER_STYLE} from '../../styles';

export default class Entry extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <LinearGradient colors={[COLORS.MAIN_COLOR, COLORS.SUB_COLOR]} style={HEADER_STYLE}>
                    <Icon.Button size={30}
                                 name={'more-vert'}
                                 color={'#fff'}
                                 backgroundColor={'transparent'}/>
                </LinearGradient>
                <View style={styles.body}>
                    <Row style={styles.rowStyle}>
                        <Card image={ProfileIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Text style={styles.itemFontStyle}>{'Profile'}</Text>
                        </Card>
                        <Card image={WalletIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Text style={styles.itemFontStyle}>{'Wallet'}</Text>
                        </Card>
                    </Row>
                    <Row style={styles.rowStyle}>
                        <Card image={CheckoutIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Text style={styles.itemFontStyle}>{'Checkout'}</Text>
                        </Card>
                        <Card image={WishlistIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Text style={styles.itemFontStyle}>{'Wishlist'}</Text>
                        </Card>
                    </Row>
                    <Row style={styles.rowStyle}>
                        <Card image={MapIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Button
                                backgroundColor={'transparent'}
                                color={'#0088FD'}
                                fontFamily={'Montserrat'}
                                fontWeight={'bold'}
                                title={'Map'}
                                onPress={() => navigate('Map')}
                            />
                        </Card>
                        <Card image={OrderIcon}
                              imageStyle={styles.imageStyle}
                              containerStyle={styles.cardStyle}
                              wrapperStyle={styles.itemWrapperStyle}
                              imageWrapperStyle={styles.imageWrapperStyle}
                              raised>
                            <Text style={styles.itemFontStyle}>{'Order'}</Text>
                        </Card>
                    </Row>
                </View>
            </View>
        );
    }
}

class Row extends React.Component {
    render() {
        return (
            <View {...this.props}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 16,
        backgroundColor: '#eeeeee',
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageStyle: {
        width: 50,
        height: 50,
    },
    itemWrapperStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapperStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    rowStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    itemFontStyle: {
        color: '#0088FD',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
    },
    btnContainerStyle: {
        backgroundColor: 'transparent',
    }
});