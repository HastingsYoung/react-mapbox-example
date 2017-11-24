import React from 'react';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';
import {FormLabel, Button} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import {connect} from "react-redux";
import * as Actions from '../../actions';
import {bindActionCreators} from "redux";
import {COLORS, HEADER_STYLE} from '../../styles';
import {fetchDestUrl, fetchNameUrl, debounce} from '../../utils';
import {HEADERS_CONTENT_TYPE_JSON} from '../../constants/headers';

const {width, height} = Dimensions.get('window');

const nameMatch = debounce((name,
                            callback = (response) => {
                            }) => {
    return fetch(fetchNameUrl(name), {
        methods: 'GET',
        headers: HEADERS_CONTENT_TYPE_JSON(),
    }).then(callback);
}, 800);

class Map extends React.Component {
    render() {
        const navigation = this.props.navigation;
        const self = this;
        return (
            <View style={styles.map}>
                <LinearGradient colors={[COLORS.MAIN_COLOR, COLORS.SUB_COLOR]}
                                style={HEADER_STYLE}>
                    <Icon.Button size={30}
                                 name={'keyboard-arrow-left'}
                                 color={'#fff'}
                                 backgroundColor={'transparent'}
                                 onPress={() => navigation.dispatch(NavigationActions.back({}))}/>

                    <View style={styles.input}>
                        <FormLabel labelStyle={styles.label}
                                   fontFamily={'Montserrat'}>DESTINATION</FormLabel>
                        <Autocomplete data={this.props.data}
                                      placeholder={'Type here...'}
                                      onChangeText={query => {
                                          nameMatch(query, (res) => {
                                              res.json().then((json) => {
                                                  self.props.actions.editComplete(json.features);
                                              });
                                          });
                                      }}
                                      containerStyle={styles.autoCompleteContainer}
                                      renderItem={dataItem => <TouchableOpacity onPress={() => {
                                          self.props.actions.querySelected({
                                              destLo: dataItem.center[0],
                                              destLa: dataItem.center[1],
                                          });
                                      }}>
                                          <Text>{dataItem.place_name}</Text>
                                      </TouchableOpacity>}/>
                    </View>
                </LinearGradient>
                <MapView style={styles.map}
                         initialRegion={this.props.initialRegion}>
                    <MapView.Marker title={'YOU ARE HERE'}
                                    coordinate={this.props.initialRegion}/>
                    {this.props.routes.map((l, i) => {
                        return <MapView.Polyline key={i}
                                                 coordinates={[this.props.initialRegion, ...(l.legs[0].steps.map((s) => {
                                                     return {
                                                         latitude: s.maneuver.location[1],
                                                         longitude: s.maneuver.location[0],
                                                     }
                                                 }))]}
                                                 strokeWidth={5}
                                                 strokeColor={COLORS.SUB_COLOR}/>
                    })}
                </MapView>
                <View style={styles.launchPad}>
                    <Text style={styles.tips}>{'X miles away'}</Text>
                    <Button
                        title='DISCOVER'
                        icon={{name: 'location-arrow', type: 'font-awesome'}}
                        buttonStyle={styles.buttonContainer}
                        textStyle={styles.buttonText}
                        onPress={() => {
                            this.props.actions.fetchMapRoute();
                            fetch(fetchDestUrl({
                                srcLo: self.props.initialRegion.longitude,
                                srcLa: self.props.initialRegion.latitude,
                            }, self.props.query), {
                                methods: 'GET',
                                headers: HEADERS_CONTENT_TYPE_JSON(),
                            }).then((res) => res.json()).then((json) => {
                                self.props.actions.fetchMapRouteSucc(json.routes);
                            });
                        }}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
        const self = this;
        this.props.actions.fetchSelfLocation();
        navigator.geolocation.getCurrentPosition((position) => {
            self.props.actions.fetchSelfLocationSucc(position.coords);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flex: 6,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: width,
    },
    logo: {
        height: 60,
        margin: 20,
    },
    input: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    label: {
        backgroundColor: 'transparent',
        color: '#fff',
    },
    field: {
        color: '#fff',
        fontFamily: 'Montserrat',
        fontSize: 10,
    },
    fieldContainer: {
        borderRadius: 2,
        paddingLeft: 10,
        backgroundColor: 'rgba(255,255,255, 0.2)'
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#1565C0',
    },
    buttonText: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
    },
    launchPad: {
        flex: 1,
        backgroundColor: '#fff',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tips: {
        fontFamily: 'Montserrat',
        fontSize: 15,
    },
    autoCompleteContainer: {
        flex: 1,
        zIndex: 1
    }
});

const mapStatesToProps = (state, ownProps = {}) => {
    return Object.assign({
        isLoading: state.mapState.isLoading,
        routes: state.mapState.routes,
        data: state.mapState.data,
        initialRegion: state.mapState.initialRegion,
        query: state.mapState.query,
    }, ownProps);
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(Map);