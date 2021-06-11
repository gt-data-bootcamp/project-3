

async function loadDB() {
    const sqlPromise = initSqlJs({
        locateFile: (filename, prefix) => {
            console.log(`prefix is : ${prefix}`);
            console.log(`filename is : ${filename}`);
            return `./js/${filename}`;
        }
    });
    const dataPromise = fetch("../../Crypto.db").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

  //   var rows = db.exec("SELECT * FROM Tbl");
  //  rows.forEach(row => {
    
  //     console.log("Results",row);
    
  //  });
  function getCoinData(coin,db)
  {
   var rows = [];
   var stmt = db.prepare(`SELECT * FROM tbl  where coin_id = '${coin}'`);
    
   while(stmt.step()) { //
    var row = stmt.getAsObject();
    //console.log('Here is a row: ' + JSON.stringify(row));
    rows.push(row);
  }
  return rows;
  }

  
    let plotlyData = function () {

      const bRows = getCoinData('BTC',db);
      const eRows = getCoinData('ETH',db);
      const lRows = getCoinData('LTC',db);  
        function unpack(rows, key) {
            return rows.map(function(row) {
              let val =  row[key];
              if(typeof val === 'number'){
                val = parseFloat(val).toFixed(4);
              }
              return val; });
          }
          var bitcoin = {
            type: "scatter",
            mode: "lines",
            name: 'Bitcoin',
            x: unpack(bRows, 'time_period_start'),
            y: unpack(bRows, 'rate_close'),
            line: {color: '#17BECF'}
          };
          
          var ethereum = {
            type: "scatter",
            mode: "lines",
            name: 'Ethereum',
            x: unpack(eRows, 'time_period_start'),
            y: unpack(eRows, 'rate_close'),
            line: {color: '#36013f'}
          };
          
          var litecoin = {
            type: "scatter",
            mode: "lines",
            name: 'LiteCoin',
            x: unpack(lRows, 'time_period_start'),
            y: unpack(lRows, 'rate_close'),
            line: {color: '#7F7F7F'}
          };
          var data = [bitcoin,ethereum,litecoin];
          
          var layout = {
            autosize: true,
            xaxis: {
              autorange: true,
              range: ['2016-02-05', '2021-06-08'],
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
                rangeslider: {range: ['2016-02-05', '2021-06-08']},
                type: 'date'
            },
            yaxis: {
              autorange: true,
              range: [86.8700008333, 138.870004167],
              type: 'linear'
            }
          };
          var config = {responsive: true};
          
          Plotly.newPlot('myDiv', data, layout, config);
          Plotly.update('myDiv',data,{title:'Top 3 Coins'});
          Plotly.newPlot('bDiv', [bitcoin], layout, config);
          Plotly.update('bDiv',[bitcoin],{title:'Bitcoin'});
          Plotly.newPlot('eDiv', [ethereum], layout, config);
          Plotly.update('eDiv',[ethereum],{title:'Ethereum'});
          Plotly.newPlot('lDiv', [litecoin], layout, config);
          Plotly.update('lDiv',[litecoin],{title:'Litecoin'});

    }
    plotlyData()
}

loadDB()



