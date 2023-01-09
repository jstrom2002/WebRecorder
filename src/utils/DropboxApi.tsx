const accessToken = "<ADD API TOKEN HERE>";

export function getPwd() {
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

export async function uploadDBFile(blob: any) {
  await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg":
        '{"autorename":false,"mode":"overwrite","mute":false,"path":"/db.json","strict_conflict":false}',
    },
    body: blob,
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

export async function getUserDB() {
  fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
      "Content-Type": "text/plain",
      "Dropbox-API-Arg": '{"path":"/user.json"}',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function appendDataToDatabase(blob: any) {
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
      data.entries.push({ time: Date.now(), data: blob });
      uploadDBFile(JSON.stringify(data));
    });
}

export function ResetDatabase() {
  const nullDatabaseData = '{"entries":[]}';
  uploadDBFile(nullDatabaseData);
}
