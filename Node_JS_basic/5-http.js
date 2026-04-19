const http = require('http');
const args = process.argv.slice(2);
const countStudents = require('./3-read_file_async');
const DATABASE = args[0];
const port = 1245;

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const { url } = req;

  if (url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    try {
      const students = await countStudents(DATABASE);
      res.end(students.join('\n'));
    } catch (error) {
      res.end(error.message);
    }
    return;
  }

  res.statusCode = 404;
  res.end();
});

app.listen(port);
module.exports = app;
