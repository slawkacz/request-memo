describe("Request", function() {
    var params = {};
    describe('Request with Promise', function() {
        beforeEach(function(done) {
            Request.clearCache();
            params = {
                "foo": "bar",
                "displays": "samsung",
                "product_id": 3,
                "sort_by": "price",
                "sort_order": "DESC",
                "search_phrase": "",
                "page": 1
            }
            jasmine.Ajax.install();
            spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();
            var url = API_URL + 'displays' + "?" + Request.serialize(params);
            jasmine.Ajax.stubRequest(url).andReturn(TestResponses.getRecords.page[params.page].success);
            Request.fetchData(params, API_URL+'displays').then(function() {
                done();
            });
        });
        it('Should respond with Promise for request already created', function(done) {
            var url = API_URL + 'displays' + "?" + Request.serialize(params);
            jasmine.Ajax.stubRequest(url).andReturn(TestResponses.getRecords.page[params.page].success);
            Request.fetchData(params, API_URL + 'displays').then(function() {
                expect(XMLHttpRequest.prototype.send.calls.count()).toBe(1);
                done();
            });
        });
        it('Should respond with Promise and make request if params are different', function(done) {
            params.page = 2;
            var url = API_URL + 'displays' + "?" + Request.serialize(params);
            jasmine.Ajax.stubRequest(url).andReturn(TestResponses.getRecords.page[params.page].success);
            Request.fetchData(params, API_URL + 'displays').then(function() {
                expect(XMLHttpRequest.prototype.send.calls.count()).toBe(2);
                done();
            });
        });
    });
});