
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2)) 


args['port', 'debug', 'log', 'help']
const port = args.port || process.env.port || 5000// add command line argument
const debug = args.debug || false
const log = args.log || false

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%',port))
})


app.get('/app/', (req, res) => {
    //Respond w status 200
    res.statusCode = 200;
    //Respond w status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, {
        'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' + res.statusMessage)
});

function coinFlip() {
    return(Math.floor(Math.random()*2)==0)? 'heads':'tails';
}

app.get('/app/flip/', (req, res) => {
  const flip = coinFlip()
	res.status(200).json({ 'flip' : flip })
  res.end()
});

function coinFlips(flips) {
    const results = []
    for(let i=0; i<flips; i++){
      results[i] = coinFlip()
    }
    return results;
}

  function countFlips(array) {
    var headcount = 0
    var tailcount = 0
    for(let i =0; i < array.length; i++){
      if(array[i] === "heads"){
        headcount++
      }else{
        tailcount++
      }
    }
    return{
      tails: tailcount,
      heads: headcount
    }
  
  }

app.get('/app/flips/:number', (req, res) => {
	var number = req.params.number
  var raw = coinFlips(number)
  var summary = countFlips(raw)
  res.status(200).json({ 'raw' : raw , 'summary' : summary })
});

function flipACoin(call) {
    var flips = coinFlip();
    var result;
    if (flips === call){
      result = "win"
    }else {
      result = "lose"
    }
    return{
      call: call,
      flip: flips,
      result: result
    }
  }
app.get('/app/flip/call/heads', (req, res) => {
	var call = flipACoin('heads')
    res.status(200).json(call)
});
app.get('/app/flip/call/tails', (req, res) => {
	var call = flipACoin('tails')
    res.status(200).json(call)
});

app.use(function(req, res) {
  res.status(404).send("Endpoint does not exist")
  res.type("text/plain")

})