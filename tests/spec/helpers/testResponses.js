var mockData = [{
    "page": 1,
    "number_of_pages": 12,
    "data": [{
       "tw123":1000
    }, {
       "tv4352":10042
    }]
}, {
    "page": 2,
    "number_of_pages": 12,
    "data":  [{
       "tw132123":12341234214
    }, {
       "tv4123352":32413241042
    }]
}];

var TestResponses = {
    getRecords: {
        page: [null,{
            success: {
                readyState: 4,
                status: 200,
                responseText: JSON.stringify(mockData[0])
            }
        }, {
            success: {
                status: 200,
                responseText: JSON.stringify(mockData[1])
            }
        }]
    },
};