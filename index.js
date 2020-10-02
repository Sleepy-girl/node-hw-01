// const fs = require("fs");
// const path = require("path");
// // console.log(fs);
// // console.log(path);

// const contactsPath = require("./db/contacts.json");
// console.log(contactsPath);

const Contacts = require("./contacts");
// console.log(contacts);

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await Contacts.listContacts());
      break;

    case "get":
      console.table(await Contacts.getContactById(id));
      break;

    case "add":
      console.table(await Contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.table(await Contacts.removeContact(9));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
