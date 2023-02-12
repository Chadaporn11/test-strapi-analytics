/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
// import '../../index.css';
import './index.css';
// import { testGoogleAuth } from '../../controllers/analytics'
// import '../../styles.css';

// import '../node_modules/react-vis/dist/style.css';
// import '../../../../../../node_modules/react-vis/dist/style.css';
// import { XYPlot, LineSeries } from 'react-vis';
// import { Data } from "../../utils/Data";
// import Chart from "chart.js/auto";
// import { Pie } from "react-chartjs-2";
import ApexCharts from 'apexcharts'
import { Card, DatePicker, TimePicker, Space, Select } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
  // if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};



const HomePage = () => {

  const [statusSelect, setStatusSelect] = useState(false)
  const [dataSelect, setDataSelect] = useState('')
  const [type, setType] = useState('date');
  const [token, setToken] = useState('')
  const [countUser, setCountUser] = useState(0)


  //API//


  const AuthGoogle = async () => {
    //Get Data

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2MDA2OTYzLCJleHAiOjE2Nzg1OTg5NjN9.3OB2av8hSUsZZW8Q-ddJF7-kkKfeXKRT9jN63_Jk-H8'
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    };
    const analyticstoken = await fetch(`http://localhost:1337/analyticsapis/token`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        return res
      });
    console.log('Token::', analyticstoken)
    const CLIENT_EMAILV4 = "test-getanalytics4@test-getanalysicv4.iam.gserviceaccount.com"
    const PRIVATE_KEYV4 = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEHaCRAjOIrueA\nIky0as7aTqLkilsdU9fcOzPQeWG5jUzSUoyjVIKCdyib97wJnFmx1q+vc9LRG26N\nIcOEfp/UqVQgL9QYqOy4HkiQA/ru0fWg01MWrbJA28OumI8WojG/0FIzN/7LKJ5p\nFFvYnS4sXnmrnW57PcyaFsLaGu8TdavssNtTll3KwcBbYnXAUEFvqoI9Oi/aQ+JF\nIEjtmcAtcJDwefzZBxe5uzU4RY8glH99eoQvi6JbTaW48WUuOp0bf+tEXx997Erw\nJr6zPMYi/dLOeL6DUEx7p6sGGs4TKh9bVzVm0oQ0324riC3KZpHY9MVO9MQsXr+s\nvqVY7zChAgMBAAECggEAPjBe8FzQVrGP+5Pk2vlbquJwySQOjJg/xTiIz70N/jcO\ne0tuCYUM9a4vlHXUjP+leb1obKy/10tpnRtt0qAMsvUXFjXUfhVjK2d+/xwkAINX\n7q3UlUZzVhnaTY1XIohAWmEHD/LbuzSgNxYboe8F60/yKTd9B1ure9ln5J3R3ktO\nGSXvmW6PagbpyvVkTlyH1TDg9Jz24pRtJ2O8t0M63i5IErwbOPGL5ukmkypPsNL7\nkoZjFUA0RN9682uyfvaiTisHcsG0ug9pV+HIkhvVGmnZTvAIQL64Mr6ghXbsUGzf\n6yXII5L+Pd9/TskOfUAc8iN0nM624Dtz3+3r8qDeOQKBgQDlqybkzMs9WNVvmysZ\no7FqIYqAE0SplWBTzfazKFMKCjzNyZuahb2qysfvAXLHWJfGASO9oySlY52c5hha\nSlSpAfCdQRx+7bMbElpm2nDstrNdJKCiFb3JnwjKic3pxcTlVdTfoOQyAXnYFhK8\nORsGp4z+UQQW4I09/BW0DTpwfwKBgQDambBJ2wyNKNi7QcQeTST8Sc4KUy1hz/i5\nA+zz63a6D99zzyKaiIq6HVQHaUsFiAvx9YcE4j7PxUJnPrlWDHYDaftwoUQP/4F0\nKwU5RidVyTvBQ4k7+mI8ezi3r6AeCL4vgFn22xrEmltY9OjAmSviFWN05jLa4xVt\nvfEOQv/O3wKBgQCEdMowqOAKWIJ4JJCd7+dxYzjCltpBx9HPY3kFaJtDrhXVRZIF\nc16o8tyOPlKZH8IgwyV+yGlpLWOISrf+0uGyu1ivCQ9LMQHb+iDDMvZvvwsBDA/M\niydy8dKbJRDp41KkRXVJKDyTjoBcHJbfkTvCAb3yKn1mSEmNVyaZOgvbNwKBgQDN\nob8caosvClp+JAppeqYtEPxZ6A6LsUhGOnQeq8PemOnZFeN2PLVLCCWwZxLkXCro\na8+b/3uYlPW3C2DqmgQ1h++37muJJQ/QiFt8mgqMfyTP00j3+7uHK16aJAJZ3l2R\nb4qxVUCj6pO9ZXzBGBUYsogBQj5aez0AI6nrgYkDPwKBgQCunPitZtSQHJHaEXMk\nlSMYY4G1SvoSFw/2TJbtUUMtX+YIMGEphbkgFJM/Btk5EvTWSdmmycfJW7F7XJsh\nVapjVOIRywIa+Wf5Z+617fqYKqi/4mJOs99c1FFcDUEt06pbb2XBB5k28LYnlth7\nHwnoQT24B7BGle0Yt1G3oxGzxQ==\n-----END PRIVATE KEY-----\n"
    const VIEW_IDV4 = "352577750"
    const API_KEYV4 = "AIzaSyARCgWSFd6X4AgjlfNwgPUmGdBeanVGIK4"
    let data = {
      "metrics": [
        {
          "name": "activeUsers"
        }
      ]
    }
    let x = 0;
    const requestOptionsPost = {
      method: "POST",
      headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),

    };
    const result = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runRealtimeReport?key=${API_KEYV4}`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        return res
      });
    console.log("Result:: ", result)
    let ans = Object.keys(result).find(key => key === 'rows') ? true : false;
    // let test = result.data.rows !== null || result.data.rows !== undefined ? true : false;
    console.log("Ans:: ", ans)
    if (ans) {
      x = result.rows[0].metricValues[0].value
      console.log('Have::', x)
      setCountUser(x)

    } else {
      x = 0;
      console.log('DontHave::', x)
      setCountUser(x)


    }

  }

  setInterval(() => {
    AuthGoogle()

  }, 20000)
  // console.log('CountUser::', countUser)

  //API//


  const onChangeDate = (date, dateString) => {
    setStatusSelect(true);
    setDataSelect(dateString);
    console.log(date, dateString);
  };
  const onChangeMonth = (date, dateString) => {
    setStatusSelect(true);
    setDataSelect(dateString);
    console.log(date, dateString);
  };
  // const onChange = (date, dateString) => {
  //   console.log(dateString);
  // };

  const loadDataChart = () => {
    var options = {
      chart: {
        height: '350px',
        type: 'bar'
      },
      series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    ////////////////////
    // var options02 = {
    //   chart: {
    //     height: '350px',
    //     type: "bar",
    //     stacked: false
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   colors: ["#FF1654", "#247BA0"],
    //   series: [
    //     {
    //       name: "Series A",
    //       data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    //     },
    //     {
    //       name: "Series B",
    //       data: [20, 29, 37, 36, 44, 45, 50, 58]
    //     }
    //   ],
    //   stroke: {
    //     width: [4, 4]
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "20%"
    //     }
    //   },
    //   xaxis: {
    //     categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    //   },
    //   yaxis: [
    //     {
    //       axisTicks: {
    //         show: true
    //       },
    //       axisBorder: {
    //         show: true,
    //         color: "#FF1654"
    //       },
    //       labels: {
    //         style: {
    //           colors: "#FF1654"
    //         }
    //       },
    //       title: {
    //         text: "Series A",
    //         style: {
    //           color: "#FF1654"
    //         }
    //       }
    //     },
    //     {
    //       opposite: true,
    //       axisTicks: {
    //         show: true
    //       },
    //       axisBorder: {
    //         show: true,
    //         color: "#247BA0"
    //       },
    //       labels: {
    //         style: {
    //           colors: "#247BA0"
    //         }
    //       },
    //       title: {
    //         text: "Series B",
    //         style: {
    //           color: "#247BA0"
    //         }
    //       }
    //     }
    //   ],
    //   tooltip: {
    //     shared: false,
    //     intersect: true,
    //     x: {
    //       show: false
    //     }
    //   },
    //   legend: {
    //     horizontalAlign: "left",
    //     offsetX: 40
    //   }
    // };

    // var chart02 = new ApexCharts(document.querySelector("#chart02"), options02);
    // var optionspie = {
    //   chart: {
    //     width: '250px',
    //     type: "donut"
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   series: [44, 55, 13, 33]
    // };
    // var chartpie = new ApexCharts(document.querySelector('#chartpie'), optionspie);
    // ///////////////////////////
    // var options1 = {
    //   series: [44, 55, 13, 43, 5, 15, 7, 26, 45, 10, 15, 12],
    //   colors: ['#ffb822', '#249EFA', '#1dc9b7', '#fd397a', '#5578eb', '#ffb822', '#249EFA', '#1dc9b7', '#fd397a', '#5578eb', '#ffb822', '#249EFA'],
    //   chart: {
    //     type: 'donut',
    //     width: '190px'
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //   legend: {
    //     show: false,
    //   },
    //   fill: {
    //     type: 'gradient',
    //   },
    //   responsive: [{
    //     breakpoint: '210px',
    //     options: {
    //       chart: {
    //         width: '190px'
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }],
    //   tooltip: {
    //     custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //       return (
    //         '<div class="arrow_box">' +
    //         // '<img style="margin: 10px" width="20" height="20" src="https://cdn.pixabay.com/photo/2020/12/29/10/07/coast-5870088_960_720.jpg">' +
    //         "<span>" +
    //         w.globals.labels[seriesIndex] +
    //         ": " +
    //         series[seriesIndex] +
    //         "</span>" +
    //         "</div>"
    //       );
    //     }
    //   },
    //   plotOptions: {
    //     pie: {
    //       expandOnClick: false,
    //       donut: {
    //         labels: {
    //           show: true,
    //           name: {
    //             show: true,
    //             fontSize: '22px',
    //             offsetY: -5
    //           },
    //           value: {
    //             show: true,
    //             fontSize: '16px',
    //             color: undefined,
    //             offsetY: +5,
    //             formatter: function (val) {
    //               return val
    //             }
    //           },
    //           total: {
    //             show: true,
    //             label: 'Total',
    //             color: '#ffa500',
    //             formatter: function (w) {
    //               return w.globals.seriesTotals.reduce((a, b) => {
    //                 return a + b
    //               }, 0)
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // };

    // var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    // ////////////////////////////////////////////////////////////////////////////
    // var options03 = {
    //   chart: {
    //     height: '350px',
    //     type: "line",
    //     stacked: false
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   colors: ["#FF1654", "#247BA0"],
    //   series: [
    //     {
    //       name: "Series A",
    //       data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    //     },
    //     {
    //       name: "Series B",
    //       data: [20, 29, 37, 36, 44, 45, 50, 58]
    //     }
    //   ],
    //   stroke: {
    //     width: [4, 4]
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "20%"
    //     }
    //   },
    //   xaxis: {
    //     categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    //   },
    //   yaxis: [
    //     {
    //       axisTicks: {
    //         show: true
    //       },
    //       axisBorder: {
    //         show: true,
    //         color: "#FF1654"
    //       },
    //       labels: {
    //         style: {
    //           colors: "#FF1654"
    //         }
    //       },
    //       title: {
    //         text: "Series A",
    //         style: {
    //           color: "#FF1654"
    //         }
    //       }
    //     },
    //     {
    //       opposite: true,
    //       axisTicks: {
    //         show: true
    //       },
    //       axisBorder: {
    //         show: true,
    //         color: "#247BA0"
    //       },
    //       labels: {
    //         style: {
    //           colors: "#247BA0"
    //         }
    //       },
    //       title: {
    //         text: "Series B",
    //         style: {
    //           color: "#247BA0"
    //         }
    //       }
    //     }
    //   ],
    //   tooltip: {
    //     shared: false,
    //     intersect: true,
    //     x: {
    //       show: false
    //     }
    //   },
    //   legend: {
    //     horizontalAlign: "left",
    //     offsetX: 40
    //   }
    // };

    // var chart03 = new ApexCharts(document.querySelector("#chart03"), options03);
    // chart1.render();
    // chartpie.render();
    // chart02.render();
    // chart03.render();


  }


  useEffect(() => {
    loadDataChart()
    AuthGoogle()

  }, [])


  return (
    <div className='Dashboard-Main'>
      <div className='Dashboard-Header'>
        <h1 className='Dashboard-Header-titile'>Dashboard</h1>
      </div>
      <div className='Dashboard-container'>
        <div className='col-select'>
          <DatePicker
            style={{
              marginRight: '30px',
            }}
            onChange={onChangeDate} />
          <DatePicker
            style={{
              marginRight: '30px',
            }}
            picker="month"
            onChange={onChangeMonth} />
        </div>
        <div className='col-graph'>
          <Card
            style={{
              width: '500px',
              height: '200px',
              margin: 0,
              padding: 0,
              backgroundColor: '#415994',
              alignContent: 'center',
            }}
          >
            <div className='content'>
              <p style={{
                color: 'white',
                marginBottom: '30px',
              }}>จำนวนผู้เข้าชมเว็บไซต์
              </p>
              <div className='incontent' >
                <TeamOutlined style={{ fontSize: '60px', color: 'white' }} />
                <h1 style={{
                  color: 'white',
                }}>{countUser}</h1>
                <p style={{
                  color: 'white',
                }}>คน</p>
              </div>
              <p style={{
                color: 'white',
                marginTop: '25px',
              }} >ตอนนี้</p>
            </div>

          </Card>
          <Card
            style={{
              width: '500px',
              height: '200px',
              margin: 0,
              padding: 0,
              backgroundColor: '#415994',
              alignContent: 'center',
            }}
          >
            <div className='content'>
              <p style={{
                color: 'white',
                marginBottom: '30px',
              }}>จำนวนผู้เข้าชมเว็บไซต์
              </p>
              <div className='incontent' >
                <TeamOutlined style={{ fontSize: '60px', color: 'white' }} />
                <h1 style={{
                  color: 'white',
                }}>150</h1>
                <p style={{
                  color: 'white',
                }}>คน</p>
              </div>
              <p style={{
                color: 'white',
                marginTop: '25px',
              }} >
                {statusSelect && ({ dataSelect })}
                {!statusSelect && ('เดือนปัจจุบัน')}
              </p>
            </div>

          </Card>
          {/* <Card
            style={{
              width: '260px',
              height: '200px',
              margin: 0,
              padding: 0,
              backgroundColor: '#white',
              alignContent: 'center',
            }}
          >
            <div className='content-pie'>
              <div className='incontent-chartpie' >
                <div id="chart1"></div>
              </div>
              <div style={{ width: '100%', textAlign: 'center' }}>จำนวนผู้เข้าชมเว็บไซต์</div>


            </div>

          </Card> */}
        </div>
        <div className='col-graph'>
          <div className='graph-bar02'>
            <Space direction="horizontal" style={{ justifyContent: 'end', marginTop: '60px', marginRight: '60px', marginBottom: '30px' }}>
              {/* <DatePicker onChange={onChange} />
              <DatePicker onChange={onChange} picker="week" />
              <DatePicker onChange={onChange} picker="month" />
              <DatePicker onChange={onChange} picker="year" /> */}
              <Select value={type} onChange={setType}>
                <Option value="date">Date</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
              <PickerWithType type={type} onChange={(value) => console.log(value)} />
            </Space>


            {/* Graph Bar */}
            <div id="chart"></div>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '30px' }}>สถิติโครงการยอดนิยมในเเต่ละ วัน/ สัปดาห์/ เดือน/ ปี</div>



          </div>

        </div>
      </div >
      {/* <h1>HomePage</h1>
      <p>Happy coding</p> */}
    </div >
  );
};

export default memo(HomePage);

{/* <div className='Main'>
  <div className='Header'>
    <h1 className='Header-titile'>Dashboard</h1>
  </div>
  <div className='container'>
    <div className='col-graph'>
      <div className='graph-data'>
        <h1>25</h1>
        <p>จำนวนผู้เข้าชมเว็บไซต์ ณ เวลาปัจจุบัน</p>
      </div>
      <div className='graph-data'>
        <h1>300</h1>
        <p>จำนวนผู้เข้าชมเว็บไซต์ ณ เดือนปัจจุบัน</p>
      </div>
      <div className='graph-data'>
        <h1>95</h1>
        <p>จำนวนผู้เข้าชมเว็บไซต์วัน...</p>
      </div>
      <div className='graph-data'>
        <div id="chart1"></div>
      </div>
    </div>
    <div className='col-graph'>
      <div className='graph-bar'>
        <div id="chart02"></div>
      </div>
      <div className='graph-bar'>
        <div id="chart03"></div>
      </div>
    </div>
    <div className='col-graph'>
      <div className='graph-bar02'>
        <div id="chart"></div>

      </div>
    </div>
  </div>
</div > */}

//=========start============//
/*
 *
 * HomePage
 *
 */

// import React, { memo } from 'react';
// // import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>{pluginId}&apos;s HomePage</h1>
//       <p>Happy coding</p>
//     </div>
//   );
// };

// export default memo(HomePage);

