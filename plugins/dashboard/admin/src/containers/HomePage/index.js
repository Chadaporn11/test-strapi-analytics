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
import { Card, DatePicker, TimePicker, Space, Select, Form, Button } from 'antd';
import { TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
  // if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};
import { getAnalyticsRealTime, getAnalyticsTotal, getTotal } from './function/analyticsapi'



const HomePage = () => {

  const [form] = Form.useForm()
  const [statusSelect, setStatusSelect] = useState(false)
  const [dataSelect, setDataSelect] = useState('')
  const [type, setType] = useState('date');
  // const [token, setToken] = useState('')
  const [countUser, setCountUser] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')




  //API//


  // const AuthGoogle = async () => {
  //   //Get Data
  //   // setToken(JSON.parse(sessionStorage.getItem("jwtToken")))
  //   // const token = JSON.parse(sessionStorage.getItem("jwtToken"))
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`, "Content-Type": "application/json" },
  //   };
  //   const analyticstoken = await fetch(`http://localhost:1337/analyticsapis/token`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       return res
  //     });
  //   console.log('Token::', analyticstoken)
  //   const CLIENT_EMAILV4 = "test-getanalytics4@test-getanalysicv4.iam.gserviceaccount.com"
  //   const PRIVATE_KEYV4 = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEHaCRAjOIrueA\nIky0as7aTqLkilsdU9fcOzPQeWG5jUzSUoyjVIKCdyib97wJnFmx1q+vc9LRG26N\nIcOEfp/UqVQgL9QYqOy4HkiQA/ru0fWg01MWrbJA28OumI8WojG/0FIzN/7LKJ5p\nFFvYnS4sXnmrnW57PcyaFsLaGu8TdavssNtTll3KwcBbYnXAUEFvqoI9Oi/aQ+JF\nIEjtmcAtcJDwefzZBxe5uzU4RY8glH99eoQvi6JbTaW48WUuOp0bf+tEXx997Erw\nJr6zPMYi/dLOeL6DUEx7p6sGGs4TKh9bVzVm0oQ0324riC3KZpHY9MVO9MQsXr+s\nvqVY7zChAgMBAAECggEAPjBe8FzQVrGP+5Pk2vlbquJwySQOjJg/xTiIz70N/jcO\ne0tuCYUM9a4vlHXUjP+leb1obKy/10tpnRtt0qAMsvUXFjXUfhVjK2d+/xwkAINX\n7q3UlUZzVhnaTY1XIohAWmEHD/LbuzSgNxYboe8F60/yKTd9B1ure9ln5J3R3ktO\nGSXvmW6PagbpyvVkTlyH1TDg9Jz24pRtJ2O8t0M63i5IErwbOPGL5ukmkypPsNL7\nkoZjFUA0RN9682uyfvaiTisHcsG0ug9pV+HIkhvVGmnZTvAIQL64Mr6ghXbsUGzf\n6yXII5L+Pd9/TskOfUAc8iN0nM624Dtz3+3r8qDeOQKBgQDlqybkzMs9WNVvmysZ\no7FqIYqAE0SplWBTzfazKFMKCjzNyZuahb2qysfvAXLHWJfGASO9oySlY52c5hha\nSlSpAfCdQRx+7bMbElpm2nDstrNdJKCiFb3JnwjKic3pxcTlVdTfoOQyAXnYFhK8\nORsGp4z+UQQW4I09/BW0DTpwfwKBgQDambBJ2wyNKNi7QcQeTST8Sc4KUy1hz/i5\nA+zz63a6D99zzyKaiIq6HVQHaUsFiAvx9YcE4j7PxUJnPrlWDHYDaftwoUQP/4F0\nKwU5RidVyTvBQ4k7+mI8ezi3r6AeCL4vgFn22xrEmltY9OjAmSviFWN05jLa4xVt\nvfEOQv/O3wKBgQCEdMowqOAKWIJ4JJCd7+dxYzjCltpBx9HPY3kFaJtDrhXVRZIF\nc16o8tyOPlKZH8IgwyV+yGlpLWOISrf+0uGyu1ivCQ9LMQHb+iDDMvZvvwsBDA/M\niydy8dKbJRDp41KkRXVJKDyTjoBcHJbfkTvCAb3yKn1mSEmNVyaZOgvbNwKBgQDN\nob8caosvClp+JAppeqYtEPxZ6A6LsUhGOnQeq8PemOnZFeN2PLVLCCWwZxLkXCro\na8+b/3uYlPW3C2DqmgQ1h++37muJJQ/QiFt8mgqMfyTP00j3+7uHK16aJAJZ3l2R\nb4qxVUCj6pO9ZXzBGBUYsogBQj5aez0AI6nrgYkDPwKBgQCunPitZtSQHJHaEXMk\nlSMYY4G1SvoSFw/2TJbtUUMtX+YIMGEphbkgFJM/Btk5EvTWSdmmycfJW7F7XJsh\nVapjVOIRywIa+Wf5Z+617fqYKqi/4mJOs99c1FFcDUEt06pbb2XBB5k28LYnlth7\nHwnoQT24B7BGle0Yt1G3oxGzxQ==\n-----END PRIVATE KEY-----\n"
  //   const VIEW_IDV4 = "352577750"
  //   const API_KEYV4 = "AIzaSyARCgWSFd6X4AgjlfNwgPUmGdBeanVGIK4"
  //   let data = {
  //     "metrics": [
  //       {
  //         "name": "activeUsers"
  //       }
  //     ]
  //   }
  //   let x = 0;
  //   const requestOptionsPost = {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
  //     body: JSON.stringify(data),

  //   };
  //   const result = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runRealtimeReport?key=${API_KEYV4}`, requestOptionsPost)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       return res
  //     });
  //   console.log("Result:: ", result)
  //   let ans = Object.keys(result).find(key => key === 'rows') ? true : false;
  //   // let test = result.data.rows !== null || result.data.rows !== undefined ? true : false;
  //   console.log("Ans:: ", ans)
  //   if (ans) {
  //     x = result.rows[0].metricValues[0].value
  //     console.log('Have::', x)
  //     setCountUser(x)

  //   } else {
  //     x = 0;
  //     console.log('DontHave::', x)
  //     setCountUser(x)


  //   }

  // }
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
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 105, 95, 75]
      }],
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
  const loadData = () => {
    getAnalyticsRealTime().then((res) => {
      const ans = Object.keys(res).find(key => key === 'rows') ? true : false;
      if (ans) {
        setCountUser(res.rows[0].metricValues[0].value)
      } else {
        setCountUser(0)
      }
    })
  }
  const getDataAnalyticsTotals = () => {
    getAnalyticsTotal().then((res) => {
      const ans = Object.keys(res).find(key => key === 'rows') ? true : false;
      if (ans) {
        setTotalUser(res.rows[0].metricValues[0].value)
      } else {
        setTotalUser(0)
      }
    })

  }


  setInterval(() => {
    loadData()

  }, 50000)

  useEffect(() => {
    loadDataChart()
    loadData()
    getDataAnalyticsTotals()

  }, [])
  const onFinish = (values) => {
    // console.log('onFinish', `${new Date(values.date[0]).toISOString().substring(0, 10)}`)
    // let startDate = new Date(values.date[0]).toISOString().substring(0, 10)
    // let endDate = new Date(values.date[1]).toISOString().substring(0, 10)
    let Datechoose = values.date.format('YYYY-MM')
    // let endDatechoose = values.date[1].format('YYYY-MM')
    const date = new Date();
    let day = date.getDate();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let startDatechoose = `${Datechoose}-01`
    let endDatechoose = `${Datechoose}-${day}`
    // let name = month[new Date(Datechoose).getMonth()]
    // let year = new Date(Datechoose).getFullYear().toString()
    // console.log('Date::', name, year)

    // let month = values.date.getMonth() + 1;
    // let year = values.date.getFullYear();
    setStartDate(`${month[new Date(Datechoose).getMonth()]} ${new Date(Datechoose).getFullYear().toString()}`)
    setEndDate(endDatechoose)
    getTotal(startDatechoose, endDatechoose).then((res) => {
      const ans = Object.keys(res).find(key => key === 'rows') ? true : false;
      if (ans) {
        setTotalUser(res.rows[0].metricValues[0].value)
        setStatusSelect(true)

      } else {
        setTotalUser(0)
        setStatusSelect(true)

      }
    })
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    const day = new Date()
    day.setDate(day.getDate() - 1)

    return current && current > day
  };

  return (
    <div className='Dashboard-Main'>
      <div className='Dashboard-Header'>
        <h1 className='Dashboard-Header-titile'>Dashboard</h1>
      </div>
      <div className='Dashboard-container'>
        <div className='col-select'>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 1000,
            }}
            initialValues={{
              remember: true,
            }}
            layout='inline'
            form={form}
            onFinish={onFinish}>
            <Form.Item
              className="font-bold"
              label="Filter :"
              name="date"
            >
              <DatePicker
                picker="month"
                disabledDate={disabledDate}
                style={{
                  borderRadius: "5px",
                }}
                placeholder={["Month and Year"]}
              />
            </Form.Item>

            <Form.Item className="">
              <Button
                type="text"
                // className='button-search'
                // danger
                // className=" w-full rounded bg-danger text-white hover:bg-red-300"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#0ea5e9",
                  color: "white"
                }}
                onClick={() => {
                  form.submit();
                }}
              >
                Search
              </Button>
            </Form.Item>
            <Form.Item className="">
              <Button
                type="text"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#ef4444",
                  color: "white"
                }}
                // className='button-cancel'
                // className=" w-full rounded bg-gray text-white hover:bg-gray-300"
                onClick={() => {
                  form.resetFields();
                  getDataAnalyticsTotals()
                  setStatusSelect(false)

                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
          {/* <DatePicker
            style={{
              marginRight: '30px',
            }}
            onChange={onChangeDate} />
          <DatePicker
            style={{
              marginRight: '30px',
            }}
            picker="month"
            onChange={onChangeMonth} /> */}
        </div>
        <div className='col-graph'>
          <Card
            style={{
              width: '320px',
              height: '210px',
              margin: 0,
              padding: 0,
              backgroundColor: '#415994',
              alignContent: 'center',
            }}
          >
            <div className='content'>
              <div style={{ display: 'flex' }}>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '10px',
                }}>Visitors
                </p>
                <p style={{
                  fontSize: '12px',
                  color: 'white',
                  marginTop: '3px',
                  marginBottom: '30px',
                }}>( In the last 30 minutes )
                </p>
              </div>

              <div className='incontent' >
                <TeamOutlined style={{ fontSize: '60px', color: 'white' }} />
                <h1 style={{
                  color: 'white',
                }}>{countUser}</h1>
                <p style={{
                  color: 'white',
                }}></p>
                {/* <p style={{
                  color: 'white',
                }}>คน</p> */}
              </div>
              <p style={{
                color: 'white',
                marginTop: '25px',
              }} >Visitors per minute</p>
            </div>

          </Card>
          <Card
            style={{
              width: '320px',
              height: '210px',
              margin: 0,
              padding: 0,
              backgroundColor: '#415994',
              alignContent: 'center',
            }}
          >
            <div className='content'>
              <p style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '30px',
              }}>Visitors
              </p>
              <div className='incontent' >
                <TeamOutlined style={{ fontSize: '60px', color: 'white' }} />
                <h1 style={{
                  color: 'white',
                }}>{totalUser}</h1>
                <p style={{
                  color: 'white',
                }}></p>
                {/* <p style={{
                  color: 'white',
                }}>คน</p> */}
              </div>
              <p style={{
                color: 'white',
                marginTop: '25px',
              }} >
                {statusSelect && (`${startDate}`)}
                {!statusSelect && ('Current year & month')}
              </p>
            </div>

          </Card>
          <Card
            style={{
              width: '320px',
              height: '210px',
              margin: 0,
              padding: 0,
              backgroundColor: '#415994',
              alignContent: 'center',
            }}
          >
            <div className='content'>
              <p style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '30px',
              }}>Session
              </p>
              <div className='incontent' >
                <ClockCircleOutlined style={{ fontSize: '60px', color: 'white' }} />
                <h1 style={{
                  color: 'white',
                }}>{totalUser}</h1>
                <p style={{
                  color: 'white',
                }}></p>
              </div>
              <p style={{
                color: 'white',
                marginTop: '25px',
              }} >
                {statusSelect && (`${startDate}`)}
                {!statusSelect && ('Current year & month')}
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
    </div >
  );
};

export default memo(HomePage);

