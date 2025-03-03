import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This is a Mock API Server
const createApiMockServer = function () {
  const postingsData = [
    {
      id: 'DS36Bkeu',
      companyId: '8',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        weightPounds: 42313,
        comments: [
          {
            comment: 'goldstar1@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11190,
          location: {
            lat: 39.64,
            lon: -89.19278,
          },
          city: 'Stonington',
          county: 'Christian',
          postalCode: '62567',
          stateProv: 'IL',
        },
        destination: {
          placeId: 24480,
          location: {
            lat: 40.69944,
            lon: -99.08111,
          },
          city: 'Kearney',
          county: 'Buffalo',
          postalCode: '68845',
          stateProv: 'NE',
        },
      },
    },
    {
      id: 'LS4XrPpx',
      companyId: '19',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 24000,
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 42325,
          location: {
            lat: 37.68722,
            lon: -77.01389,
          },
          city: 'King William',
          county: 'King William',
          postalCode: '23086',
          stateProv: 'VA',
        },
      },
    },
    {
      id: 'LS4Xq0PW',
      companyId: '26',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 27000,
      },
      lane: {
        origin: {
          placeId: 10107,
          location: {
            lat: 39.12,
            lon: -88.54333,
          },
          city: 'Effingham',
          county: 'Effingham',
          postalCode: '62401',
          stateProv: 'IL',
        },
        destination: {
          placeId: 21497,
          location: {
            lat: 31.32694,
            lon: -89.29028,
          },
          city: 'Hattiesburg',
          county: 'Forrest',
          postalCode: '39401',
          stateProv: 'MS',
        },
      },
    },
    {
      id: 'LS4Xrznz',
      companyId: '11',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment: '1P 1D',
          },
          {
            comment: '971867',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10504,
          location: {
            lat: 41.805,
            lon: -87.86917,
          },
          city: 'La Grange',
          county: 'Cook',
          postalCode: '60525',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40004,
          location: {
            lat: 32.64917,
            lon: -96.71278,
          },
          city: 'Hutchins',
          county: 'Dallas',
          postalCode: '75141',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XqpHT',
      companyId: '28',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: 'deliver tomorrow or Friday',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 53412,
          location: {
            lat: 41.50944,
            lon: -90.57861,
          },
          city: 'Rock Is',
          county: 'Rock Island',
          postalCode: '61201',
          stateProv: 'IL',
        },
        destination: {
          placeId: 37068,
          location: {
            lat: 34.27444,
            lon: -81.61889,
          },
          city: 'Newberry',
          county: 'Newberry',
          postalCode: '29108',
          stateProv: 'SC',
        },
      },
    },
    {
      id: 'DS36Bk10',
      companyId: '17',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment: 'please email mtgsilver@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10289,
          location: {
            lat: 38.70139,
            lon: -90.14861,
          },
          city: 'Granite City',
          county: 'Madison',
          postalCode: '62040',
          stateProv: 'IL',
        },
        destination: {
          placeId: 11921,
          location: {
            lat: 39.76833,
            lon: -86.15806,
          },
          city: 'Indianapolis',
          county: 'Marion',
          postalCode: '46201',
          stateProv: 'IN',
        },
      },
    },
    {
      id: 'LS4Xrgz4',
      companyId: '7',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
      },
      lane: {
        origin: {
          placeId: 10557,
          location: {
            lat: 42.28306,
            lon: -87.95306,
          },
          city: 'Libertyville',
          county: 'Lake',
          postalCode: '60048',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40167,
          location: {
            lat: 27.50611,
            lon: -99.50722,
          },
          city: 'Laredo',
          county: 'Webb',
          postalCode: '78040',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XrHBh',
      companyId: '3',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment:
              'If no answer email Southoffers@example.com with the REF#, Thanks',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10593,
          location: {
            lat: 42.32,
            lon: -89.05806,
          },
          city: 'Loves Park',
          county: 'Winnebago',
          postalCode: '61111',
          stateProv: 'IL',
        },
        destination: {
          placeId: 39191,
          location: {
            lat: 29.79444,
            lon: -98.73167,
          },
          city: 'Boerne',
          county: 'Kendall',
          postalCode: '78006',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XrKw3',
      companyId: '3',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 21350,
      },
      lane: {
        origin: {
          placeId: 10466,
          location: {
            lat: 41.12,
            lon: -87.86111,
          },
          city: 'Kankakee',
          county: 'Kankakee',
          postalCode: '60901',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44399,
          location: {
            lat: 44.51917,
            lon: -88.01972,
          },
          city: 'Green Bay',
          county: 'Brown',
          postalCode: '54301',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'LS4XqFH3',
      companyId: '23',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 36000,
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 15976,
          location: {
            lat: 41.9,
            lon: -71.09028,
          },
          city: 'Taunton',
          county: 'Bristol',
          postalCode: '02780',
          stateProv: 'MA',
        },
      },
    },
    {
      id: 'LS4Xs2xj',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 20000,
        comments: [
          {
            comment: 'Tuesday Morning delivery',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10804,
          location: {
            lat: 42.01889,
            lon: -87.80278,
          },
          city: 'Niles',
          county: 'Cook',
          postalCode: '60714',
          stateProv: 'IL',
        },
        destination: {
          placeId: 22995,
          location: {
            lat: 36.0725,
            lon: -79.79222,
          },
          city: 'Greensboro',
          county: 'Guilford',
          postalCode: '27401',
          stateProv: 'NC',
        },
      },
    },
    {
      id: 'LS4XrV3e',
      companyId: '24',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 29000,
        comments: [
          {
            comment: '1p 3 drops',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9738,
          location: {
            lat: 41.76278,
            lon: -87.8,
          },
          city: 'Bedford Park',
          county: 'Cook',
          postalCode: '60499',
          stateProv: 'IL',
        },
        destination: {
          placeId: 43805,
          location: {
            lat: 47.48306,
            lon: -122.21583,
          },
          city: 'Renton',
          county: 'King',
          postalCode: '98055',
          stateProv: 'WA',
        },
      },
    },
    {
      id: 'LS4Xs5sR',
      companyId: '2',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment: '1 pick 1 drop',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 39522,
          location: {
            lat: 32.78333,
            lon: -96.8,
          },
          city: 'Dallas',
          county: 'Dallas',
          postalCode: '75201',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'DS36C328',
      companyId: '1',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 48,
        weightPounds: 35000,
        comments: [
          {
            comment: 'EMAIL ONLY FOR FAST RESPONSE LOADSVF@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10029,
          location: {
            lat: 39.84028,
            lon: -88.95472,
          },
          city: 'Decatur',
          county: 'Macon',
          postalCode: '62521',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44399,
          location: {
            lat: 44.51917,
            lon: -88.01972,
          },
          city: 'Green Bay',
          county: 'Brown',
          postalCode: '54301',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'LS4XqK3Y',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 15000,
        comments: [
          {
            comment: '90145 - 90150 - 90275',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10718,
          location: {
            lat: 41.50667,
            lon: -90.515,
          },
          city: 'Moline',
          county: 'Rock Island',
          postalCode: '61265',
          stateProv: 'IL',
        },
        destination: {
          placeId: 29488,
          location: {
            lat: 39.96111,
            lon: -82.99889,
          },
          city: 'Columbus',
          county: 'Franklin',
          postalCode: '43201',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4XmXva',
      companyId: '3',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44200,
        comments: [
          {
            comment: 'PU 1200 DEL 30th@0800',
          },
          {
            comment: 'USA license required',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9753,
          location: {
            lat: 41.955,
            lon: -87.94,
          },
          city: 'Bensenville',
          county: 'DuPage',
          postalCode: '60105',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40167,
          location: {
            lat: 27.50611,
            lon: -99.50722,
          },
          city: 'Laredo',
          county: 'Webb',
          postalCode: '78040',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XrqZk',
      companyId: '13',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: 'READY NOW',
          },
          {
            comment: 'DELIVER STRAIGHT',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9909,
          location: {
            lat: 40.11639,
            lon: -88.24333,
          },
          city: 'Champaign',
          county: 'Champaign',
          postalCode: '61820',
          stateProv: 'IL',
        },
        destination: {
          placeId: 8974,
          location: {
            lat: 41.00417,
            lon: -92.37361,
          },
          city: 'Ottumwa',
          county: 'Wapello',
          postalCode: '52501',
          stateProv: 'IA',
        },
      },
    },
    {
      id: 'LS4XrHtw',
      companyId: '16',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 20000,
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17518,
          location: {
            lat: 42.2575,
            lon: -83.21111,
          },
          city: 'Allen Park',
          county: 'Wayne',
          postalCode: '48101',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'DS36C18S',
      companyId: '6',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: 'x297; John Larkin',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10322,
          location: {
            lat: 42.09778,
            lon: -88.53028,
          },
          city: 'Hampshire',
          county: 'Kane',
          postalCode: '60140',
          stateProv: 'IL',
        },
        destination: {
          placeId: 34374,
          location: {
            lat: 40.03778,
            lon: -76.30583,
          },
          city: 'Lancaster',
          county: 'Lancaster',
          postalCode: '17601',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'DS36C2aP',
      companyId: '20',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 11300,
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17518,
          location: {
            lat: 42.2575,
            lon: -83.21111,
          },
          city: 'Allen Park',
          county: 'Wayne',
          postalCode: '48101',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'LS4XrDpL',
      companyId: '11',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 42000,
        comments: [
          {
            comment: 'Call 555-123-4567',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10976,
          location: {
            lat: 39.93556,
            lon: -91.40972,
          },
          city: 'Quincy',
          county: 'Adams',
          postalCode: '62301',
          stateProv: 'IL',
        },
        destination: {
          placeId: 28567,
          location: {
            lat: 43.15472,
            lon: -77.61583,
          },
          city: 'Rochester',
          county: 'Monroe',
          postalCode: '14602',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4Xqwwh',
      companyId: '9',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
      },
      lane: {
        origin: {
          placeId: 9738,
          location: {
            lat: 41.76278,
            lon: -87.8,
          },
          city: 'Bedford Park',
          county: 'Cook',
          postalCode: '60499',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40476,
          location: {
            lat: 29.70278,
            lon: -98.12417,
          },
          city: 'New Braunfels',
          county: 'Comal',
          postalCode: '78130',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'DS36C5La',
      companyId: '9',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        weightPounds: 29016,
      },
      lane: {
        origin: {
          placeId: 11027,
          location: {
            lat: 41.77972,
            lon: -89.68889,
          },
          city: 'Rock Falls',
          county: 'Whiteside',
          postalCode: '61071',
          stateProv: 'IL',
        },
        destination: {
          placeId: 13442,
          location: {
            lat: 37.69222,
            lon: -97.33722,
          },
          city: 'Wichita',
          county: 'Sedgwick',
          postalCode: '67201',
          stateProv: 'KS',
        },
      },
    },
    {
      id: 'DS36C6Ab',
      companyId: '22',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 45000,
        comments: [
          {
            comment: 'LOADS FCFS 0800-1500',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9656,
          location: {
            lat: 41.66889,
            lon: -87.73861,
          },
          city: 'Alsip',
          county: 'Cook',
          postalCode: '60803',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17907,
          location: {
            lat: 42.79778,
            lon: -83.705,
          },
          city: 'Fenton',
          county: 'Genesee',
          postalCode: '48430',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'DS36C3gU',
      companyId: '7',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 25000,
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 45016,
          location: {
            lat: 43.01167,
            lon: -88.23139,
          },
          city: 'Waukesha',
          county: 'Waukesha',
          postalCode: '53186',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'LS4XrRmd',
      companyId: '22',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40738,
      },
      lane: {
        origin: {
          placeId: 11030,
          location: {
            lat: 42.27111,
            lon: -89.09389,
          },
          city: 'Rockford',
          county: 'Winnebago',
          postalCode: '61101',
          stateProv: 'IL',
        },
        destination: {
          placeId: 30314,
          location: {
            lat: 41.39222,
            lon: -84.12528,
          },
          city: 'Napoleon',
          county: 'Henry',
          postalCode: '43545',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4Xs25p',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 10000,
        comments: [
          {
            comment: '3 Pickups - 1 Delivery',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10305,
          location: {
            lat: 38.89222,
            lon: -89.41306,
          },
          city: 'Greenville',
          county: 'Bond',
          postalCode: '62246',
          stateProv: 'IL',
        },
        destination: {
          placeId: 10070,
          location: {
            lat: 41.80889,
            lon: -88.01111,
          },
          city: 'Downers Grove',
          county: 'DuPage',
          postalCode: '60515',
          stateProv: 'IL',
        },
      },
    },
    {
      id: 'LS4XqShk',
      companyId: '7',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 45000,
        comments: [
          {
            comment: 'PICKS AT 1100 / DELIVERS 12/29 AT 0700  SODA   44K',
          },
          {
            comment: 'EMAIL ONLY !  dray@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9656,
          location: {
            lat: 41.66889,
            lon: -87.73861,
          },
          city: 'Alsip',
          county: 'Cook',
          postalCode: '60803',
          stateProv: 'IL',
        },
        destination: {
          placeId: 19030,
          location: {
            lat: 44.817,
            lon: -93.183,
          },
          city: 'Eagan',
          county: 'Dakota',
          postalCode: '55120',
          stateProv: 'MN',
        },
      },
    },
    {
      id: 'DS36CEwA',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 4650,
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17654,
          location: {
            lat: 42.52944,
            lon: -83.78028,
          },
          city: 'Brighton',
          county: 'Livingston',
          postalCode: '48114',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'DS36CGYb',
      companyId: '29',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        weightPounds: 38590,
        comments: [
          {
            comment: 'operations8@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10017,
          location: {
            lat: 40.12444,
            lon: -87.63,
          },
          city: 'Danville',
          county: 'Vermilion',
          postalCode: '61832',
          stateProv: 'IL',
        },
        destination: {
          placeId: 7867,
          location: {
            lat: 32.14889,
            lon: -81.16333,
          },
          city: 'Port Wentworth',
          county: 'Chatham',
          postalCode: '31407',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'LS4Xtqvh',
      companyId: '24',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 18000,
        comments: [
          {
            comment: 'Call ext 471 Anna',
          },
          {
            comment: 'ops@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9810,
          location: {
            lat: 41.75,
            lon: -87.80417,
          },
          city: 'Bridgeview',
          county: 'Cook',
          postalCode: '60455',
          stateProv: 'IL',
        },
        destination: {
          placeId: 43350,
          location: {
            lat: 48.19889,
            lon: -122.12389,
          },
          city: 'Arlington',
          county: 'Snohomish',
          postalCode: '98223',
          stateProv: 'WA',
        },
      },
    },
    {
      id: 'LS4XtJVf',
      companyId: '14',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 29000,
        comments: [
          {
            comment: 'stop in keystone,FL',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10096,
          location: {
            lat: 41.58944,
            lon: -88.92194,
          },
          city: 'Earlville',
          county: 'La Salle',
          postalCode: '60518',
          stateProv: 'IL',
        },
        destination: {
          placeId: 6930,
          location: {
            lat: 27.94722,
            lon: -82.45861,
          },
          city: 'Tampa',
          county: 'Hillsborough',
          postalCode: '33689',
          stateProv: 'FL',
        },
      },
    },
    {
      id: 'LS4XtrND',
      companyId: '5',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 22000,
      },
      lane: {
        origin: {
          placeId: 10044,
          location: {
            lat: 42.03333,
            lon: -87.88333,
          },
          city: 'Des Plaines',
          county: 'Cook',
          postalCode: '60016',
          stateProv: 'IL',
        },
        destination: {
          placeId: 27869,
          location: {
            lat: 40.69139,
            lon: -73.80611,
          },
          city: 'Jamaica',
          county: 'Queens',
          postalCode: '11405',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4XrJc0',
      companyId: '2',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 5808,
        comments: [
          {
            comment: '555-123-4567',
          },
          {
            comment: '2 LOADS AVAILABLE',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10740,
          location: {
            lat: 37.08528,
            lon: -89.1625,
          },
          city: 'Mound City',
          county: 'Pulaski',
          postalCode: '62963',
          stateProv: 'IL',
        },
        destination: {
          placeId: 52817,
          location: {
            lat: 35.62889,
            lon: -82.18083,
          },
          city: 'Old Fort',
          county: 'McDowell',
          postalCode: '28762',
          stateProv: 'NC',
        },
      },
    },
    {
      id: 'LS4XtF72',
      companyId: '6',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment: '1P 1D',
          },
          {
            comment: '971867',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10504,
          location: {
            lat: 41.805,
            lon: -87.86917,
          },
          city: 'La Grange',
          county: 'Cook',
          postalCode: '60525',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40004,
          location: {
            lat: 32.64917,
            lon: -96.71278,
          },
          city: 'Hutchins',
          county: 'Dallas',
          postalCode: '75141',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4Xq52b',
      companyId: '24',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 39000,
      },
      lane: {
        origin: {
          placeId: 10672,
          location: {
            lat: 41.90056,
            lon: -87.85667,
          },
          city: 'Melrose Park',
          county: 'Cook',
          postalCode: '60160',
          stateProv: 'IL',
        },
        destination: {
          placeId: 29118,
          location: {
            lat: 41.08139,
            lon: -81.51917,
          },
          city: 'Akron',
          county: 'Summit',
          postalCode: '44301',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4Xs7Ve',
      companyId: '12',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
      },
      lane: {
        origin: {
          placeId: 10214,
          location: {
            lat: 41.93528,
            lon: -87.86556,
          },
          city: 'Franklin Park',
          county: 'Cook',
          postalCode: '60131',
          stateProv: 'IL',
        },
        destination: {
          placeId: 43617,
          location: {
            lat: 47.38111,
            lon: -122.23361,
          },
          city: 'Kent',
          county: 'King',
          postalCode: '98030',
          stateProv: 'WA',
        },
      },
    },
    {
      id: 'LS4Xs5TD',
      companyId: '22',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
      },
      lane: {
        origin: {
          placeId: 11392,
          location: {
            lat: 41.96333,
            lon: -87.97889,
          },
          city: 'Wood Dale',
          county: 'DuPage',
          postalCode: '60191',
          stateProv: 'IL',
        },
        destination: {
          placeId: 27116,
          location: {
            lat: 40.7,
            lon: -74,
          },
          city: 'Brooklyn',
          county: 'Kings',
          postalCode: '11202',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4XsfxF',
      companyId: '17',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 14350,
          location: {
            lat: 37.47917,
            lon: -82.51889,
          },
          city: 'Pikeville',
          county: 'Pike',
          postalCode: '41501',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'LS4XtEyk',
      companyId: '12',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43800,
        comments: [
          {
            comment: 'or can email-atlnorthposts@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10804,
          location: {
            lat: 42.01889,
            lon: -87.80278,
          },
          city: 'Niles',
          county: 'Cook',
          postalCode: '60714',
          stateProv: 'IL',
        },
        destination: {
          placeId: 9915,
          location: {
            lat: 39.49611,
            lon: -88.17611,
          },
          city: 'Charleston',
          county: 'Coles',
          postalCode: '61920',
          stateProv: 'IL',
        },
      },
    },
    {
      id: 'LS4Xs4Ss',
      companyId: '6',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 48,
        weightPounds: 42000,
        comments: [
          {
            comment: 'Pallets',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 35109,
          location: {
            lat: 40.44056,
            lon: -79.99611,
          },
          city: 'Pittsburgh',
          county: 'Allegheny',
          postalCode: '15201',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'DS36CBGc',
      companyId: '16',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        weightPounds: 40000,
        comments: [
          {
            comment: 'CALL 555-123-4567',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9779,
          location: {
            lat: 40.48417,
            lon: -88.99361,
          },
          city: 'Bloomington',
          county: 'McLean',
          postalCode: '61701',
          stateProv: 'IL',
        },
        destination: {
          placeId: 39768,
          location: {
            lat: 32.72528,
            lon: -97.32056,
          },
          city: 'Ft Worth',
          county: 'Tarrant',
          postalCode: '76101',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'DS36CBfF',
      companyId: '5',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40399,
        comments: [
          {
            comment: '12/28/2022 1400-2100',
          },
          {
            comment: '12/31/2022 0815',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 55030,
          location: {
            lat: 41.43931,
            lon: -87.67974,
          },
          city: 'University Pk',
          county: 'Will',
          postalCode: '60484',
          stateProv: 'IL',
        },
        destination: {
          placeId: 41366,
          location: {
            lat: 41.55111,
            lon: -112.10944,
          },
          city: 'Corinne',
          county: 'Box Elder',
          postalCode: '84307',
          stateProv: 'UT',
        },
      },
    },
    {
      id: 'DS36C3BP',
      companyId: '22',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 33314,
        comments: [
          {
            comment:
              'Pick is 12/28 12:00 - 16:00 Delivery is 12/30 06:00 - 15:00',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10106,
          location: {
            lat: 38.81139,
            lon: -89.95306,
          },
          city: 'Edwardsville',
          county: 'Madison',
          postalCode: '62025',
          stateProv: 'IL',
        },
        destination: {
          placeId: 5442,
          location: {
            lat: 41.49889,
            lon: -72.90111,
          },
          city: 'Cheshire',
          county: 'New Haven',
          postalCode: '06408',
          stateProv: 'CT',
        },
      },
    },
    {
      id: 'LS4Xshm3',
      companyId: '20',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
        comments: [
          {
            comment: 'blipsky@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10044,
          location: {
            lat: 42.03333,
            lon: -87.88333,
          },
          city: 'Des Plaines',
          county: 'Cook',
          postalCode: '60016',
          stateProv: 'IL',
        },
        destination: {
          placeId: 27869,
          location: {
            lat: 40.69139,
            lon: -73.80611,
          },
          city: 'Jamaica',
          county: 'Queens',
          postalCode: '11405',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4Xry4e',
      companyId: '26',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
        comments: [
          {
            comment: 'Readyy now till 1500',
          },
          {
            comment: 'deliver Wed  0800-1400',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10817,
          location: {
            lat: 41.91722,
            lon: -87.89556,
          },
          city: 'Northlake',
          county: 'Cook',
          postalCode: '60164',
          stateProv: 'IL',
        },
        destination: {
          placeId: 54480,
          location: {
            lat: 37.544064,
            lon: -77.32357,
          },
          city: 'Henrico',
          county: 'Henrico',
          postalCode: '23075',
          stateProv: 'VA',
        },
      },
    },
    {
      id: 'LS4XrEcM',
      companyId: '1',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44110,
      },
      lane: {
        origin: {
          placeId: 10933,
          location: {
            lat: 41.62694,
            lon: -88.20389,
          },
          city: 'Plainfield',
          county: 'Will',
          postalCode: '60544',
          stateProv: 'IL',
        },
        destination: {
          placeId: 38637,
          location: {
            lat: 36.16583,
            lon: -86.78444,
          },
          city: 'Nashville',
          county: 'Davidson',
          postalCode: '37201',
          stateProv: 'TN',
        },
      },
    },
    {
      id: 'DS36C0y1',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43671,
        comments: [
          {
            comment: '1 PICK 1 DROP -- SAME DAY DELIVERY',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11298,
          location: {
            lat: 41.88472,
            lon: -88.20389,
          },
          city: 'W Chicago',
          county: 'DuPage',
          postalCode: '60185',
          stateProv: 'IL',
        },
        destination: {
          placeId: 11781,
          location: {
            lat: 40.27944,
            lon: -86.51083,
          },
          city: 'Frankfort',
          county: 'Clinton',
          postalCode: '46041',
          stateProv: 'IN',
        },
      },
    },
    {
      id: 'LS4XrNVR',
      companyId: '1',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44000,
        comments: [
          {
            comment: '555-123-4567',
          },
          {
            comment: 'Delivers - Lime Spgs, IA',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9738,
          location: {
            lat: 41.76278,
            lon: -87.8,
          },
          city: 'Bedford Park',
          county: 'Cook',
          postalCode: '60499',
          stateProv: 'IL',
        },
        destination: {
          placeId: 9239,
          location: {
            lat: 43.26694,
            lon: -91.47583,
          },
          city: 'Waukon',
          county: 'Allamakee',
          postalCode: '52172',
          stateProv: 'IA',
        },
      },
    },
    {
      id: 'DS36Bp2V',
      companyId: '3',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
        comments: [
          {
            comment: 'EMAIL ONLY FOR FAST RESPONSE LOADSVF@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10017,
          location: {
            lat: 40.12444,
            lon: -87.63,
          },
          city: 'Danville',
          county: 'Vermilion',
          postalCode: '61832',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44252,
          location: {
            lat: 44.44889,
            lon: -88.06028,
          },
          city: 'De Pere',
          county: 'Brown',
          postalCode: '54115',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'LS4XqHtV',
      companyId: '12',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 30000,
      },
      lane: {
        origin: {
          placeId: 10451,
          location: {
            lat: 41.525,
            lon: -88.08167,
          },
          city: 'Joliet',
          county: 'Will',
          postalCode: '60431',
          stateProv: 'IL',
        },
        destination: {
          placeId: 30057,
          location: {
            lat: 39.80917,
            lon: -82.9725,
          },
          city: 'Lockbourne',
          county: 'Franklin',
          postalCode: '43194',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4XqGLE',
      companyId: '13',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43000,
        comments: [
          {
            comment: 'call 555-123-4567 or email',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11030,
          location: {
            lat: 42.27111,
            lon: -89.09389,
          },
          city: 'Rockford',
          county: 'Winnebago',
          postalCode: '61101',
          stateProv: 'IL',
        },
        destination: {
          placeId: 13578,
          location: {
            lat: 36.99028,
            lon: -86.44361,
          },
          city: 'Bowling Green',
          county: 'Warren',
          postalCode: '42101',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'LS4XrZDT',
      companyId: '8',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43000,
        comments: [
          {
            comment: 'Pick 12/28 1200',
          },
          {
            comment: 'Drop 12/28 1900',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11022,
          location: {
            lat: 41.92389,
            lon: -89.06861,
          },
          city: 'Rochelle',
          county: 'Ogle',
          postalCode: '61068',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44399,
          location: {
            lat: 44.51917,
            lon: -88.01972,
          },
          city: 'Green Bay',
          county: 'Brown',
          postalCode: '54301',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'ZS01kcXB',
      companyId: '6',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9127700',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 35392,
          location: {
            lat: 41.23306,
            lon: -80.49361,
          },
          city: 'Sharon',
          county: 'Mercer',
          postalCode: '16146',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'LS4XrLuw',
      companyId: '6',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 28865,
        comments: [
          {
            comment: 'CALL 555-123-4567 OR EMAIL',
          },
          {
            comment: 'PU 1400, DEL 0600 TOMORROW',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10709,
          location: {
            lat: 41.45528,
            lon: -88.26167,
          },
          city: 'Minooka',
          county: 'Grundy',
          postalCode: '60447',
          stateProv: 'IL',
        },
        destination: {
          placeId: 18166,
          location: {
            lat: 42.7325,
            lon: -84.55556,
          },
          city: 'Lansing',
          county: 'Ingham',
          postalCode: '48901',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'LS4Xs1bu',
      companyId: '19',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 14000,
      },
      lane: {
        origin: {
          placeId: 10120,
          location: {
            lat: 42.03722,
            lon: -88.28111,
          },
          city: 'Elgin',
          county: 'Kane',
          postalCode: '60120',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44115,
          location: {
            lat: 43.13444,
            lon: -90.70528,
          },
          city: 'Boscobel',
          county: 'Grant',
          postalCode: '53805',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'LS4Xnah9',
      companyId: '12',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 37368,
      },
      lane: {
        origin: {
          placeId: 10933,
          location: {
            lat: 41.62694,
            lon: -88.20389,
          },
          city: 'Plainfield',
          county: 'Will',
          postalCode: '60544',
          stateProv: 'IL',
        },
        destination: {
          placeId: 20473,
          location: {
            lat: 39.09972,
            lon: -94.57833,
          },
          city: 'Kansas City',
          county: 'Jackson',
          postalCode: '64101',
          stateProv: 'MO',
        },
      },
    },
    {
      id: 'LS4XqfBP',
      companyId: '18',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 22000,
      },
      lane: {
        origin: {
          placeId: 10373,
          location: {
            lat: 41.72556,
            lon: -87.825,
          },
          city: 'Hickory Hills',
          county: 'Cook',
          postalCode: '60457',
          stateProv: 'IL',
        },
        destination: {
          placeId: 41601,
          location: {
            lat: 40.76083,
            lon: -111.89028,
          },
          city: 'Salt Lake City',
          county: 'Salt Lake',
          postalCode: '84101',
          stateProv: 'UT',
        },
      },
    },
    {
      id: 'LS4XrErX',
      companyId: '22',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
      },
      lane: {
        origin: {
          placeId: 10752,
          location: {
            lat: 42.05,
            lon: -87.933,
          },
          city: 'Mt Prospect',
          county: 'Cook',
          postalCode: '60056',
          stateProv: 'IL',
        },
        destination: {
          placeId: 10070,
          location: {
            lat: 41.80889,
            lon: -88.01111,
          },
          city: 'Downers Grove',
          county: 'DuPage',
          postalCode: '60515',
          stateProv: 'IL',
        },
      },
    },
    {
      id: 'DS36Bgy7',
      companyId: '11',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 20000,
      },
      lane: {
        origin: {
          placeId: 9723,
          location: {
            lat: 41.995,
            lon: -88.18556,
          },
          city: 'Bartlett',
          county: 'Cook',
          postalCode: '60103',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40199,
          location: {
            lat: 33.04611,
            lon: -96.99389,
          },
          city: 'Lewisville',
          county: 'Denton',
          postalCode: '75029',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XqHS7',
      companyId: '7',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43000,
      },
      lane: {
        origin: {
          placeId: 11329,
          location: {
            lat: 41.77167,
            lon: -88.77361,
          },
          city: 'Waterman',
          county: 'DeKalb',
          postalCode: '60556',
          stateProv: 'IL',
        },
        destination: {
          placeId: 34039,
          location: {
            lat: 39.79028,
            lon: -77.72806,
          },
          city: 'Greencastle',
          county: 'Franklin',
          postalCode: '17225',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'DS36BRnG',
      companyId: '10',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43000,
      },
      lane: {
        origin: {
          placeId: 10451,
          location: {
            lat: 41.525,
            lon: -88.08167,
          },
          city: 'Joliet',
          county: 'Will',
          postalCode: '60431',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17988,
          location: {
            lat: 42.96333,
            lon: -85.66806,
          },
          city: 'Grand Rapids',
          county: 'Kent',
          postalCode: '49501',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'LS4Xq0ZK',
      companyId: '20',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44000,
      },
      lane: {
        origin: {
          placeId: 11398,
          location: {
            lat: 41.74694,
            lon: -88.05028,
          },
          city: 'Woodridge',
          county: 'DuPage',
          postalCode: '60517',
          stateProv: 'IL',
        },
        destination: {
          placeId: 30916,
          location: {
            lat: 39.53639,
            lon: -83.43917,
          },
          city: 'Washington Ch',
          county: 'Fayette',
          postalCode: '43160',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4XqEab',
      companyId: '19',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44110,
        comments: [
          {
            comment: 'Please call or email me at rene@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10933,
          location: {
            lat: 41.62694,
            lon: -88.20389,
          },
          city: 'Plainfield',
          county: 'Will',
          postalCode: '60544',
          stateProv: 'IL',
        },
        destination: {
          placeId: 38637,
          location: {
            lat: 36.16583,
            lon: -86.78444,
          },
          city: 'Nashville',
          county: 'Davidson',
          postalCode: '37201',
          stateProv: 'TN',
        },
      },
    },
    {
      id: 'DS36C7yr',
      companyId: '24',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 24313,
        comments: [
          {
            comment: 'Load RT759409 marquis.golly@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11022,
          location: {
            lat: 41.92389,
            lon: -89.06861,
          },
          city: 'Rochelle',
          county: 'Ogle',
          postalCode: '61068',
          stateProv: 'IL',
        },
        destination: {
          placeId: 7101,
          location: {
            lat: 33.74889,
            lon: -84.38806,
          },
          city: 'Atlanta',
          county: 'Fulton',
          postalCode: '30303',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'ZS01kfaP',
      companyId: '19',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 36000,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9140375',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 29380,
          location: {
            lat: 40.79889,
            lon: -81.37861,
          },
          city: 'Canton',
          county: 'Stark',
          postalCode: '44702',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'ZS01kfae',
      companyId: '27',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40456,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9140930',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10058,
          location: {
            lat: 41.83889,
            lon: -89.47944,
          },
          city: 'Dixon',
          county: 'Lee',
          postalCode: '61021',
          stateProv: 'IL',
        },
        destination: {
          placeId: 39228,
          location: {
            lat: 30.16667,
            lon: -96.3975,
          },
          city: 'Brenham',
          county: 'Washington',
          postalCode: '77833',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'DS36C9Z7',
      companyId: '27',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        weightPounds: 39551,
        comments: [
          {
            comment: '1030am pickup/  delivers same day at 2200',
          },
          {
            comment: '1030am pickup/  delivers same day at 2200',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11211,
          location: {
            lat: 41.98889,
            lon: -88.68667,
          },
          city: 'Sycamore',
          county: 'DeKalb',
          postalCode: '60178',
          stateProv: 'IL',
        },
        destination: {
          placeId: 18583,
          location: {
            lat: 43.07694,
            lon: -86.19694,
          },
          city: 'Spring Lake',
          county: 'Ottawa',
          postalCode: '49456',
          stateProv: 'MI',
        },
      },
    },
    {
      id: 'LS4Xs4y9',
      companyId: '13',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 45000,
        comments: [
          {
            comment: '111443185',
          },
          {
            comment: 'midwest@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10106,
          location: {
            lat: 38.81139,
            lon: -89.95306,
          },
          city: 'Edwardsville',
          county: 'Madison',
          postalCode: '62025',
          stateProv: 'IL',
        },
        destination: {
          placeId: 8509,
          location: {
            lat: 42.50056,
            lon: -90.66444,
          },
          city: 'Dubuque',
          county: 'Dubuque',
          postalCode: '52001',
          stateProv: 'IA',
        },
      },
    },
    {
      id: 'DS36CCZG',
      companyId: '29',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 39314,
        comments: [
          {
            comment: 'PU 12/30/2022 0800',
          },
          {
            comment: 'DEL 12/31/2022 0930',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 55030,
          location: {
            lat: 41.43931,
            lon: -87.67974,
          },
          city: 'University Pk',
          county: 'Will',
          postalCode: '60484',
          stateProv: 'IL',
        },
        destination: {
          placeId: 13999,
          location: {
            lat: 36.86556,
            lon: -87.48861,
          },
          city: 'Hopkinsville',
          county: 'Christian',
          postalCode: '42240',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'LS4XqDYP',
      companyId: '17',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43000,
        comments: [
          {
            comment: 'alex.henson@example.com',
          },
          {
            comment: 'FCFS!',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10029,
          location: {
            lat: 39.84028,
            lon: -88.95472,
          },
          city: 'Decatur',
          county: 'Macon',
          postalCode: '62521',
          stateProv: 'IL',
        },
        destination: {
          placeId: 7454,
          location: {
            lat: 32.11417,
            lon: -81.15417,
          },
          city: 'Garden City',
          county: 'Chatham',
          postalCode: '31405',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'ZS01khJM',
      companyId: '12',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 13000,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9149223',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10120,
          location: {
            lat: 42.03722,
            lon: -88.28111,
          },
          city: 'Elgin',
          county: 'Kane',
          postalCode: '60120',
          stateProv: 'IL',
        },
        destination: {
          placeId: 35369,
          location: {
            lat: 41.40889,
            lon: -75.66278,
          },
          city: 'Scranton',
          county: 'Lackawanna',
          postalCode: '18501',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'ZS01khku',
      companyId: '1',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43500,
        comments: [
          {
            comment: 'lorenzo.omegalogistics@example.com\nEXT 211',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11022,
          location: {
            lat: 41.92389,
            lon: -89.06861,
          },
          city: 'Rochelle',
          county: 'Ogle',
          postalCode: '61068',
          stateProv: 'IL',
        },
        destination: {
          placeId: 41639,
          location: {
            lat: 41.71194,
            lon: -112.16472,
          },
          city: 'Tremonton',
          county: 'Box Elder',
          postalCode: '84337',
          stateProv: 'UT',
        },
      },
    },
    {
      id: 'DS36B6u4',
      companyId: '21',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: 'Ask for Jaden, Phone: 555-123-4567 Ext.274',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9788,
          location: {
            lat: 41.69861,
            lon: -88.06833,
          },
          city: 'Bolingbrook',
          county: 'Will',
          postalCode: '60440',
          stateProv: 'IL',
        },
        destination: {
          placeId: 28100,
          location: {
            lat: 40.72306,
            lon: -73.91306,
          },
          city: 'Maspeth',
          county: 'Queens',
          postalCode: '11378',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4XqAbW',
      companyId: '17',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment: '1pm pickup',
          },
          {
            comment: 'deliver tomorrow 0800-1600',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10451,
          location: {
            lat: 41.525,
            lon: -88.08167,
          },
          city: 'Joliet',
          county: 'Will',
          postalCode: '60431',
          stateProv: 'IL',
        },
        destination: {
          placeId: 19028,
          location: {
            lat: 47.917,
            lon: -97.017,
          },
          city: 'E Grand Forks',
          county: 'Polk',
          postalCode: '56721',
          stateProv: 'MN',
        },
      },
    },
    {
      id: 'ZS01kkUs',
      companyId: '28',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 43335,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 7996507.  Hazmat',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10106,
          location: {
            lat: 38.81139,
            lon: -89.95306,
          },
          city: 'Edwardsville',
          county: 'Madison',
          postalCode: '62025',
          stateProv: 'IL',
        },
        destination: {
          placeId: 35422,
          location: {
            lat: 40.05056,
            lon: -77.52056,
          },
          city: 'Shippensburg',
          county: 'Cumberland',
          postalCode: '17257',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'ZS01kkjX',
      companyId: '6',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
      },
      lane: {
        origin: {
          placeId: 11022,
          location: {
            lat: 41.92389,
            lon: -89.06861,
          },
          city: 'Rochelle',
          county: 'Ogle',
          postalCode: '61068',
          stateProv: 'IL',
        },
        destination: {
          placeId: 40571,
          location: {
            lat: 31.76194,
            lon: -95.63056,
          },
          city: 'Palestine',
          county: 'Anderson',
          postalCode: '75801',
          stateProv: 'TX',
        },
      },
    },
    {
      id: 'LS4XttRa',
      companyId: '4',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35000,
        comments: [
          {
            comment:
              'STRAIGHT THROUGH! / 53 DRY VAN / PADLOCK / E TRACKS & 6+ CARGO STRAPS',
          },
          {
            comment:
              'STRAIGHT THROUGH! / 53 DRY VAN / PADLOCK / E TRACKS & 6+ CARGO STRAPS',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10123,
          location: {
            lat: 42,
            lon: -88,
          },
          city: 'Elk Grove Vlg',
          county: 'Cook',
          postalCode: '60007',
          stateProv: 'IL',
        },
        destination: {
          placeId: 6687,
          location: {
            lat: 28.53806,
            lon: -81.37944,
          },
          city: 'Orlando',
          county: 'Orange',
          postalCode: '32801',
          stateProv: 'FL',
        },
      },
    },
    {
      id: 'LS4XqRR9',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 44000,
      },
      lane: {
        origin: {
          placeId: 10817,
          location: {
            lat: 41.91722,
            lon: -87.89556,
          },
          city: 'Northlake',
          county: 'Cook',
          postalCode: '60164',
          stateProv: 'IL',
        },
        destination: {
          placeId: 30240,
          location: {
            lat: 40.72972,
            lon: -81.10556,
          },
          city: 'Minerva',
          county: 'Stark',
          postalCode: '44657',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'DS36CJMS',
      companyId: '9',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 39314,
        comments: [
          {
            comment: 'PU 12/30/2022 0800',
          },
          {
            comment: 'DEL 12/31/2022 0930',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 55030,
          location: {
            lat: 41.43931,
            lon: -87.67974,
          },
          city: 'University Pk',
          county: 'Will',
          postalCode: '60484',
          stateProv: 'IL',
        },
        destination: {
          placeId: 13999,
          location: {
            lat: 36.86556,
            lon: -87.48861,
          },
          city: 'Hopkinsville',
          county: 'Christian',
          postalCode: '42240',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'DS36AnDn',
      companyId: '25',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 35370,
      },
      lane: {
        origin: {
          placeId: 9904,
          location: {
            lat: 38.525,
            lon: -89.13333,
          },
          city: 'Centralia',
          county: 'Marion',
          postalCode: '62801',
          stateProv: 'IL',
        },
        destination: {
          placeId: 10017,
          location: {
            lat: 40.12444,
            lon: -87.63,
          },
          city: 'Danville',
          county: 'Vermilion',
          postalCode: '61832',
          stateProv: 'IL',
        },
      },
    },
    {
      id: 'LS4XsfxU',
      companyId: '15',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 42388,
        comments: [
          {
            comment: 'Please call or email me at rene@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10029,
          location: {
            lat: 39.84028,
            lon: -88.95472,
          },
          city: 'Decatur',
          county: 'Macon',
          postalCode: '62521',
          stateProv: 'IL',
        },
        destination: {
          placeId: 35194,
          location: {
            lat: 40.33556,
            lon: -75.92722,
          },
          city: 'Reading',
          county: 'Berks',
          postalCode: '19601',
          stateProv: 'PA',
        },
      },
    },
    {
      id: 'DS36Bxua',
      companyId: '4',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 48,
        weightPounds: 8165,
        comments: [
          {
            comment: 'PU: , DO: 07:00  14 standard pallets. no box trucks.',
          },
          {
            comment: 'Ref Load #1186607',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9753,
          location: {
            lat: 41.955,
            lon: -87.94,
          },
          city: 'Bensenville',
          county: 'DuPage',
          postalCode: '60105',
          stateProv: 'IL',
        },
        destination: {
          placeId: 11615,
          location: {
            lat: 39.68917,
            lon: -86.5225,
          },
          city: 'Clayton',
          county: 'Hendricks',
          postalCode: '46118',
          stateProv: 'IN',
        },
      },
    },
    {
      id: 'ZS01ka6F',
      companyId: '23',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 20364,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9115636',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 29118,
          location: {
            lat: 41.08139,
            lon: -81.51917,
          },
          city: 'Akron',
          county: 'Summit',
          postalCode: '44301',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4Xquw4',
      companyId: '28',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 10000,
        comments: [
          {
            comment: 'true team or strong solo; del 12/29 0700-1000',
          },
          {
            comment: 'paperwork provided by shipper; must be on macropoint',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 7101,
          location: {
            lat: 33.74889,
            lon: -84.38806,
          },
          city: 'Atlanta',
          county: 'Fulton',
          postalCode: '30303',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'LS4Xquxg',
      companyId: '20',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 24000,
      },
      lane: {
        origin: {
          placeId: 55030,
          location: {
            lat: 41.43931,
            lon: -87.67974,
          },
          city: 'University Pk',
          county: 'Will',
          postalCode: '60484',
          stateProv: 'IL',
        },
        destination: {
          placeId: 27291,
          location: {
            lat: 42.71778,
            lon: -73.83389,
          },
          city: 'Colonie',
          county: 'Albany',
          postalCode: '12205',
          stateProv: 'NY',
        },
      },
    },
    {
      id: 'LS4XrS8x',
      companyId: '2',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'PARTIAL',
        lengthFeet: 19,
        weightPounds: 4000,
        comments: [
          {
            comment: '60104240221',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 47609,
          location: {
            lat: 42.06861,
            lon: -88.41333,
          },
          city: 'Pingree Grove',
          county: 'Kane',
          postalCode: '60140',
          stateProv: 'IL',
        },
        destination: {
          placeId: 22721,
          location: {
            lat: 35.22694,
            lon: -80.84333,
          },
          city: 'Charlotte',
          county: 'Mecklenburg',
          postalCode: '28201',
          stateProv: 'NC',
        },
      },
    },
    {
      id: 'LS4Xrfen',
      companyId: '24',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 42000,
        comments: [
          {
            comment: 'MULTIPLE DROPS // NO DRVR UNLOAD',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11398,
          location: {
            lat: 41.74694,
            lon: -88.05028,
          },
          city: 'Woodridge',
          county: 'DuPage',
          postalCode: '60517',
          stateProv: 'IL',
        },
        destination: {
          placeId: 11030,
          location: {
            lat: 42.27111,
            lon: -89.09389,
          },
          city: 'Rockford',
          county: 'Winnebago',
          postalCode: '61101',
          stateProv: 'IL',
        },
      },
    },
    {
      id: 'ZS01kVDX',
      companyId: '14',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 42069,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9101470',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9810,
          location: {
            lat: 41.75,
            lon: -87.80417,
          },
          city: 'Bridgeview',
          county: 'Cook',
          postalCode: '60455',
          stateProv: 'IL',
        },
        destination: {
          placeId: 24390,
          location: {
            lat: 41.43333,
            lon: -96.49778,
          },
          city: 'Fremont',
          county: 'Dodge',
          postalCode: '68025',
          stateProv: 'NE',
        },
      },
    },
    {
      id: 'DS36BkgT',
      companyId: '24',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 42496,
        comments: [
          {
            comment: 'DRY VAN ONLY',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 11298,
          location: {
            lat: 41.88472,
            lon: -88.20389,
          },
          city: 'W Chicago',
          county: 'DuPage',
          postalCode: '60185',
          stateProv: 'IL',
        },
        destination: {
          placeId: 14130,
          location: {
            lat: 37.12889,
            lon: -84.08333,
          },
          city: 'London',
          county: 'Laurel',
          postalCode: '40741',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'LS4XqDwG',
      companyId: '25',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 29000,
        comments: [
          {
            comment: 'stop in keystone,FL',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10096,
          location: {
            lat: 41.58944,
            lon: -88.92194,
          },
          city: 'Earlville',
          county: 'La Salle',
          postalCode: '60518',
          stateProv: 'IL',
        },
        destination: {
          placeId: 6930,
          location: {
            lat: 27.94722,
            lon: -82.45861,
          },
          city: 'Tampa',
          county: 'Hillsborough',
          postalCode: '33689',
          stateProv: 'FL',
        },
      },
    },
    {
      id: 'LS4XqBb8',
      companyId: '8',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 29000,
        comments: [
          {
            comment: 'stop in keystone,FL',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10096,
          location: {
            lat: 41.58944,
            lon: -88.92194,
          },
          city: 'Earlville',
          county: 'La Salle',
          postalCode: '60518',
          stateProv: 'IL',
        },
        destination: {
          placeId: 6930,
          location: {
            lat: 27.94722,
            lon: -82.45861,
          },
          city: 'Tampa',
          county: 'Hillsborough',
          postalCode: '33689',
          stateProv: 'FL',
        },
      },
    },
    {
      id: 'LS4XrDge',
      companyId: '19',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 28000,
        comments: [
          {
            comment:
              'NO TRAILERS OLDER THAN 2012 -- NO WOODEN WALLS -- NO ROLL DOORS',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10772,
          location: {
            lat: 41.78583,
            lon: -88.14722,
          },
          city: 'Naperville',
          county: 'DuPage',
          postalCode: '60540',
          stateProv: 'IL',
        },
        destination: {
          placeId: 8079,
          location: {
            lat: 33.85444,
            lon: -84.21722,
          },
          city: 'Tucker',
          county: 'DeKalb',
          postalCode: '30084',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'LS4XqC2j',
      companyId: '15',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 10000,
        comments: [
          {
            comment: 'pod1@example.com',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10709,
          location: {
            lat: 41.45528,
            lon: -88.26167,
          },
          city: 'Minooka',
          county: 'Grundy',
          postalCode: '60447',
          stateProv: 'IL',
        },
        destination: {
          placeId: 8991,
          location: {
            lat: 41.40806,
            lon: -92.91611,
          },
          city: 'Pella',
          county: 'Marion',
          postalCode: '50219',
          stateProv: 'IA',
        },
      },
    },
    {
      id: 'LS4XqHpz',
      companyId: '8',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 9000,
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 23913,
          location: {
            lat: 46.87722,
            lon: -96.78944,
          },
          city: 'Fargo',
          county: 'Cass',
          postalCode: '58102',
          stateProv: 'ND',
        },
      },
    },
    {
      id: 'LS4XqvNE',
      companyId: '11',
      freight: {
        equipmentType: 'Flatbed',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 36600,
        comments: [
          {
            comment: 'PU 1400 DEL THURSDAY 0730',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 10214,
          location: {
            lat: 41.93528,
            lon: -87.86556,
          },
          city: 'Franklin Park',
          county: 'Cook',
          postalCode: '60131',
          stateProv: 'IL',
        },
        destination: {
          placeId: 7277,
          location: {
            lat: 33.65333,
            lon: -84.44944,
          },
          city: 'College Park',
          county: 'Fulton',
          postalCode: '30337',
          stateProv: 'GA',
        },
      },
    },
    {
      id: 'DS36C06F',
      companyId: '10',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 32000,
      },
      lane: {
        origin: {
          placeId: 10214,
          location: {
            lat: 41.93528,
            lon: -87.86556,
          },
          city: 'Franklin Park',
          county: 'Cook',
          postalCode: '60131',
          stateProv: 'IL',
        },
        destination: {
          placeId: 29680,
          location: {
            lat: 41.04417,
            lon: -83.65,
          },
          city: 'Findlay',
          county: 'Hancock',
          postalCode: '45839',
          stateProv: 'OH',
        },
      },
    },
    {
      id: 'LS4XqHsB',
      companyId: '1',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 6000,
        comments: [
          {
            comment: 'Email MC',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9884,
          location: {
            lat: 41.9125,
            lon: -88.13472,
          },
          city: 'Carol Stream',
          county: 'DuPage',
          postalCode: '60116',
          stateProv: 'IL',
        },
        destination: {
          placeId: 44977,
          location: {
            lat: 45.39444,
            lon: -92.14222,
          },
          city: 'Turtle Lake',
          county: 'Barron',
          postalCode: '54889',
          stateProv: 'WI',
        },
      },
    },
    {
      id: 'ZS01kawe',
      companyId: '6',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
        comments: [
          {
            comment:
              'Call ext 3024 or email 3024@example.com (we need REF# and MC# in ema',
          },
          {
            comment: 'il)',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 14139,
          location: {
            lat: 38.25417,
            lon: -85.75944,
          },
          city: 'Louisville',
          county: 'Jefferson',
          postalCode: '40201',
          stateProv: 'KY',
        },
      },
    },
    {
      id: 'ZS01kZMx',
      companyId: '24',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 36199,
        comments: [
          {
            comment: 'Call 555-123-4567.  Post ID: 9118240',
          },
        ],
      },
      lane: {
        origin: {
          placeId: 9927,
          location: {
            lat: 41.85,
            lon: -87.65,
          },
          city: 'Chicago',
          county: 'Cook',
          postalCode: '60601',
          stateProv: 'IL',
        },
        destination: {
          placeId: 17820,
          location: {
            lat: 42.33139,
            lon: -83.04583,
          },
          city: 'Detroit',
          county: 'Wayne',
          postalCode: '48201',
          stateProv: 'MI',
        },
      },
    },
  ];

  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);

  // GET all postings
  mock.onGet('/postings').reply(200, {
    postings: postingsData,
  });

  // POST: adds a new posting
  mock.onPost('/posting').reply(function (config) {
    postingsData.push(JSON.parse(config.data));
    return [200];
  });
};

export default createApiMockServer;