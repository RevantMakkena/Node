setRocks = (id) => {
  console.log("I'm rock " + id);
};

const timeoutRocks = setTimeout(setRocks, 2 * 1000, 1); //we can send function, along with params in this func
clearTimeout(timeoutRocks);

//To call functions in certain intervals
const intervalRocks = setInterval(setRocks, 2 * 1000, 2);
clearInterval(intervalRocks); //Clears the intervals or timeouts

// node -p "os.cpus().length" // to find number of cores

//
