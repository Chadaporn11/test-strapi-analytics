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
import { getAnalyticsRealTime, getAnalyticsTotal, getTotal, getDataChart } from './function/analyticsapi'



const HomePage = () => {

  const [form] = Form.useForm()
  const [statusSelect, setStatusSelect] = useState(false)
  const [statusChart, setStatusChart] = useState(false)

  const [dataSelect, setDataSelect] = useState('')
  const [type, setType] = useState('date');
  // const [token, setToken] = useState('')
  const [countUser, setCountUser] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [chartnew, setChartNew] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [charttotal, setChartTotal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [session, setSession] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  const loadDataChart = (ansans) => {
    var options = {
      chart: {
        height: '350px',
        type: 'bar'
      },
      series: [{
        name: 'Total Visitors',
        data: ansans.total
      },
      {
        name: 'New Visitors',
        data: ansans.new
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
        setSession(res.rows[0].metricValues[1].value)

      } else {
        setTotalUser(0)
        setSession(0)

      }
    })

  }
  const getDataAnalyticsChart = (year) => {

    getDataChart(year).then((res) => {
      console.log('RES::', res)
      console.log('RES1::', res[0].rows) //arr 3 JAN FEB MAR
      console.log('RES2::', res[1].rows) //arr 3 APR MAY JUN
      console.log('RES3::', res[2].rows) //arr 3 JUL AUG SEPT
      console.log('RES4::', res[3].rows) //arr 3 OCT NOV DEC
      const month = [
        { name: "JAN", new: 0, total: 0 }, { name: "Feb", new: 0, total: 0 }, { name: "Mar", new: 0, total: 0 }, { name: "Apr", new: 0, total: 0 }, { name: "May", new: 0, total: 0 }, { name: "Jun", new: 0, total: 0 },
        { name: "Jul", new: 0, total: 0 }, { name: "Aug", new: 0, total: 0 }, { name: "Sept", new: 0, total: 0 }, { name: "Oct", new: 0, total: 0 }, { name: "Nov", new: 0, total: 0 }, { name: "Dec", new: 0, total: 0 }];
      const conditions = Object.keys(res[0]).find(key => key === 'rows') ? true : false;
      console.log('conditions::', conditions)
      if (conditions) {
        const ans = res.flatMap((item) => item.rows).reduce((result, item) => {
          const monthName = item.dimensionValues[0].value
          // console.log('Item::', monthName)
          // console.log(result)
          const findindex = result.findIndex((m) => m.name.toUpperCase() === monthName)
          // console.log('findIndex:', findindex)
          // console.log('item::', item)
          result[findindex].total = Number(item.metricValues[0].value)
          result[findindex].new = Number(item.metricValues[1].value)

          return result

        }, month)

        const ansnew = ans.flatMap((item) => item.new)
        const anstotal = ans.flatMap((item) => item.total)
        const ansans = {
          new: ansnew,
          total: anstotal
        }
        loadDataChart(ansans)

      } else {
        const ansnew = month.flatMap((item) => item.new)
        const anstotal = month.flatMap((item) => item.total)
        console.log('Elseansnew::', ansnew)
        console.log('Elseanstotal::', anstotal)

        const ansans = {
          new: ansnew,
          total: anstotal
        }
        loadDataChart(ansans)


      }


      // const ansans = {
      //   new: ansnew,
      //   total: anstotal
      // }
      // // setChartNew(ansnum)
      // // setChartTotal(anstotal)
      // var options = {
      //   chart: {
      //     height: '350px',
      //     type: 'bar'
      //   },
      //   series: [{
      //     name: 'Total Visitors',
      //     data: anstotal
      //   },
      //   {
      //     name: 'New Visitors',
      //     data: ansnew
      //   }],
      //   xaxis: {
      //     categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      //   }
      // }

      // var chart = new ApexCharts(document.querySelector("#chart"), options);
      // chart.render();




    }).catch((err) => {
      console.log('ERROR:', err)
    })
  }


  setInterval(() => {
    loadData()

  }, 50000)

  useEffect(() => {
    const date = new Date();
    let year = date.getFullYear();
    console.log('defaultyear::', typeof (year))
    getDataAnalyticsChart(year)
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
        setSession(res.rows[0].metricValues[1].value)
        setStatusSelect(true)

      } else {
        setTotalUser(0)
        setStatusSelect(true)
        setSession(0)


      }
    })
  };
  const onFinishChart = (values) => {
    let Yearchoose = values.year.format('YYYY')
    console.log('selectyear::', Yearchoose)

    getDataAnalyticsChart(Number(Yearchoose))

  };
  const disabledDate = (current) => {
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
                  const date = new Date();
                  let year = date.getFullYear();
                  getDataAnalyticsChart(year)
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
                }}>{session}</h1>
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
            {/* <Space direction="horizontal" style={{ justifyContent: 'end', marginTop: '60px', marginRight: '60px', marginBottom: '30px' }}>
              <Select value={type} onChange={setType}>
                <Option value="date">Date</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
              <PickerWithType type={type} onChange={(value) => console.log(value)} />
              <DatePicker picker="year" disabledDate={disabledDate} />
            </Space> */}
            <div className='col-select-chart'>

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
                onFinish={onFinishChart}>
                <Form.Item
                  className="font-bold"
                  label="Filter :"
                  name="year"
                >
                  <DatePicker
                    picker="year"
                    disabledDate={disabledDate}
                    style={{
                      borderRadius: "5px",
                    }}
                    placeholder={["Year"]}
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
                      getDataAnalyticsChart()
                      setStatusChart(false)

                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </div>


            {/* Graph Bar */}
            <div id="chart"></div>
            <div style={{ width: '100%', textAlign: 'center' }}>Website visitor statistics for each month</div>



          </div>

        </div>
      </div >
    </div >
  );
};

export default memo(HomePage);

