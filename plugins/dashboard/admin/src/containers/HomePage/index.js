/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import pluginId from '../../pluginId';
import './index.css';

//functions
import { getAnalyticsRealTime, getAnalyticsTotal, getTotal, getDataChart } from './function/analyticsapi'
//Chart
import ApexCharts from 'apexcharts'

//ant design
import { TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, DatePicker, Form, Button, Spin } from 'antd';




const HomePage = () => {

  const [form] = Form.useForm()
  const [formchart] = Form.useForm()

  const [statusSelect, setStatusSelect] = useState(false)
  const [statusChart, setStatusChart] = useState(false)
  const [countUser, setCountUser] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [chartnew, setChartNew] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [charttotal, setChartTotal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [session, setSession] = useState(0)
  const [startDate, setStartDate] = useState('')

  //Chart Bar//
  // const loadDataChart = (ansans) => {
  var options = {
    chart: {
      id: 'chart',
      height: '350px',
      type: 'bar'
    },
    series: [{
      name: 'Total Visitors',
      data: charttotal
    },
    {
      name: 'New Visitors',
      data: chartnew
    }],
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  }

  // }
  //Chart Bar//

  //GetData Realtimes//
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
  //GetData Realtimes//

  //GetData ReportUser Total//
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
  //GetData ReportUser Total//

  //GetData Chart//
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
      console.log('Conditions:', conditions)
      if (conditions) {
        const ans = res.flatMap((item) => item.rows).reduce((result, item) => {
          if (item !== undefined) {
            const monthName = item.dimensionValues[0].value
            console.log('Item::', monthName)
            // console.log(result)
            const findindex = result.findIndex((m) => m.name.toUpperCase() === monthName)
            // console.log('findIndex:', findindex)
            // console.log('item::', item)
            result[findindex].total = Number(item.metricValues[0].value)
            result[findindex].new = Number(item.metricValues[1].value)

          }


          return result

        }, month)

        const ansnew = ans.flatMap((item) => item.new)
        const anstotal = ans.flatMap((item) => item.total)
        console.log('ansnew::', ansnew)
        console.log('anstotal::', anstotal)
        const ansans = {
          new: ansnew,
          total: anstotal
        }
        ApexCharts.exec('chart', "updateSeries", [{
          name: 'Total Visitors',
          data: anstotal
        }, {
          name: 'Total Visitors',
          data: ansnew
        }
        ]);
        // loadDataChart(ansans)
        setStatusChart(false)




      } else {
        const ansnew = month.flatMap((item) => item.new)
        const anstotal = month.flatMap((item) => item.total)
        console.log('Elseansnew::', ansnew)
        console.log('Elseanstotal::', anstotal)
        const ansans = {
          new: ansnew,
          total: anstotal
        }
        // loadDataChart(ansans)
        ApexCharts.exec('chart', "updateSeries", [{
          name: 'Total Visitors',
          data: anstotal
        }, {
          name: 'Total Visitors',
          data: ansnew
        }
        ]);
        setStatusChart(false)




      }

    }).catch((err) => {
      setStatusChart(false)
      console.log('ERROR:', err)
    })
  }
  //GetData Chart//

  //function Chart//
  const getDataSelectChart = (year) => {

    getDataChart(year).then((res) => {
      const month = [
        { name: "JAN", new: 0, total: 0 }, { name: "Feb", new: 0, total: 0 }, { name: "Mar", new: 0, total: 0 }, { name: "Apr", new: 0, total: 0 }, { name: "May", new: 0, total: 0 }, { name: "Jun", new: 0, total: 0 },
        { name: "Jul", new: 0, total: 0 }, { name: "Aug", new: 0, total: 0 }, { name: "Sept", new: 0, total: 0 }, { name: "Oct", new: 0, total: 0 }, { name: "Nov", new: 0, total: 0 }, { name: "Dec", new: 0, total: 0 }];
      const conditions = Object.keys(res[0]).find(key => key === 'rows') ? true : false;
      console.log('Conditions:', conditions)
      if (conditions) {
        const ans = res.flatMap((item) => item.rows).reduce((result, item) => {
          if (item !== undefined) {
            const monthName = item.dimensionValues[0].value
            // console.log('Item::', monthName)
            // console.log(result)
            const findindex = result.findIndex((m) => m.name.toUpperCase() === monthName)
            // console.log('findIndex:', findindex)
            // console.log('item::', item)
            result[findindex].total = Number(item.metricValues[0].value)
            result[findindex].new = Number(item.metricValues[1].value)

          }


          return result


        }, month)

        const ansnew = ans.flatMap((item) => item.new)
        const anstotal = ans.flatMap((item) => item.total)
        console.log('selectansnew::', ansnew)
        console.log('selectanstotal::', anstotal)
        // chart.updateSeries([{
        //   name: 'Total Visitors',
        //   data: anstotal
        // }]);
        // chart.updateSeries([{
        //   name: 'New Visitors',
        //   data: ansnew
        // }]);
        ApexCharts.exec('chart', "updateSeries", [{
          name: 'Total Visitors',
          data: anstotal
        }, {
          name: 'Total Visitors',
          data: ansnew
        }
        ]);
        setStatusChart(false)



      } else {
        const ansnew = month.flatMap((item) => item.new)
        const anstotal = month.flatMap((item) => item.total)
        console.log('Elseansnew::', ansnew)
        console.log('Elseanstotal::', anstotal)
        // chart.updateSeries([{
        //   name: 'Total Visitors',
        //   data: anstotal
        // }]);
        // chart.updateSeries([{
        //   name: 'New Visitors',
        //   data: ansnew
        // }]);
        ApexCharts.exec('chart', "updateSeries", [{
          name: 'Total Visitors',
          data: anstotal
        }, {
          name: 'Total Visitors',
          data: ansnew
        }
        ]);
        setStatusChart(false)




      }
    }).catch((err) => {
      setStatusChart(false)
      console.log('ERROR:', err)
    })
  }
  //function Chart//

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

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


  }, [])

  //Search User&Sessions//
  const onFinishSearch = (values) => {
    // console.log('onFinish', `${new Date(values.date[0]).toISOString().substring(0, 10)}`)
    // let startDate = new Date(values.date[0]).toISOString().substring(0, 10)
    // let endDate = new Date(values.date[1]).toISOString().substring(0, 10)
    let Datechoose = values.date.format('YYYY-MM')
    console.log('values:::', Datechoose)

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
    // setEndDate(endDatechoose)
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
  //Search User&Sessions//

  //Search Chart//
  const onFinishChart = (values) => {
    console.log('test', values)
    let Yearchoose = values.year.format('YYYY')
    console.log('selectyear::', Yearchoose)

    getDataSelectChart(Number(Yearchoose))

  };
  //Search Chart//

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
            onFinish={onFinishSearch}
          >
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
              {statusChart && (
                <Spin />
              )}

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
                form={formchart}
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
                      formchart.submit();
                      setStatusChart(true)

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
                      formchart.resetFields();
                      const date = new Date();
                      let year = date.getFullYear();
                      getDataSelectChart(year)
                      setStatusChart(true)

                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </div>


            {/* Graph Bar */}

            <div id="chart"></div>

            {/* <BarChart
              chartnew={chartnew}
              charttotal={charttotal}
            /> */}
            <div style={{ width: '100%', textAlign: 'center' }}>Website visitor statistics for each month</div>



          </div>

        </div>
      </div >
    </div >
  );
};

export default memo(HomePage);

