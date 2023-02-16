const CLIENT_EMAILV4 = "test-getanalytics4@test-getanalysicv4.iam.gserviceaccount.com"
const PRIVATE_KEYV4 = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEHaCRAjOIrueA\nIky0as7aTqLkilsdU9fcOzPQeWG5jUzSUoyjVIKCdyib97wJnFmx1q+vc9LRG26N\nIcOEfp/UqVQgL9QYqOy4HkiQA/ru0fWg01MWrbJA28OumI8WojG/0FIzN/7LKJ5p\nFFvYnS4sXnmrnW57PcyaFsLaGu8TdavssNtTll3KwcBbYnXAUEFvqoI9Oi/aQ+JF\nIEjtmcAtcJDwefzZBxe5uzU4RY8glH99eoQvi6JbTaW48WUuOp0bf+tEXx997Erw\nJr6zPMYi/dLOeL6DUEx7p6sGGs4TKh9bVzVm0oQ0324riC3KZpHY9MVO9MQsXr+s\nvqVY7zChAgMBAAECggEAPjBe8FzQVrGP+5Pk2vlbquJwySQOjJg/xTiIz70N/jcO\ne0tuCYUM9a4vlHXUjP+leb1obKy/10tpnRtt0qAMsvUXFjXUfhVjK2d+/xwkAINX\n7q3UlUZzVhnaTY1XIohAWmEHD/LbuzSgNxYboe8F60/yKTd9B1ure9ln5J3R3ktO\nGSXvmW6PagbpyvVkTlyH1TDg9Jz24pRtJ2O8t0M63i5IErwbOPGL5ukmkypPsNL7\nkoZjFUA0RN9682uyfvaiTisHcsG0ug9pV+HIkhvVGmnZTvAIQL64Mr6ghXbsUGzf\n6yXII5L+Pd9/TskOfUAc8iN0nM624Dtz3+3r8qDeOQKBgQDlqybkzMs9WNVvmysZ\no7FqIYqAE0SplWBTzfazKFMKCjzNyZuahb2qysfvAXLHWJfGASO9oySlY52c5hha\nSlSpAfCdQRx+7bMbElpm2nDstrNdJKCiFb3JnwjKic3pxcTlVdTfoOQyAXnYFhK8\nORsGp4z+UQQW4I09/BW0DTpwfwKBgQDambBJ2wyNKNi7QcQeTST8Sc4KUy1hz/i5\nA+zz63a6D99zzyKaiIq6HVQHaUsFiAvx9YcE4j7PxUJnPrlWDHYDaftwoUQP/4F0\nKwU5RidVyTvBQ4k7+mI8ezi3r6AeCL4vgFn22xrEmltY9OjAmSviFWN05jLa4xVt\nvfEOQv/O3wKBgQCEdMowqOAKWIJ4JJCd7+dxYzjCltpBx9HPY3kFaJtDrhXVRZIF\nc16o8tyOPlKZH8IgwyV+yGlpLWOISrf+0uGyu1ivCQ9LMQHb+iDDMvZvvwsBDA/M\niydy8dKbJRDp41KkRXVJKDyTjoBcHJbfkTvCAb3yKn1mSEmNVyaZOgvbNwKBgQDN\nob8caosvClp+JAppeqYtEPxZ6A6LsUhGOnQeq8PemOnZFeN2PLVLCCWwZxLkXCro\na8+b/3uYlPW3C2DqmgQ1h++37muJJQ/QiFt8mgqMfyTP00j3+7uHK16aJAJZ3l2R\nb4qxVUCj6pO9ZXzBGBUYsogBQj5aez0AI6nrgYkDPwKBgQCunPitZtSQHJHaEXMk\nlSMYY4G1SvoSFw/2TJbtUUMtX+YIMGEphbkgFJM/Btk5EvTWSdmmycfJW7F7XJsh\nVapjVOIRywIa+Wf5Z+617fqYKqi/4mJOs99c1FFcDUEt06pbb2XBB5k28LYnlth7\nHwnoQT24B7BGle0Yt1G3oxGzxQ==\n-----END PRIVATE KEY-----\n"
const VIEW_IDV4 = "352577750"
const API_KEYV4 = "AIzaSyARCgWSFd6X4AgjlfNwgPUmGdBeanVGIK4"

