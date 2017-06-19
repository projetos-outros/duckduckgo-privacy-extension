const Parent = window.DDG.base.Model;
const backgroundPage = chrome.extension.getBackgroundPage();

function TrackerList (attrs) {

    Parent.call(this, attrs);
    this.companyList = backgroundPage.Companies.getTopBlocked(attrs.numCompanies);

    var max = 0;
    if (this.companyList && this.companyList.length) {
        max = this.companyList[0].count;
    }

    this.companyListMap = this.companyList.map(
        (company) => {
            var x = company.count;
            // calc max using pixels instead of % to make margins easier
            // max width: 270 - (14*2 <ul> margin) - (7*2 .card margin) = 228
            return {
              name: company.name,
              count: company.count,
              px: Math.floor(x * 228 / max)
            };
        });

};


TrackerList.prototype = $.extend({},
  Parent.prototype,
  {

      modelName: 'trackerListByCompany'

  }
);


module.exports = TrackerList;

