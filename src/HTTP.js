export default function getDropboxData()
{
    fetch("https://api.dropboxapi.com/2/files/list_folder", {
headers: {
    authorization: 'Bearer <ADD ACCESS TOKEN HERE>',
    'Content-Type': 'application/json'
},
body: '{"path":"","include_media_info":false}',
    }).then(data=>console.log(data));
}