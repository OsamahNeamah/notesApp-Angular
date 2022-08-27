const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dir = "./notes";
const parser = require("body-parser");
const bodyParser = require("body-parser");
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/addNote", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  let file = path.join(dir, title + ".txt");

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      fs.writeFile(file, content, (err) => {
        if (err) {
          res.send({ result: "Your note can not be created try again" });
        } else {
          res.send({ result: "Your note is created" });
        }
      });
    } else {
      res.send({ result: "Note is already exist" });
    }
  });
});

app.get("/getNotes", (req, res) => {
  let resultfiles = [];
  let resultcontents = [];
  fs.readdir(dir, function (err, files) {
    if (err) {
      res.send({ resul: "Could not list the directory." });
      process.exit(1);
    } else {
      files.forEach(function (file, index) {
        resultfiles.push(file);
      });
      res.send({ result: resultfiles });
    }
  });
});

app.delete("/deleteNote/:title", (req, res) => {
  let filename = req.params.title.split("=")[1];
  fs.readdir(dir, function (err, files) {
    if (err) {
      res.send({ resul: "Could not list the directory." });
      process.exit(1);
    } else {
      files.forEach(function (file, index) {
        if (file == filename + ".txt") {
          fs.unlinkSync(path.join(dir, file));
          res.send({ result: `Note deleted` });
        }
      });
    }
  });
});

app.get("/getNote/:title", (req, res) => {
  let filename = req.params.title.split("=")[1];
  fs.readdir(dir, function (err, files) {
    if (err) {
      res.send({ resul: "Could not list the directory." });
      process.exit(1);
    } else {
      files.forEach(function (file, index) {
        if (file == filename + ".txt") {
          fs.readFile(path.join(dir, file), "utf8", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ result: data });
            }
          });
        }
      });
    }
  });
});

app.post("/updateNote", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  fs.readdir(dir, function (err, files) {
    if (err) {
      res.send({ resul: "Could not list the directory." });
      process.exit(1);
    } else {
      files.forEach(function (file, index) {
        if (file == title + ".txt") {
          fs.writeFileSync(path.join(dir, file), content);
        }
      });
    }
  });
});
