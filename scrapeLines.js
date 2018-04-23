var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var mkdirp = require('mkdirp');
var moment = require('moment');

//Where shall we hunt for odds?
const url = 'https://www.sportsbookreview.com/betting-odds/mlb-baseball/';

//Create html directory if needed
var input_dir = './inputs/html/'
mkdirp(input_dir, function(err) {});

function dumpHTML(input_path, parsed_html){
    fs.writeFileSync(input_path, parsed_html, function(err) {
        if(err) { return console.log(err); }
    }); 
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function harvestLines(year, url){ //download HTML files for a given year
    var start_date = new Date("01-01-" + year.toString());
    var current_date = start_date
    var datestr;
    var date_url;
    
    var ii = 0
    var num_days = 366;
    function f() {
        current_date = addDays(current_date, 1)
        datestr = moment(current_date).format('YYYYMMDD');
        date_url = url + '?date=' + datestr;
        output_path = input_dir + datestr + '.html';
    
        request(date_url, function(err, resp, html) {
            if (!err){
              console.log(output_path);
              dumpHTML(output_path, html); 
            } else {
                console.log(err)
            }
        });
    
        ii++;
        if(ii < num_days){
            setTimeout(f, 1000); //...wait 1 second.
        }
    }
    f();
    return;    
}

//harvestLines(year, url);

datestr = '20170809';
path_to_html = input_dir + datestr + '.html';
html = fs.readFileSync(path_to_html);
const $ = cheerio.load(html);
console.log(path_to_html);
console.log(typeof sbr_html);
console.log($.html());


/*<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
$('.apple', '#fruits').text()
//=> Apple

$('ul .pear').attr('class')
//=> pear

$('li[class=orange]').html()
//=> <li class = "orange">Orange</li>*/