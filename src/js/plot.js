

async function loadDB() {
    const sqlPromise = initSqlJs({
        locateFile: (filename, prefix) => {
            console.log(`prefix is : ${prefix}`);
            console.log(`filename is : ${filename}`);
            return `./dist/${filename}`;
        }
    });
    const dataPromise = fetch("../../crypto_vspr.db").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

  //   var rows = db.exec("SELECT * FROM Tbl");
  //  rows.forEach(row => {
    
  //     console.log("Results",row);
    
  //  });
   var rows = [];
   var stmt = db.prepare("SELECT * FROM tbl  where coin_id = 'ETH'");
    
   while(stmt.step()) { //
    var row = stmt.getAsObject();
    //console.log('Here is a row: ' + JSON.stringify(row));
    rows.push(row);
  }

  
    let plotlyData = function () {
        
        function unpack(rows, key) {
            return rows.map(function(row) {
              let val =  row[key];
              if(typeof val === 'number'){
                val = parseFloat(val).toFixed(4);
              }
              return val; });
          }
          console.log(unpack(rows, 'rate_high'));
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'Rate High',
            x: unpack(rows, 'time_period_start'),
            y: unpack(rows, 'rate_open'),
            line: {color: '#17BECF'}
          }
          
          var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Rate Low',
            x: unpack(rows, 'time_period_start'),
            y: unpack(rows, 'rate_close'),
            line: {color: '#7F7F7F'}
          }
          
          var data = [trace1,trace2];
          
          var layout = {
            title: 'Time Series with Rangeslider',
            xaxis: {
              autorange: true,
              range: ['2016-01-01', '2021-06-08'],
              rangeselector: {buttons: [
                  {
                    count: 1,
                    label: '1m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {
                    count: 6,
                    label: '6m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {step: 'all'}
                ]},
              rangeslider: {range: ['2016-01-01', '2021-06-08']},
              type: 'date'
            },
            yaxis: {
              autorange: true,
              range: [86.8700008333, 138.870004167],
              type: 'linear'
            },
            grid: {rows: 2, columns: 1, pattern: 'independent'},
          };
          
          Plotly.newPlot('myDiv', data, layout);

    }
    plotlyData()
}

loadDB()

