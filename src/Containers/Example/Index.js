import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import ChangeTheme from '@/Store/Theme/ChangeTheme'
import RNPicker from 'rn-modal-picker'
import axios from 'axios'

const IndexExampleContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user?.item.currencies)
  const fetchOneUserLoading = useSelector(
    (state) => state.user?.fetchOne.loading,
  )
  const fetchOneUserError = useSelector((state) => state.user?.fetchOne.error)

  const [fetchOneLoading, setfetchOneUserLoading] = useState(false)

  const [firstAmountTF, setFirstAmount] = useState('1')
  const [resultAmountTF, setresultAmountTF] = useState('1')

  const [dataSource, setdataSource] = useState([])
  const [placeHolderText, setplaceHolderText] = useState('Currency $')
  const [selectedText, setselectedText] = useState('--')
  const [selectedTextResult, setselectedTextResult] = useState('--')
  const [conversionvalue, setconversionvalue] = useState([])
  const [actualConversionvalueText, setActualConversionvalueText] = useState(
    '1',
  )
  const [actualConversionvalueText1, setActualConversionvalueText1] = useState(
    '1',
  )
  const selectedValue = (index, item) => {
    // setActualConversionvalueText("1")
    setselectedText(item.name)
    var resultObject = _search('USD' + item.name, conversionvalue)
    setActualConversionvalueText(resultObject.value)
  }

  useEffect(() => {
    if (selectedTextResult !== '--') {
      var exchangeRate =
        (parseFloat('' + +actualConversionvalueText1) /
          parseFloat('' + +actualConversionvalueText)) *
        parseFloat('' + +firstAmountTF)
      setresultAmountTF('' + +exchangeRate)
    }
  }, [actualConversionvalueText])

  const selectedValueResult = (index, item) => {
    // setActualConversionvalueText1("1")
    setselectedTextResult(item.name)
    var resultObject = _search('USD' + item.name, conversionvalue)
    setActualConversionvalueText1(resultObject.value)
  }

  useEffect(() => {
    var exchangeRate =
      (parseFloat('' + +actualConversionvalueText1) /
        parseFloat('' + +actualConversionvalueText)) *
      parseFloat('' + +firstAmountTF)
    setresultAmountTF('' + +exchangeRate)
  }, [actualConversionvalueText1])

  const firstAmountTFC = (id) => {
    setFirstAmount(id)
    var exchangeRate =
      (parseFloat(+actualConversionvalueText1) /
        parseFloat(+actualConversionvalueText)) *
      parseFloat(+id)
    setresultAmountTF('' + +exchangeRate)
  }

  const changeTheme = ({ theme, darkMode }) => {
    dispatch(ChangeTheme.action({ theme, darkMode }))
  }

  useEffect(() => {
    if (user !== undefined) {
      const arrayKey = Object.keys(user)
      var dataA = []
      arrayKey.map((data, index) => {
        dataA.push({ id: index, name: data })
      })
      setdataSource(dataA)

      callExchageRateApi();

    }
  }, [user])

  const callExchageRateApi = () => {
    setfetchOneUserLoading(true)
    axios
    .get(
      `http://api.currencylayer.com/live?access_key=6b4a56a3ccc7e76654f0c8f75e826854`,
    )
    .then((res) => {
      const dataGet = res.data
      if (dataGet !== undefined) {
        const arrayKey1 = Object.keys(dataGet.quotes)
        const arrayValue1 = Object.values(dataGet.quotes)
        var dataB = []
        arrayKey1.map((data, index) => {
          dataB.push({ id: index, name: data, value: arrayValue1[index] })
        })
        setconversionvalue(dataB)
      }
      setfetchOneUserLoading(false)
    })
  }

  const _search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i]
      }
    }
  }

  useEffect(() => {
    console.log('CurrenciesList_____-----______------------->', conversionvalue)
  }, [conversionvalue])

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        {/* <Brand /> */}
        {fetchOneUserLoading || fetchOneLoading && <ActivityIndicator />}

        <Text style={Fonts.titleLarge}>{'Currency Converter'}</Text>
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
    
        <Text style={[Layout.fill, Fonts.textCenter]}>{'Enter Amount'}</Text>
        <TextInput
          onChangeText={(text) => firstAmountTFC(text)}
          editable={!fetchOneUserLoading}
          keyboardType={'number-pad'}
          // maxLength={5}
          value={firstAmountTF}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
        <RNPicker
          dataSource={dataSource}
          dummyDataSource={dataSource}
          defaultValue={false}
          pickerTitle={'Select Currency'}
          showSearchBar={true}
          disablePicker={false}
          changeAnimation={'none'}
          searchBarPlaceHolder={'Search.....'}
          showPickerTitle={true}
          searchBarContainerStyle={Styles.searchBarContainerStyle}
          pickerStyle={Styles.pickerStyle}
          itemSeparatorStyle={Styles.itemSeparatorStyle}
          pickerItemTextStyle={Styles.listTextViewStyle}
          selectedLabel={selectedText}
          placeHolderLabel={placeHolderText}
          selectLabelTextStyle={Styles.selectLabelTextStyle}
          placeHolderTextStyle={Styles.placeHolderTextStyle}
          dropDownImageStyle={Styles.dropDownImageStyle}
          dropDownImage={require('../../Assets/Images/ic_drop_down.png')}
          selectedValue={(index, item) => selectedValue(index, item)}
        />
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter]}>
          {'Converted Amount'}
        </Text>
        <TextInput
          onChangeText={(text) => fetch(text)}
          editable={false}
          keyboardType={'number-pad'}
          // maxLength={5}
          value={resultAmountTF}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
        <RNPicker
          dataSource={dataSource}
          dummyDataSource={dataSource}
          defaultValue={false}
          pickerTitle={'Select Currency'}
          showSearchBar={true}
          disablePicker={false}
          changeAnimation={'none'}
          searchBarPlaceHolder={'Search.....'}
          showPickerTitle={true}
          searchBarContainerStyle={Styles.searchBarContainerStyle}
          pickerStyle={Styles.pickerStyle}
          itemSeparatorStyle={Styles.itemSeparatorStyle}
          pickerItemTextStyle={Styles.listTextViewStyle}
          selectedLabel={selectedTextResult}
          placeHolderLabel={placeHolderText}
          selectLabelTextStyle={Styles.selectLabelTextStyle}
          placeHolderTextStyle={Styles.placeHolderTextStyle}
          dropDownImageStyle={Styles.dropDownImageStyle}
          dropDownImage={require('../../Assets/Images/ic_drop_down.png')}
          selectedValue={(index, item) => selectedValueResult(index, item)}
        />
      </View>
      <View></View>
      <Text style={Fonts.textRegular}>DarkMode : </Text>
      <Button onPress={() => changeTheme({ darkMode: null })} title="Auto" />
      <Button onPress={() => changeTheme({ darkMode: true })} title="Dark" />
      <Button onPress={() => changeTheme({ darkMode: false })} title="Light" />
      <TouchableOpacity  onPress={() => callExchageRateApi()} > 
      <Image source={require('../../Assets/Images/refresh-icon.png')} style={Styles.refresh}></Image>
           </TouchableOpacity>
    </View>
  )
}

export default IndexExampleContainer

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3',
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
  },
  placeHolderTextStyle: {
    color: '#D3D3D3',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  refresh: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 5,
    flexDirection: 'row',
    width: 150,
  },
})
