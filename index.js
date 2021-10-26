const express = require("express");
const cors = require("cors"); /*import করতেছি cors কে*/
const app = express();

/*এগুলাকে বলে Middleware, middleware হিসেবে তুমি corsটাকে use করে ফেলো*/
app.use(cors());
app.use(express.json());

// const port = process.env.PORT || 3000;
const port = 5000;

app.get("/", (req, res) => {
  res.send(
    "Wow ! I am excited to learn node and express with nodemon. automatic restart"
  );
});

const users = [
  { id: 0, name: "Shabana", email: "Shabana@gmail.com", phone: "01788888888" },
  {
    id: 1,
    name: "Shabnoor",
    email: "Shabnoor@gmail.com",
    phone: "01788888888",
  },
  {
    id: 2,
    name: "Suchorita",
    email: "Suchorita@gmail.com",
    phone: "01788888888",
  },
  { id: 3, name: "Bobita", email: "Bobita@gmail.com", phone: "01788888888" },
  { id: 4, name: "Shahana", email: "Shahana@gmail.com", phone: "01788888888" },
  { id: 5, name: "Shabnam", email: "Shabnam@gmail.com", phone: "01788888888" },
];

// এভাবে অনেক গুলো users কে call করে পেতে পারো
app.get("/users", (req, res) => {
  const search = req.query.search;
  /*use query parameter*/
  if (search) {
    const searchResult = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(search)
    );
    res.send(searchResult);
  } else {
    res.send(users);
  }
  //   console.log(
  //     req.query.search
  //   );   >   /* query set করা , req.query সবগুলো object হবে CMDr এ*/
  //   res.send(users);
});

//app.METHOD
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length;
  users.push(newUser); //আপাতত short এ data টাকে পাঠাচ্ছি

  console.log("hitting the post", req.body); //requestএর bodyর মধ্যে dataরেখেছি
  // res.send("inside post");
  // res.send(JSON.stringify(newUser));
  res.json(newUser); //short এ
});

// আবার particular user কে ও পেতে পারো
/*dynamic Api*/
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  res.send(user);

  //   console.log(req.params.id);
});

// special route ও বানাতে পারো, এই handlerটা একদম same --- req থাকবে res থাকবে
app.get("/fruits", (req, res) => {
  res.send(["mango", "oranges", "banana", "apple"]);
});

app.get("/fruits/mangoes/fazli", (req, res) => {
  res.send("Yummy yummy tok marka fazli");
});

app.listen(port, () => {
  console.log("listening to port ", port);
});
