export default function appendToJSON(recordingData);
{
  fs.readFile(
    "recordingHistory.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data); //now it an object
        obj.table.push({ time: Date.now(), data: recordingData }); // add data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("myjsonfile.json", json, "utf8", callback); // write it back
      }
    }
  );
}
