# CWB - 日出日落

作者抓取資料的方法 [source](https://repl.it/@PJCHENder/filterSunriseAmdSunsetData)

`index.js`

```js
const fs = require('fs');

// 載入從中央氣象局下載的日出日落檔 A-B0062-001
const fileContents = fs.readFileSync('A-B0062-001.json', 'utf-8');
const dataset = JSON.parse(fileContents);

const locations = dataset.cwbopendata.dataset.locations.location;
const nowTimeStamp = new Date('2019-10-07').getTime(); // 今天的 timestamp


const newData = locations.map((location) => {
  const time = location.time
    .filter((time) => new Date(time.dataTime).getTime() > nowTimeStamp)
    .map((time) => {
      const { sunrise, sunset } = time.parameter
        .filter((timeParameter) =>
          ['日出時刻', '日沒時刻'].includes(timeParameter.parameterName)
        )
        .reduce((accumulator, timeParameter) => {
          const objectKey =
            timeParameter.parameterName === '日出時刻' ? 'sunrise' : 'sunset';

          accumulator[objectKey] = timeParameter.parameterValue;
          return accumulator;
        }, {});

      return {
        dataTime: time.dataTime,
        sunrise,
        sunset,
      };
    });

  return {
    locationName: location.locationName,
    time,
  };
});

fs.writeFile('sunrise-sunset.json', JSON.stringify(newData, null, 2), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```

`A-B0062-001.json`

(此處呈現資料有刪減)

```json
{
 "cwbopendata": {
  "@xmlns": "urn:cwb:gov:tw:cwbcommon:0.1", 
  "identifier": "cfa9ba76-6816-4735-bf36-0c76ad5591cd", 
  "sender": "weather@cwb.gov.tw", 
  "sent": "2019-01-04T10:48:17+08:00", 
  "status": "Actual", 
  "msgType": "Issue", 
  "dataid": "A-B0062-001", 
  "scope": "Public", 
  "dataset": {
   "locations": {
    "location": [
     {
      "locationName": "臺北", 
      "time": [
       {
        "dataTime": "2019-01-01", 
        "parameter": [
         {
          "parameterName": "民用曙光始", 
          "parameterValue": "06:14:00"
         }, 
         {
          "parameterName": "日出時刻", 
          "parameterValue": "06:39:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "115"
         }, 
         {
          "parameterName": "過中天", 
          "parameterValue": "11:57:00"
         }, 
         {
          "parameterName": "仰角", 
          "parameterValue": "42S"
         }, 
         {
          "parameterName": "日沒時刻", 
          "parameterValue": "17:16:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "245"
         }, 
         {
          "parameterName": "民用暮光終", 
          "parameterValue": "17:41:00"
         }
        ]
       }, 
       {
        "dataTime": "2019-12-31", 
        "parameter": [
         {
          "parameterName": "民用曙光始", 
          "parameterValue": "06:14:00"
         }, 
         {
          "parameterName": "日出時刻", 
          "parameterValue": "06:39:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "115"
         }, 
         {
          "parameterName": "過中天", 
          "parameterValue": "11:57:00"
         }, 
         {
          "parameterName": "仰角", 
          "parameterValue": "42S"
         }, 
         {
          "parameterName": "日沒時刻", 
          "parameterValue": "17:15:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "245"
         }, 
         {
          "parameterName": "民用暮光終", 
          "parameterValue": "17:40:00"
         }
        ]
       }, 
       {
        "dataTime": "2020-01-01", 
        "parameter": [
         {
          "parameterName": "民用曙光始", 
          "parameterValue": "06:14:00"
         }, 
         {
          "parameterName": "日出時刻", 
          "parameterValue": "06:39:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "115"
         }, 
         {
          "parameterName": "過中天", 
          "parameterValue": "11:57:00"
         }, 
         {
          "parameterName": "仰角", 
          "parameterValue": "42S"
         }, 
         {
          "parameterName": "日沒時刻", 
          "parameterValue": "17:15:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "245"
         }, 
         {
          "parameterName": "民用暮光終", 
          "parameterValue": "17:40:00"
         }
        ]
       }, 
       {
        "dataTime": "2020-12-31", 
        "parameter": [
         {
          "parameterName": "民用曙光始", 
          "parameterValue": "06:16:00"
         }, 
         {
          "parameterName": "日出時刻", 
          "parameterValue": "06:41:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "115"
         }, 
         {
          "parameterName": "過中天", 
          "parameterValue": "12:00:00"
         }, 
         {
          "parameterName": "仰角", 
          "parameterValue": "42S"
         }, 
         {
          "parameterName": "日沒時刻", 
          "parameterValue": "17:19:00"
         }, 
         {
          "parameterName": "方位", 
          "parameterValue": "245"
         }, 
         {
          "parameterName": "民用暮光終", 
          "parameterValue": "17:44:00"
         }
        ]
       }
      ]
     }, 
     {
      "locationName": "臺中", 
      "time": [
      ]
     }, 
     {
      "locationName": "彰化", 
      "time": [ ]
     }, 
     {
      "locationName": "南投", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "雲林", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "嘉義", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "臺南", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "高雄", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "屏東", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "基隆", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "宜蘭", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "花蓮", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "臺東", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "澎湖", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "金門", 
      "time": [ ]
      ]
     }, 
     {
      "locationName": "馬祖", 
      "time": [ ]
      ]
     }
    ]
   }
  }
 }
}
```

作者刪減後的資料格式

`sunrise-sunset.json`

```json
[
  {
    "locationName": "臺北",
    "time": [
      {
        "dataTime": "2019-10-08",
        "sunrise": "05:49:00",
        "sunset": "17:34:00"
      },
      {
        "dataTime": "2019-10-09",
        "sunrise": "05:49:00",
        "sunset": "17:33:00"
      }
    ]
  }
]
```