export const AuthGoogle = async () => {
    const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`, "Content-Type": "application/json" },
    };
    const analyticstoken = await fetch(`http://localhost:1337/analyticsapis/token`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    return analyticstoken


}

export const getAnalyticsRealTime = async () => {
    const analyticstoken = await AuthGoogle()
    let data = {
        "metrics": [
            {
                "name": "activeUsers"
            }
        ]
    }
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
    return result

}

export const getAnalyticsTotal = async () => {
    const analyticstoken = await AuthGoogle()
    let data = {
        "metrics": [
            {
                "name": "totalUsers"
            },
            {
                "name": "sessions"
            }
        ],
        "dateRanges": [
            {
                "startDate": "2023-02-01",
                "endDate": "today"
            }
        ]
    }
    console.log("data1::", data);

    const requestOptions = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),

    };
    const result = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    return result

}

export const getTotal = async (startDate, endDate) => {
    const analyticstoken = await AuthGoogle()
    let data = {
        "metrics": [
            {
                "name": "newUsers"
            },
            {
                "name": "sessions"
            }

        ],
        "dateRanges": [
            {
                "startDate": startDate,
                "endDate": endDate
            }
        ]
    }
    const requestOptions = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),

    };
    const result = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    return result

}

// const getDataChart = async () => {
//     let quarter01 = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions)

//     const results = Promise.all([quarter01, quarter01, quarter01, quarter01])
// }
export const getDataChart = async (year) => {
    let data1 = {
        "metrics": [
            {
                "name": "totalUsers"
            },
            {
                "name": "newUsers"
            }
        ],
        "dateRanges": [
            {
                "name": "JAN",
                "startDate": `${year}-02-01`,
                "endDate": `${year}-02-07`
            },
            {
                "name": "FEB",
                "startDate": `${year}-02-07`,
                "endDate": `${year}-02-08`
            },
            {
                "name": "MAR",
                "startDate": `${year}-02-08`,
                "endDate": `${year}-02-09`
            },
        ]
    }
    let data2 = {
        "metrics": [
            {
                "name": "totalUsers"
            },
            {
                "name": "newUsers"
            }
        ],
        "dateRanges": [
            {
                "name": "APR",
                "startDate": `${year}-02-10`,
                "endDate": `${year}-02-11`
            },
            {
                "name": "MAY",
                "startDate": `${year}-02-11`,
                "endDate": `${year}-02-12`
            },
            {
                "name": "JUN",
                "startDate": `${year}-02-12`,
                "endDate": `${year}-02-13`
            },
        ]
    }
    let data3 = {
        "metrics": [
            {
                "name": "totalUsers"
            },
            {
                "name": "newUsers"
            }
        ],
        "dateRanges": [
            {
                "name": "JUL",
                "startDate": `${year}-02-01`,
                "endDate": `${year}-02-07`
            },
            {
                "name": "AUG",
                "startDate": `${year}-02-07`,
                "endDate": `${year}-02-08`
            },
            {
                "name": "SEPT",
                "startDate": `${year}-02-08`,
                "endDate": `${year}-02-09`
            },
        ]
    }
    let data4 = {
        "metrics": [
            {
                "name": "totalUsers"
            },
            {
                "name": "newUsers"
            }
        ],
        "dateRanges": [
            {
                "name": "OCT",
                "startDate": `${year}-02-10`,
                "endDate": `${year}-02-11`
            },
            {
                "name": "NOV",
                "startDate": `${year}-02-11`,
                "endDate": `${year}-02-12`
            },
            {
                "name": "DEC",
                "startDate": `${year}-02-12`,
                "endDate": `${year}-02-13`
            },
        ]
    }
    const analyticstoken = await AuthGoogle()
    const requestOptions1 = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data1),

    };
    const requestOptions2 = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data2),

    };
    const requestOptions3 = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data3),

    };
    const requestOptions4 = {
        method: "POST",
        headers: { Authorization: `Bearer ${analyticstoken.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data4),

    };

    let quarter01 = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions1)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    let quarter02 = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions2)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    let quarter03 = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions3)
        .then((response) => response.json())
        .then((res) => {
            return res
        });
    let quarter04 = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${VIEW_IDV4}:runReport?key=${API_KEYV4}`, requestOptions4)
        .then((response) => response.json())
        .then((res) => {
            return res
        });


    const results = Promise.all([quarter01, quarter02, quarter03, quarter04])
    return results

    // return response
}


