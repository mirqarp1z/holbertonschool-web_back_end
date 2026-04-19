const http = require('http');
const fs = require('fs');

const args = process.argv.slice(2);
const DATABASE = args[0];
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1); // skip header row

      if (students.length === 0) {
        resolve([`Number of students: 0`]);
        return;
      }

      const fields = {};
      students.forEach((line) => {
        const parts = line.split(',');
        if (parts.length < 4) return;
        const field = parts[3].trim();
        const firstname = parts[0].trim();
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      });

      const totalStudents = students.filter((l) => l.split(',').length >= 4).length;
      const output = [];
      output.push(`Number of students: ${totalStudents}`);

      for (const [field, names] of Object.entries(fields)) {
        output.push(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
        );
      }

      resolve(output);
    });
  });
}

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
      const lines = await countStudents(DATABASE);
      res.end(lines.join('\n'));
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
