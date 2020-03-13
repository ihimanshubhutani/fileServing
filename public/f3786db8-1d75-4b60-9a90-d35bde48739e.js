const displayRecordWithSearch = (data, param, response) => {

  const record = JSON.stringify(_.find(data.members, { param }));
  if (!record) {
    response.writeHead(400, 'NOT FOUND', { 'Content-type': 'application/json ' });
    response.write('{ "detail": "Not found" }');
    response.end();
    return;
  }
  response.write(record);
  response.end();
};