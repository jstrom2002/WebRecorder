const accessToken = "<ADD ACCESS TOKEN HERE>";

export function getPwd(pwdToCheck) {
  fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "text/plain",
      "Dropbox-API-Arg": '{"path":"/pwd.txt"}',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function uploadDBFile(blob) {
  fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg":
        '{"autorename":false,"mode":"overwrite","mute":false,"path":"/db.json","strict_conflict":false}',
    },
    body: blob,
  })
    .then((response) => response.json())
    .then((data) => {
      return console.log(data);
    });
}

export function listDropboxFiles() {
  fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: '{"path":"","include_media_info":false}',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export function appendDataToDatabase(blob) {
  fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "text/plain",
      "Dropbox-API-Arg": '{"path":"/db.json"}',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.entries.push({ time: Date.now(), data: blob });
      console.log("sending: " + JSON.stringify(data));
      uploadDBFile(JSON.stringify(data));
    });
}

export function ResetDatabase() {
  const nullDatabaseData = '{"entries":[]}';
  uploadDBFile(nullDatabaseData);
}
